const controllers = require('../controllers');
const Joi = require('joi');
/*
  Endpoints: post
 */
module.exports = [
  {
    method: 'GET',
    path: '/posts/topics/{topic}/posts',
    handler: controllers.posts.getPostsByTopic,
    options: {
      cors : true,
      description: 'Get all posts of one topics',
      tags: ['api'], 
      auth: 'jwt',
      validate:{
        params:{
          topic:Joi.string().required()
        }
      },
         
    },
  },
  {
    method: 'GET',
    path: '/posts/users/{creator}/posts',
    handler: controllers.posts.getPostsByUser,
    options: {
      cors : true,
      description: 'Get all posts of one user',
      tags: ['api'], 
      auth: 'jwt', 
      validate:{
        params:{
          creator:Joi.string().guid().required()
        }
      }        
    },
  },


  //GET /posts
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
  //GET /posts/
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
  //POST /posts/
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
  //PUT /posts/
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
  //DELETE /posts/
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
