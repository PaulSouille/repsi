package main

import (
	"fmt"
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

	//Create an user
	router.Handle("/users", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(user.Create)))).Methods("POST")

	//Search and user with its mail
	router.Handle("/users/mail/{user-mail}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(user.SearchEmail)))).Methods("GET")

	//Search and user with its UUID
	router.Handle("/users/uuid/{user-uuid}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(user.SearchUUID)))).Methods("GET")

	//Delete an user with his id/mail
	router.Handle("/users", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(user.Delete)))).Methods("DELETE")

	//Update an user with his id/mail
	router.Handle("/users", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(user.Update)))).Methods("PUT")

	//Serve HTTP server
	fmt.Println("Server listening on port :8080 - Can now listen to your queries")
	log.Fatal(http.ListenAndServe(":8080", router))
}
