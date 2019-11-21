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

	router.Handle("/users", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(user.Create)))).Methods("POST")

	router.Handle("/users/{user-mail}", negroni.New(
		negroni.HandlerFunc(jwtMiddleware.HandlerWithNext),
		negroni.Wrap(http.HandlerFunc(user.Search)))).Methods("GET")

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
