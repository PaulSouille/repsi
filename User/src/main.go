package main

import (
	"log"
	"net/http"

	auth0 "../github/auth0"
	user "../github/user"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/urfave/negroni"
)

func main() {
	router := mux.NewRouter().StrictSlash(true)

	//Instanciate jwt reader token
	jwtMiddleware := auth0.Initiate()

	//Route to get documentation of the micro-service
	router.PathPrefix("/users/documentation").Handler(http.StripPrefix("/users/documentation", http.FileServer(http.Dir("./static/"))))

	//Get an user by his mail address
	router.Handle("/users/{user-mail}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(user.Search)))).Methods("GET")

	//Get an user by his mail address
	router.Handle("/users/id/{id}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(user.SearchID)))).Methods("GET")

	router.HandleFunc("/users/id/{id}", user.SearchID).Methods("GET")

	//Delete an user with his id/mail
	router.Handle("/users", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(user.Delete)))).Methods("DELETE")

	//Update an user with his id/mail
	router.Handle("/users", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(user.Update)))).Methods("PUT")

	//Serve HTTP server + enable CORS
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(router)))
}
