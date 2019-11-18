package user

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/gocql/gocql"

	app "../app"
)

//User : structure of an user
type User struct {
	Firstname string    `json:"firstname" db:"firstname"`
	Lastname  string    `json:"lastname" db:"lastname"`
	Mail      string    `json:"mail" db:"mail"`
	Birthday  time.Time `json:"birthday" db:"birthday"`
	Country   string    `json:"country" db:"country"`
	Language  string    `json:"language" db:"language"`
}

//Session :
var Session *gocql.Session

//Create : create an user from Post request
func Create(w http.ResponseWriter, r *http.Request) {
	Session = app.Init()
	defer Session.Close()

	var user User
	byteValue, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Can't retrieve the data from the request")
	}
	json.Unmarshal(byteValue, &user)
	fmt.Print(user)
	if err := Session.Query("INSERT INTO users(id, email, birthday, country, firstname, language, lastname) VALUES(?, ?, ?, ?, ?, ?, ?)",
		gocql.TimeUUID(), user.Mail, user.Birthday, user.Country, user.Firstname, user.Language, user.Lastname).Exec(); err != nil {
		fmt.Println(err)
	}

	w.WriteHeader(http.StatusCreated)
}

func Search(w http.ResponseWriter, r *http.Request) User {
	Session = app.Init()
	defer Session.Close()
	var user User

	row := Session.Query("SELECT * FROM users.users WHERE email = ?", r.FormValue("email"))
	err := row.Scan(&user.Firstname, &user.Lastname, &user.Mail, &user.Birthday, &user.Language, &user.Country)
	if err == nil {
		fmt.Print(err)
	}

	fmt.Print(user)
	return user
}
