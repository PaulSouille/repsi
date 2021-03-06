'use strict';

var Hapi = require('hapi');
var routes = require('./routes');
const Inert = require('inert');
const Pack = require('./package')
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const jwt = require('hapi-auth-jwt2');
const jwksRsa = require('jwks-rsa');
const internals = {
  templatePath: '.'
};

if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}


const validateUser = async (decoded, request) => {
  if (decoded && decoded.sub) {
    return decoded.scope ?
      {
        isValid: true,
        credentials: {
          scope: decoded.scope.split(' ')
        }
      } :
      {
        isValid: true
      };
  }

  return {
    isValid: false
  };
};


const server = new Hapi.Server({
  host: process.env.host,
  port: process.env.port,
  routes: {cors: {origin: process.env.frontUrl.split(',')} }
});

const swaggerOptions = {
  swaggerUIPath:'/posts/swaggerui/',
  jsonPath:'/posts/swagger.json',
  documentationPath:'/posts/documentation',
  info: {
    title: 'Documentation API',
    version: Pack.version,
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  }
};

var initDb = function (cb) {
  cb();
};

internals.main = async () => {
  await server.register(require('hapi-auth-jwt2'));
  server.auth.strategy('jwt', 'jwt', {
    complete: true,
    key: jwksRsa.hapiJwt2KeyAsync({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    verifyOptions: {
      audience: process.env.AUTH0_AUDIENCE,
      issuer: `https://${process.env.AUTH0_DOMAIN}/`,
      algorithms: ['RS256']
    },
    validate: validateUser
  });

  server.auth.default('jwt');

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }

  ]);


  await server.start();
  initDb(() => {
    console.log('Server is running at ' + server.info.uri);
    console.log("NODE_ENV : ", process.env.NODE_ENV);
  });

  server.route(routes);

}

internals.main();

module.exports = server;