import { Controller, Get, Req, Put, Delete, Param, Body } from '@nestjs/common';
import { Likes } from './likes';
import { validateSchema } from '../helper/tools';
import * as Joi from 'joi';
import { LikesService } from './likes.service';

const pattern = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

@Controller('likes')
export class LikesController {

    constructor(private likesService: LikesService ) {

    }
    @Get(':parentId')
    count(@Param() params): string {
        // tslint:disable-next-line: max-line-length
        validateSchema(params.parentId, Joi.string().regex(pattern).required());
        this.likesService.countEntity('test');
        return params.parentId;

    }

    @Put()
    insertOne(@Body() likes: Likes): string {
        validateSchema(likes, Joi.object({
                                    // tslint:disable-next-line: max-line-length
                                    parentId:  Joi.string().regex(pattern).required(),
                                    userId: Joi.string().regex(pattern).required(),
                                }).unknown(false));
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
