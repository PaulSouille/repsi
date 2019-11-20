import { Injectable } from '@nestjs/common';
import { LikesEntity } from './likes.entity';
import * as models from '@iaminfinity/express-cassandra';
import { Like } from './likes';

@Injectable()
export class LikesService {


  constructor(

    @models.InjectRepository(LikesEntity)
    private readonly likesRepository: models.Repository<LikesEntity>,
  ) {}

    public async countEntity(parentid: string): Promise<number> {
      const data = await this.likesRepository.find({parentid}).toPromise();
      return data.length;
    }

    public async addLike(like: Like): Promise<LikesEntity> {
      return await this.likesRepository.save(like).toPromise();

    }

    public async removeLike (like: Like): Promise<LikesEntity> {
      const likeToDelete: LikesEntity = {parentid: like.parentid, userid: like.userid, id: like.id};
      return await this.likesRepository.remove(likeToDelete).toPromise();
    }

}
