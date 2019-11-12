package app

import (
	"fmt"
	"os"
	"strconv"

	"github.com/gocql/gocql"
)

//InitCassandra : Init connexion to Cassandra database
func InitCassandra() *gocql.Session {
	database, exists := os.LookupEnv("CASSANDRA1_ADDR")
	fmt.Println(database)
	if exists {
		fmt.Println(database)
	}

	port, exists := os.LookupEnv("CASSANDRA1_ADDR")
	fmt.Println(database)
	if exists {
		fmt.Println(database)
	}

	cluster := gocql.NewCluster(database)
	cluster.Port, _ = strconv.Atoi(port)
	cluster.Keyspace = "Users"
	session, err := cluster.CreateSession()
	if err != nil {
		fmt.Println(err)
	}

	return session
}
