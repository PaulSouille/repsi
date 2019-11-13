package main

import (
	"log"
	"net/http"

	user "../github/user"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	//Add user to database
	router.HandleFunc("/users", user.Create).Methods("POST")

	//Serve HTTP server
	log.Fatal(http.ListenAndServe(":8080", router))
}
