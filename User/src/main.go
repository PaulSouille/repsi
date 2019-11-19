package main

import (
	"encoding/json"
	"log"
	"net/http"

	auth0 "../github/auth0"
	user "../github/user"

	"github.com/gorilla/mux"
	"github.com/urfave/negroni"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	jwtMiddleware := auth0.Initiate()

	//Example route to use if want to authenticate the user
	router.Handle("/users/auth0", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			response := auth0.Response{}
			response.Message = "OK"
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(response)
		})))).Methods("GET")

	//Add an user to database
	router.HandleFunc("/users", user.Create).Methods("POST")

	//Get an user by his mail address
	router.HandleFunc("/users/{user-mail}", user.Search).Methods("GET")

	//Delete an user with his id/mail
	router.HandleFunc("/users", user.Delete).Methods("DELETE")

	//Serve HTTP server
	log.Fatal(http.ListenAndServe(":8080", router))
}
