const controllers = require('../controllers');
const Joi = require('joi');
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
      auth: 'jwt'

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
      auth: 'jwt'

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
      auth: 'jwt'

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
      auth: 'jwt'

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
      auth: 'jwt'

    }  
  }
];
