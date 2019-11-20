import { Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { DefaultController } from './default.controller';


@Module({
  controllers: [DefaultController],
})
export class DefaultModule {}
