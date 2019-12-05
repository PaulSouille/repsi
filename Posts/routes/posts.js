const controllers = require('../controllers');
const Joi = require('joi');
module.exports = [
  //GET /device
  {
    method: 'GET',
    path: '/posts',
    handler: controllers.posts.getAll,
    options: {
      cors : true,
      description: 'Get all posts',
      tags: ['api'], 
      auth: 'jwt'
    },
  },
  {
    method: 'GET',
    path: '/posts/{id}',
    handler: controllers.posts.get,
    options: {
      cors : true,
      description: 'Get one post',
      tags: ['api'], 
      auth: 'jwt'

    }
  },
  {
    method: 'POST',
    path: '/posts',
    handler: controllers.posts.post,
    options: {
      cors : true,
      description: 'create posts',
      tags: ['api'], 
      auth: 'jwt'

    }  
  },
  {
    method: 'PUT',
    path: '/posts',
    handler: controllers.posts.put,
    options: {
      cors : true,
      description: 'update posts',
      tags: ['api'], 
      auth: 'jwt'

    }  
  },
  {
    method: 'DELETE',
    path: '/posts',
    handler: controllers.posts.delete,
    options: {
      cors : true,
      description: 'delete posts',
      tags: ['api'], 
      auth: 'jwt'

    }  
  }
];
