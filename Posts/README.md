<p align="center">
  <a href="https://hapi.dev/" target="blank"><img src="https://raw.githubusercontent.com/hapijs/assets/master/images/hapi.png" width="320" alt="Hapi Logo" /></a>
 <a href="https://docs.datastax.com/en/developer/nodejs-driver/" target="blank"><img src="https://academy.datastax.com/sites/default/files/1200X630_Academy_logo-01.png" width="320" alt="Datastax Logo" /></a>
</p>

# rEpsi.Posts
Posts is micro service of rEpsi wich propose an API for dealing with rEpsi.Front.
This API  contains posts && comments endpoints.
On these endpoints a CRUD services are enable.  
# Getting Started

## Prerequisites
 A package manager # NPM 
 NodeJS 10.16.3
 Docker image with Cassandra you can pull our image [here](http://link)
 Docker with a kubernetes && auth0  you can pull our image [here]()
## Installing

1. Clone the project
```git clone https://github.com/PaulSouille/repsi.git```
2. Go on the folder Posts
3. Install the package
```npm install ```
4. Initiate your environment variable 
* dbHost: server host of database
* dbPort: server port of database 
* dbUser: user of your database
* dbPass: password of your database
* dbKeyspace: keyspace of your database 
* host: host of your deployement server
* port: port of your deployement server
* AUTH0_DOMAIN: domain of your auth0 (example: dev-1x2jzvjx.eu.auth0.com)
* AUTH0_AUDIENCE: audience of auth0 (example: dns of your deployement server)
* frontUrl: url of front(dns of your kubernetes)


## Usage
To see the documentation of the API you can acces of the swagger:  host/documentation.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
