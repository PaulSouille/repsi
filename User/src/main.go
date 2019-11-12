package main

import (
    "fmt"
    "log"
    "net/http"

    "github.com/gorilla/mux"
)
func helloword(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Welcome home!")
}

func main() {
    router := mux.NewRouter().StrictSlash(true)
    router.HandleFunc("/Users",  helloword)

    log.Fatal(http.ListenAndServe(":8080", router))
}
