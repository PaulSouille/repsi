CREATE  KEYSPACE IF NOT EXISTS social
   WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 3 };

CREATE TYPE IF NOT EXISTS 
social.comment(
id UUID,
content text,
creator text,
creation_date date,
deleted_date date ,
comment_id UUID ,
);
CREATE TABLE social.post ( 
  id UUID,
  name text,
  creation_date date,
  deleted_date date,
  creator text,
  state text,
  content text,
  topic text,
  commments list<social.comment>,
  PRIMARY KEY (id));


INSERT INTO social.post  (id, name, creation_date, deleted_date, creator, state, content, topic, commments )  VALUES (b3e879c6-1b9f-457e-9869-ae1dc6f8e781, 'post_test', '2019-10-23','2019-10-23', 'manon', 'private', 'first post', 'test',{{ 'id': 'string', 'content': 'string' },{ 'coucou': 'hey', 'content': 'blabala' }});
INSERT INTO social.post  (id, name, creation_date, deleted_date, creator, state, content, topic, commments )  
JSON '{"id":"b3e879c6-1b9f-457e-9869-ae1dc6f8e781", "name": "post_test"
, "creation_date":"2019-10-23","deleted_date":"2019-10-23","creator": "manon","state":"private","content": "first post","topic":"test","comments":
 "[
    { 
        'id': 75872830-833a-4373-8506-554e27ed6db0 ,
        'content': 'test_comment1',
        'creator' : 'paul',
        'creation_date': '2019-10-23',
        'deleted_date': '2019-10-23' ,
        'comment_id':75872830-833a-4373-8506-554e27ed6db0   
    },
     { 
        'id': cc4620ab-d0ba-42b0-85b8-6687f6315a66 ,
        'content': 'test_comment2',
        'creator' : 'lucas',
        'creation_date': '2019-10-23',
        'deleted_date': '2019-10-23' ,
        'comment_id':75872830-833a-4373-8506-554e27ed6db0  
    }
  ]"');
INSERT INTO social.posts  
JSON
'{ 
    "id":"b3e879c6-1b9f-457e-9869-ae1dc6f8e781",
    "name":"post_test",
    "creation_date":"2019-10-23",
    "deleted_date":"2019-10-23",
    "creator":"fc549828-09f0-11ea-ba70-80e82c4ccbcc",
    "state":"private",
    "content":"seconde post",
    "topic":"test",
    "comments":[ 
       { 
          "id":"75872830-833a-4373-8506-554e27ed6db9",
          "content":"test_comment1",
          "creator":"fc549828-09f0-11ea-ba70-80e82c4ccbcc",
          "creation_date":"2019-10-23"        
       },
       { 
          "id":"cc4620ab-d0ba-42b0-85b8-6687f6315a66",
          "content":"test_comment2",
          "creator":"fc549828-09f0-11ea-ba70-80e82c4ccbcc",
          "creation_date":"2019-10-23",
          "deleted_date":"2019-10-23",
          "comment_id":"75872830-833a-4373-8506-554e27ed6db0"
       }
    ]
 }';

insert into social.abc (id, locations ) values (1, {'coffee':{ destinations: ['abcd', 'efgh']}});







INSERT INTO social.post  (id, name, creation_date, deleted_date, creator, state, content, topic, commments )  
VALUES (b3e879c6-1b9f-457e-9869-ae1dc6f8e781, 'post_test', '2019-10-23',null, 'manon', 'private', 'first post','test',
 
   {{ 
        'id':75872830-833a-4373-8506-554e27ed6db0 ,
        'content': 'test_comment1',
        'creator' : 'paul',
        'creation_date': '2019-10-23',
        'deleted_date': null ,
        'comment_id':75872830-833a-4373-8506-554e27ed6db0  
    }, { 
        'id': cc4620ab-d0ba-42b0-85b8-6687f6315a66 ,
        'content': 'test_comment2',
        'creator' : 'lucas',
        'creation_date': '2019-10-23',
        'deleted_date': null ,
        'comment_id':75872830-833a-4373-8506-554e27ed6db0  
    }
     }
  );


cassandra@cqlsh> select * from social.post;