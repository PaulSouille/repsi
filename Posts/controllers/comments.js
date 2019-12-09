const cassandraPost= require('../db/cassandra.js')
const Uuid = require('cassandra-driver').types.Uuid;


module.exports = {
	/*
	 *  getAll: Get all comments of one post
	 *  @return: array<comment>
	 *  @param: hapi.Request request
	 *  @param: hapi.Response reply
	 */
	getAll: async (request, reply) => {
	// result: Post
	const result= await cassandraPost.postMapper.get({id:request.params.postId}).then(function(value) {
		return value;
	}).catch(function(error){
		console.error(error);
		
	});
	return result.comments;
	},
	/*
	 *  get: Get one comment of one post
	 *  @return: comment
	 *  @param: hapi.Request request
	 *  @param: hapi.Response reply
	 */
	get: async (request,reply) => {
		// result: Post
		const result= await cassandraPost.postMapper.get({id:request.params.postId}).then(function(value) {
			return value;
		});

		return result.comments.filter((comment) => comment.id ==request.query.id);
	},
	/*
	 *  post: Create one comment into one post
	 *  @return: comment
	 *  @param: hapi.Request request
	 *  @param: hapi.Response reply
	 */
	post: async(request,reply)=>{
		/*
		 * post:post
		 * comment: comment
		 * newPost: Post
		 */
		const post= await cassandraPost.postMapper.get({id:request.params.postId}).then(function(value) {return value;});
		const comment = request.payload ;	
		const newPost = { ...post, comments:post.comments==null ? [comment]: post.comments.concat(comment) };
		/*
		 * remove post without the new comment
		 */
		await cassandraPost.postMapper.remove(post).then(function() {
            return  {message:"Le post a bien été supprimé"};
		});
		/*
		 * insert the post with the new comment
		 * result: comment
		 */
		const result= await cassandraPost.postMapper.insert(newPost).then(function() {
		 	return comment;
		 }).catch(function(error){
			 console.error(error);
			 
		 });
		return result;

	},
	/*
	 *  put: Update one comment into one post
	 *  @return: comment
	 *  @param: hapi.Request request
	 *  @param: hapi.Response reply
	 */
	put: async(request,reply)=>{
		/*
		 * post:post
		 * oldComment: comment
		 * newComment: comment
		 * newPost: Post
		 */	
		const post= await cassandraPost.postMapper.get({id:request.params.postId}).then(function(value) {return value;});
		const comments = post.comments.filter((comment) => comment.id !=request.query.id);
		const oldComment = post.comments.filter((comment) => comment.id ==request.query.id).reduce((item) => {
    		return {
       			item
    		}
		});
		const newComment = { ...oldComment, content:request.payload.content}
		const newPost = { ...post, comments:comments.concat(newComment) };
		/*
		 * remove post with the unudapted comment
		 */
		await cassandraPost.postMapper.remove({id:request.params.postId}).then(function() {
            return  {message:"Le post a bien été supprimé"};
		});
		/*
		 * insert the post with the updated comment
		 * result: comment
		 */
		const result= await cassandraPost.postMapper.insert(newPost).then(function() {
		 	return newPost;
		 }).catch(function(error){
			 console.error(error);
			 
		 });
		return result.comment;
	

	},
	/*
	 *  delete: delete one comment into one post
	 *  @return: post
	 *  @param: hapi.Request request
	 *  @param: hapi.Response reply
	 */
	delete: async(request, reply)=>{
		/*
		 * post:post
		 * comments: array<comment> => return list of comment without the comment to delete
		 * newPost: Post
		 */	
		const post= await cassandraPost.postMapper.get({id:request.params.postId}).then(function(value) {return value;});
		const comments = post.comments.filter((comment) => comment.id !=request.query.id);
		const newPost = { ...post, comments:comments};
		/*
		 * remove post with the comment to delete
		 */	
		await cassandraPost.postMapper.remove(post).then(function() {
            return  {message:"Le post a bien été supprimé"};
		});
		/*
		 * insert post without the comment to delete
		 */
		const result= await cassandraPost.postMapper.insert(newPost).then(function() {
		 	return newPost;
		 }).catch(function(error){
			 console.error(error);
			 
		 });
		 	
		return result;
	}

};
