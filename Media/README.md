# rEpsi.Media
Media is micro-service of rEpsi wich propose an API for dealing with rEpsi.Front.
This API contains  media's endpoints .
On these endpoints a CRUD services are enable. 

# Getting Started

## Prerequisites
 Ruby version 2.5.7
 Docker image with Cassandra you can pull our image [here](http://link)
 Docker with a kubernetes && auth0  you can pull our image [here]()
 Server with S3 

## Installing

1. Clone the project
```git clone https://github.com/PaulSouille/repsi.git```
2. Go on the folder Media
3. Initiate your environment variable
* ENV['s3_region']
* ENV['s3_bucket_name']
* ENV['s3_default_acl']
4. Install the package
```gem install  bundler ```
```bundle install```
5. Run the app
```rails server```




## Usage
To see the documentation of the API you can acces of the swagger:  host/documentation.

In order to generate the documentation : 
rake rswag:specs:swaggerize
 ( files to update in /spec/integration/)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
 

