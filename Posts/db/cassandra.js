const cassandra = require('cassandra-driver');

if(process.env.NODE_ENV != 'production'){
  require('dotenv').config()
}

const client = new cassandra.Client({ contactPoints: [process.env.dbHost],localDataCenter: 'datacenter1',protocolOptions: { port: process.env.dbPort }, keyspace: process.env.dbKeyspace,authProvider:new cassandra.auth.PlainTextAuthProvider(process.env.dbUser, process.env.dbPass)});
const Mapper = cassandra.mapping.Mapper;

const connexion = client.connect(function (err) {
    if(err){
        throw err;
    }
  });

  const mappingOptions = {
    models: {
      'posts': {
        tables: ['posts'],
       // mappings: new UnderscoreCqlToCamelCaseMappings(),s
        }
    }
  };

// Create the Mapper using the mapping options
const mapper = new Mapper(client, mappingOptions);
const postMapper = mapper.forModel('posts');

const query = 'SELECT id, name, content, topic, creation_date, creator, state, comments from posts where topic=? ALLOW FILTERING;';
postMapper.findByTopic = postMapper.mapWithQuery(query, post => [ post.topic ]);
const query2= 'SELECT id, name, content, topic, creation_date, creator, state, comments from posts where creator=? ALLOW FILTERING;';
postMapper.findByUser = postMapper.mapWithQuery(query2, post =>[post.creator] );
module.exports={connexion,postMapper};






