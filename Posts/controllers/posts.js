const cassandraPost= require('../db/cassandra.js')
const Uuid = require('cassandra-driver').types.Uuid;

module.exports = {
	getAll: async (request, reply) => {
	const result= await cassandraPost.postMapper.findAll().then(function(value) {
		return value["_rs"]["rows"];
	});
	return result;

	},
	get: async (request,reply) => {

		const result= await cassandraPost.postMapper.find({id:request.params.id}).then(function(value) {
			return value["_rs"]["rows"];
		});
		return result;
	},
	post: async(request,reply)=>{
		
		const post = { ...request.payload, id : Uuid.fromString(request.payload.id), creator: Uuid.fromString(request.payload.creator) };
		const result= await cassandraPost.postMapper.insert(post).then(function() {
			return post;
		});
		return result;

	},
	put: async(request,reply)=>{	
		const result= await cassandraPost.postMapper.update(request.payload).then(function() {
			return request.payload;
		});
		return result;
	},
	delete: async(request, reply)=>{
		const result= await cassandraPost.postMapper.remove(request.payload).then(function() {
			return {message:"Le post a bien été supprimé"};
		});
		return result;
	}



};
