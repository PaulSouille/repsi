import { Module } from '@nestjs/common';
import { LikesModule } from './likes/likes.module';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import {
  ExpressCassandraModuleOptions,
  auth,
} from '@iaminfinity/express-cassandra';

const cassandraOptions: ExpressCassandraModuleOptions = {
  clientOptions: {
    contactPoints: ['51.15.143.4'],
    keyspace: 'users',
    protocolOptions: {
      port: 9043,
    },
    queryOptions: {
      consistency: 1,
    },
    authProvider: new auth.PlainTextAuthProvider('cassandra', 'ZF5d2CZFpnne9aHz'),
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
  imports: [ExpressCassandraModule.forRoot(cassandraOptions), LikesModule],
})
export class AppModule {}
