package main

import (
	"log"
	"net/http"

	user "../github/user"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	//Add an user to database
	router.HandleFunc("/users", user.Create).Methods("POST")

	//Get an user by his mail address
	router.HandleFunc("/users/{user-mail}", user.Search).Methods("GET")

	//Delete an user with his id/mail
	router.HandleFunc("/users", user.Delete).Methods("DELETE")

	//Serve HTTP server
	log.Fatal(http.ListenAndServe(":8080", router))
}
