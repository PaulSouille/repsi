import { Injectable } from '@nestjs/common';
import { LikesEntity } from './likes.entity';
import { Repository, InjectRepository } from '@iaminfinity/express-cassandra';
import { Observable } from 'rxjs';

@Injectable()
export class LikesService {

  constructor(

    @InjectRepository(LikesEntity)
    private readonly likesRepository: Repository<LikesEntity>,
  ) {}

    public countEntity(parentId: string): Observable<LikesEntity> {
      return this.likesRepository.findOne({parentId});
    }

    public insertOne(entityId: string, userId: string) {
        const test = 'test';

    }

}
