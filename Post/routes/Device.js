var controllers = require('../controllers');
var Joi = require('joi');

module.exports = [
  //GET /device
  {
    method: 'GET',
    path: '/device',
    handler: controllers.Device.get,
    options: {
      cors : true,
      description: 'Get all device',
      tags: ['api'], 
    },
  }
];
