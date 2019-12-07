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

		const result= await cassandraPost.postMapper.get({id:request.query.id}).then(function(value) {
			return value;
		});
		return result;
	},
	post: async(request,reply)=>{
		
		const post = { ...request.payload  };
		const result= await cassandraPost.postMapper.insert(post).then(function() {
			return post;
		}).catch(function(error){
			console.error(error);
			return error;
		});
		return result;

	},
	put: async(request,reply)=>{
		const oldPost= await cassandraPost.postMapper.get({id:request.query.id}).then(function(value) {
				return value;
		});
		await cassandraPost.postMapper.remove({id:request.query.id}).then(function() {
			return {state:"succes",message:"Le post a bien été supprimé"};
		});
			
		const newPost = {...oldPost,  content:request.payload.content!=undefined? request.payload.content:oldPost.content, state:request.payload.state!=undefined? request.payload.state : oldPost.state , deleted_date:request.payload.deleted_date!=undefined? request.payload.deleted_date:oldPost.deleted_date}
		const result= await cassandraPost.postMapper.insert(newPost).then(function() {
				return newPost;
			});
		
		return result;
	},
	delete: async(request, reply)=>{
		const result= await cassandraPost.postMapper.remove({id:request.query.id}).then(function() {
			return {message:"Le post a bien été supprimé"};
		}).catch(function(error){
			console.error(error);
		}
		);
		return result;
	}



};
