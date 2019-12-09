package user

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gocql/gocql"
	"github.com/gorilla/mux"

	app "../app"
	jsonHandler "../json"
)

//User : structure of an user
type User struct {
	UUID      gocql.UUID `json:"uuid" db:"uuid"`
	Auth0_id  string     `json:"auth0_id" db:"auth0_id"`
	Firstname string     `json:"firstname" db:"firstname"`
	Lastname  string     `json:"lastname" db:"lastname"`
	Mail      string     `json:"mail" db:"mail"`
	Birthday  time.Time  `json:"birthday" db:"birthday"`
	Country   string     `json:"country" db:"country"`
	Language  string     `json:"language" db:"language"`
}

//Session :
var Session *gocql.Session

//Create : create an user from Post request
func Create(w http.ResponseWriter, r *http.Request) {
	//Init cassandra connection and wait until we're done
	Session = app.Init()
	defer Session.Close()

	//Instanciate an user
	var user User

	//Get POST values of the body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Can't retrieve the data from the request")
	}

	//Marshal the POST values into our user
	json.Unmarshal(body, &user)
	fmt.Println(user)
	//Insert our new user into the database
	if err := Session.Query("INSERT INTO users.users(uuid,auth0_id, email, birthday, country, firstname, language, lastname) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
		gocql.TimeUUID(), user.Auth0_id, user.Mail, user.Birthday, user.Country, user.Firstname, user.Language, user.Lastname).Exec(); err != nil {
		panic(err)
	}

	//Send HTTP Code 200
	w.WriteHeader(http.StatusCreated)
}

//Search :
func Search(w http.ResponseWriter, r *http.Request) {
	//Init cassandra connection and wait until we're done
	Session = app.Init()
	defer Session.Close()

	//Init empty user
	var user User

	//Retrieve get parameter
	params := mux.Vars(r)
	email := params["user-mail"]

	//Query the database and marshall the result into our empty user var
	if err := Session.Query(`SELECT * FROM users.users WHERE email = ? ALLOW FILTERING`,
		email).Scan(&user.UUID, &user.Mail, &user.Auth0_id, &user.Birthday, &user.Country, &user.Firstname, &user.Language, &user.Lastname); err != nil {
		panic(err)
	}

	//Write json object of the User into the response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

//SearchId :
func SearchID(w http.ResponseWriter, r *http.Request) {
	//Init cassandra connection and wait until we're done
	Session = app.Init()
	defer Session.Close()

	//Init empty user
	var user User

	//Retrieve get parameter
	params := mux.Vars(r)
	email := params["id"]

	//Query the database and marshall the result into our empty user var
	if err := Session.Query(`SELECT * FROM users.users WHERE uuid = ? ALLOW FILTERING`,
		email).Scan(&user.UUID, &user.Auth0_id, &user.Mail, &user.Birthday, &user.Country, &user.Firstname, &user.Language, &user.Lastname); err != nil {
		panic(err)
	}

	//Write json object of the User into the response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

//Delete : delete an user
func Delete(w http.ResponseWriter, r *http.Request) {
	//Init cassandra connection and wait until we're done
	Session = app.Init()
	defer Session.Close()

	//Instanciate jsonResponse and jsonRequest to handle response and request
	jsonRequest := jsonHandler.JsonRequest{}
	jsonResponse := jsonHandler.JsonResponse{}

	//Decode received json into jsonRequest
	err := json.NewDecoder(r.Body).Decode(&jsonRequest)
	if err != nil {
		panic(err)
	}

	//Delete the user for a given id and email
	if err := Session.Query(`DELETE FROM users.users WHERE id = ? and email = ?`,
		jsonRequest.ID, jsonRequest.Mail).Exec(); err != nil {
		log.Fatal(err)
	}

	//Send back json data
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(jsonResponse)
}

//Update : update an user
func Update(w http.ResponseWriter, r *http.Request) {
	//Init cassandra connection and wait until we're done
	Session = app.Init()
	defer Session.Close()

	//Instanciate jsonResponse and jsonRequest to handle response and request
	jsonResponse := jsonHandler.JsonResponse{}

	//Instanciate an user
	var user User

	//Get POST values of the body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Can't retrieve the data from the request")
	}

	//Marshal the POST values into our user
	json.Unmarshal(body, &user)

	//Delete the old user to update it
	if err := Session.Query(`DELETE FROM users.users WHERE id = ? and email = ?`,
		user.UUID, user.Mail).Exec(); err != nil {
		log.Fatal(err)
	}

	//Insert the updated user into the database
	if err := Session.Query("INSERT INTO users.users(id, email, birthday, country, firstname, language, lastname) VALUES(?, ?, ?, ?, ?, ?, ?)",
		user.UUID, user.Auth0_id, user.Mail, user.Birthday, user.Country, user.Firstname, user.Language, user.Lastname).Exec(); err != nil {
		panic(err)
	}

	//Send back json data
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(jsonResponse)
}
