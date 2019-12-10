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
      auth: 'jwt',
      validate:{
        params:{
          postId:Joi.string().guid().required()
        }
      }

    }  
  },
  {
    method: 'GET',
    path: '/posts/{postId}/comments/',
    handler: controllers.comments.get,
    options: {
      cors : true,
      description: 'Get one comment',
      tags: ['api'], 
      auth: 'jwt',
      validate:{
        params:{
          postId:Joi.string().guid().required()
        },
        query:{
          id:Joi.string().guid().required()
        }
      }

    }
  },
  {
    method: 'POST',
    path: '/posts/{postId}/comments/',
    handler: controllers.comments.post,
    options: {
      cors : true,
      description: 'create comment',
      tags: ['api'], 
      auth: 'jwt',
      validate:{
        payload:{
          content: Joi.string().required(),
          creator: Joi.string().guid().required(),
          creation_date: Joi.date()

        },
      }

    }  
  },
  {
    method: 'put',
    path: '/posts/{postId}/comments/',
    handler: controllers.comments.put,
    options: {
      cors : true,
      description: 'update comment',
      tags: ['api'], 
      auth: 'jwt',
      validate:{
        query:{
          id:Joi.string().guid().required()
        },
        params:{
          postId:Joi.string().guid().required()
        },
        payload:{
          content: Joi.string(),
          deleted_date:Joi.date()
        }

      }

    }  
  },
  {
    method: 'delete',
    path: '/posts/{postId}/comments/',
    handler: controllers.comments.delete,
    options: {
      cors : true,
      description: 'delete comment',
      tags: ['api'], 
      auth: 'jwt',
      validate:{
        query:{
          id:Joi.string().guid().required()
        },
        params:{
          postId:Joi.string().guid().required()
        }
      }

    }  
  }
];
