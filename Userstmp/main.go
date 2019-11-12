package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/app"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func init() {
	// loads values from .env into the system
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}
}

func createUser(w http.ResponseWriter, r *http.Request) {
	cassandraCon := app.InitCassandra()

	var user app.User
	byteValue, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Can't retrieve data from the remote database")
	}

	json.Unmarshal(byteValue, &user)

	if err := cassandraCon.Query("INSERT INTO users(email, birthday, country, firstname, language, lastname) VALUES(?, ?, ?, ?, ?, ?)",
		user.Mail, user.Birthday, user.Country, user.Firstname, user.Language, user.Lastname).Exec(); err != nil {
		fmt.Println(err)
	}

	w.WriteHeader(http.StatusCreated)
}

func main() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/users", createUser).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", router))
}
