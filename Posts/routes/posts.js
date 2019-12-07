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
    path: '/posts/',
    handler: controllers.posts.get,
    options: {
      cors : true,
      description: 'Get one post',
      tags: ['api'], 
      auth: 'jwt',
      validate:{
        query:{
          id:Joi.string().guid().required()        
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/posts/',
    handler: controllers.posts.post,
    options: {
      cors : true,
      description: 'Create one post',
      tags: ['api'], 
      auth: 'jwt',
      validate:{
        payload:{
          id:Joi.string().guid().required(),
          name:Joi.string().required(),
          creation_date:Joi.date().required(),
          deleted_date:Joi.date(),
          creator:Joi.string().guid().required(),
          state:Joi.string().required(),
          content:Joi.string().required(),
          topic:Joi.string().required()

        }
      }

    }  
  },
  {
    method: 'PUT',
    path: '/posts/',
    handler: controllers.posts.put,
    options: {
      cors : true,
      description: 'Update one post',
      tags: ['api'], 
      auth: 'jwt',
      validate:{
        query:{
          id:Joi.string().guid().required()        
        },
        payload:{
          deleted_date:Joi.date(),
          state:Joi.string(),
          content:Joi.string()
        }
      }

    }  
  },
  {
    method: 'DELETE',
    path: '/posts/',
    handler: controllers.posts.delete,
    options: {
      cors : true,
      description: 'Delete  one post',
      tags: ['api'], 
      auth: 'jwt',
      validate:{
        query:{
          id:Joi.string().guid().required(),        
        }
      }

    }  
  }
];
