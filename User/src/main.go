package main

import (
	"log"
	"net/http"

	user "../github/user"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)
	//jwtMiddleware := auth0.Initiate()

	//Add an user to database
	router.HandleFunc("/users", user.Create).Methods("POST")

	//Get an user by his mail address
	//router.Handle("/users/{user-mail}", negroni.New(
	//	negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
	//	negroni.Wrap(http.HandlerFunc(user.Search)))).Methods("GET")

	router.HandleFunc("/users/{user-mail}", user.Search).Methods("GET")

	//Get an user by his mail address
	//router.Handle("/users/id/{id}", negroni.New(
	//	negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
	//	negroni.Wrap(http.HandlerFunc(user.SearchID)))).Methods("GET")

	router.HandleFunc("/users/id/{id}", user.SearchID).Methods("GET")

	//Delete an user with his id/mail
	//router.Handle("/users", negroni.New(
	//	negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
	//	negroni.Wrap(http.HandlerFunc(user.Delete)))).Methods("DELETE")

	router.HandleFunc("/users", user.Delete).Methods("DELETE")

	//Update an user with his id/mail
	//router.Handle("/users", negroni.New(
	//	negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
	//	negroni.Wrap(http.HandlerFunc(user.Update)))).Methods("PUT")

	router.HandleFunc("/users", user.Update).Methods("PUT")

	//Serve HTTP server
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(router)))
}
