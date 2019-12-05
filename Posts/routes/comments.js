const controllers = require('../controllers');
const Joi = require('joi');
const  settings = require('config');
module.exports = [
  //GET /device
  {
    method: 'GET',
    path: '/posts/{postId}/comments',
    handler: controllers.comments.getAll,
    options: {
      cors : true,
      description: 'Get all comments',
      tags: ['api'], 
    }  
  },
  {
    method: 'GET',
    path: '/posts/{postId}/comments/{id}',
    handler: controllers.comments.get,
    options: {
      cors : true,
      description: 'Get one comment',
      tags: ['api'], 
    }
  },
  {
    method: 'POST',
    path: '/posts/{postId}/comments',
    handler: controllers.comments.post,
    options: {
      cors : true,
      description: 'create comment',
      tags: ['api'], 
    }  
  },
  {
    method: 'put',
    path: '/posts/{postId}/comments',
    handler: controllers.comments.put,
    options: {
      cors : true,
      description: 'update comment',
      tags: ['api'], 
    }  
  },
  {
    method: 'delete',
    path: '/posts/{postId}/comments',
    handler: controllers.comments.delete,
    options: {
      cors : true,
      description: 'delete comment',
      tags: ['api'], 
    }  
  }
];
