const cassandraPost= require('../db/cassandra.js')

const Uuid = require('cassandra-driver').types.Uuid;

// Write your own query using query markers for parameters


// Create a new ModelMapper method with your own query
// and a function to extract the parameters from an object 

module.exports = {
	getAll: async (request, reply) => {
	const result= await cassandraPost.postMapper.get({id:request.params.postId}).then(function(value) {
		
		return value;
	}).catch(function(error){
		console.error(error);
		
	});
	return result.comments;
	},
	get: async (request,reply) => {

		const result= await cassandraPost.postMapper.get({id:request.params.postId}).then(function(value) {
			return value;
		});

		return result.comments.filter((comment) => comment.id ==request.query.id);
	},
	post: async(request,reply)=>{
		const post= await cassandraPost.postMapper.get({id:request.params.postId}).then(function(value) {return value;});
		const comment = request.payload ;	
		const newPost = { ...post, comments:post.comments==null ? [comment]: post.comments.concat(comment) };

		await cassandraPost.postMapper.remove(post).then(function() {
            return  {message:"Le post a bien été supprimé"};
		});
		const result= await cassandraPost.postMapper.insert(newPost).then(function() {
		 	return newPost;
		 }).catch(function(error){
			 console.error(error);
			 
		 });
		return result;

	},
	put: async(request,reply)=>{	
		const post= await cassandraPost.postMapper.get({id:request.params.postId}).then(function(value) {return value;});
		const comments = post.comments.filter((comment) => comment.id !=request.query.id);
		const arrayOldComment = post.comments.filter((comment) => comment.id ==request.query.id);
		const oldComment = arrayOldComment.reduce((item) => {
    		return {
       			item
    		}
		});
		const newComment = { ...oldComment, content:request.payload.content}
		const newPost = { ...post, comments:comments.concat(newComment) };
		
		await cassandraPost.postMapper.remove({id:request.params.postId}).then(function() {
            return  {message:"Le post a bien été supprimé"};
		});
		
		const result= await cassandraPost.postMapper.insert(newPost).then(function() {
		 	return newPost;
		 }).catch(function(error){
			 console.error(error);
			 
		 });
		return result;
	

	},
	delete: async(request, reply)=>{
		const post= await cassandraPost.postMapper.get({id:request.params.postId}).then(function(value) {return value;});
		const comments = post.comments.filter((comment) => comment.id !=request.query.id);
		const newPost = { ...post, comments:comments};
		await cassandraPost.postMapper.remove(post).then(function() {
            return  {message:"Le post a bien été supprimé"};
		});
		const result= await cassandraPost.postMapper.insert(newPost).then(function() {
		 	return newPost;
		 }).catch(function(error){
			 console.error(error);
			 
		 });
		return result;
	}

};
