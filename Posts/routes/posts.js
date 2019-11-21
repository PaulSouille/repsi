const controllers = require('../controllers');
const Joi = require('joi');
const  settings = require('config');
module.exports = [
  //GET /device
  {
    method: 'GET',
    path: '/posts',
    handler: controllers.posts.getAll
    ,
    options: {
      cors : true,
      description: 'Get all posts',
      tags: ['api'], 
    }  
  },
  {
    method: 'GET',
    path: '/posts/{id}',
    handler: controllers.posts.get,
    options: {
      cors : true,
      description: 'Get one post',
      tags: ['api'], 
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
    }  
  },
  {
    method: 'put',
    path: '/posts',
    handler: controllers.posts.put,
    options: {
      cors : true,
      description: 'update posts',
      tags: ['api'], 
    }  
  },
  {
    method: 'delete',
    path: '/posts',
    handler: controllers.posts.delete,
    options: {
      cors : true,
      description: 'delete posts',
      tags: ['api'], 
    }  
  }
];
