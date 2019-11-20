package app

import (
	"log"
	"os"
	"strconv"

	"github.com/gocql/gocql"
	"github.com/joho/godotenv"
)

var cassandra_port int
var cassandra_adress string

//Init cassandra connection
func Init() *gocql.Session {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	cassandra_adress := os.Getenv("CASSANDRA1_ADDR")
	cassandra_port, _ := strconv.Atoi(os.Getenv("CASSANDRA1_PORT"))

	// connect to the cluster
	cluster := gocql.NewCluster(cassandra_adress)
	cluster.Keyspace = "users"
	cluster.Port = cassandra_port
	cluster.Authenticator = gocql.PasswordAuthenticator{Username: "cassandra", Password: "ZF5d2CZFpnne9aHz"}
	session, err := cluster.CreateSession()
	if err != nil {
		log.Println(err)
	}

	return session
}