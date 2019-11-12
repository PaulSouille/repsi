import { Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { LikesEntity } from './likes.entity';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';

@Module({
  imports: [ExpressCassandraModule.forFeature([LikesEntity])],
  providers: [LikesService],
  controllers: [LikesController],
})
export class LikesModule {}
