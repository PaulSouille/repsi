<p align="center">
  <a href="https://www.gorillatoolkit.org/pkg/mux" target="blank"><img src="https://miro.medium.com/max/400/1*5QBUnkCjT_m0amIHeweqGg.png" width="100" alt="gorilla Logo" /></a>
 <a href="https://godoc.org/github.com/codegangsta/negroni" target="blank"><h3>Negroni</h3></a>
 <a href="https://godoc.org/github.com/dgrijalva/jwt-go" target="blank"><img src="https://cdn.ednsquare.com/s/*/a5f181f3-bb0e-4a25-8847-f973a266bd90.png" width="100" alt="jwtGo Logo" /></a>
 <a href="https://godoc.org/github.com/gocql/gocql" target="blank"><img src="https://gocql.github.io/gocql.png" width="100" alt="GoCQL Logo" /></a> 
</p>


# rEpsi.User
User is micro-service of rEpsi wich propose an API for dealing with rEpsi.Front.
This API contains  user's endpoints .
On these endpoints a CRUD services are enable. 
# Getting Started

## Prerequisites
 GO version 1.13.4
 Docker image with Cassandra you can pull our image [here](http://link)
 Docker with a kubernetes && auth0  you can pull our image [here]()
## Installing

1. Clone the project
```git clone https://github.com/PaulSouille/repsi.git```
2. Go on the folder User
3. Initiate your environment variable 
* CASSANDRA1_ADDR: server host of database
* CASSANDRA1_PORT: server port of database 
* CASSANDRA1_PASS: password of your database
* CERT_AUTH0: certifications of auth0
* URL_AUTH0: domain of your auth0 (example: dev-1x2jzvjx.eu.auth0.com)
* AUTH0_AUDIENCE: audience of auth0 (example: dns of your deployement server)
4. Install the package
```go get -d && ```
5. Compile packages and dependencies
``` go build -o main .```
6. Run the app
```./main```



## Usage
To see the documentation of the API you can acces of the swagger:  host/documentation.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
 
