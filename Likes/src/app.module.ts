import { Module } from '@nestjs/common';
import { LikesModule } from './likes/likes.module';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import {
  ExpressCassandraModuleOptions,
  auth,
} from '@iaminfinity/express-cassandra';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { DefaultModule } from './default/default.module';

if(process.env.NODE_ENV != 'production'){
  dotenv.config();
}

const cassandraOptions: ExpressCassandraModuleOptions = {
  clientOptions: {
    contactPoints: [process.env.DB_HOST],
    keyspace: 'likes',
    protocolOptions: {
      port: parseInt(process.env.DB_PORT),
    },
    queryOptions: {
      consistency: 1,
    },
    authProvider: new auth.PlainTextAuthProvider(process.env.DB_USERNAME, process.env.DB_PASSWORD),
  },
  ormOptions: {
    createKeyspace: true,
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1,
    },
    migration: 'alter',
  },
};

@Module({
  imports: [ExpressCassandraModule.forRoot(cassandraOptions), LikesModule, AuthModule, DefaultModule],
})
export class AppModule {}
