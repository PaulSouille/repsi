import { Controller, Get, Req, Put, Delete, Param, Body } from '@nestjs/common';
import { Likes, Like } from './likes';
import { validateSchema } from '../helper/tools';
import * as Joi from 'joi';
import { LikesService } from './likes.service';

import * as models from '@iaminfinity/express-cassandra';

const pattern = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

@Controller('likes')
export class LikesController {

    constructor(private likesService: LikesService ) {

    }
    @Get(':parentId/count')
    async count(@Param() params): Promise<number> {
        validateSchema(params.parentId, Joi.string().regex(pattern).required());
        const data = await this.likesService.countEntity(params.parentId);
        return data;

    }

    @Put()
    async insertOne(@Body() like: Like): Promise<string> {
        validateSchema(like, Joi.object({
                                    parentId:  Joi.string().regex(pattern).required(),
                                    userId: Joi.string().regex(pattern).required(),
                                }).unknown(false));
        await this.likesService.addLike(like).then((data) => {
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        });
        return 'should insert one';
    }

    @Delete()
    removeOne(@Body() likes: Likes): string {
        validateSchema(likes, Joi.object({
            // tslint:disable-next-line: max-line-length
            parentId:  Joi.string().regex(pattern).required(),
            userId: Joi.string().regex(pattern).required(),
        }).unknown(false));
        return 'This action returns all likes';
    }

}
