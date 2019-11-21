import { Controller, Get, Req, Put, Delete, Param, Body, UseGuards, Redirect } from '@nestjs/common';
import { Like } from './likes';
import { validateSchema } from '../helper/tools';
import * as Joi from 'joi';
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';

const pattern = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/;

@Controller('likes')
export class LikesController {

    constructor(private likesService: LikesService ) {

    }

    @Get()
    @Redirect('/likes/documentation')
    documentation(){
        
    }

    @Get(':parentId/count')
    @UseGuards(AuthGuard('jwt'))
    async count(@Param() params): Promise<Object> {
        validateSchema(params.parentId, Joi.string().regex(pattern).required());
        const count = await this.likesService.countEntity(params.parentId);
        return {data:{parentId: params.parentId, numberLikes: count}};

    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    async insertOne(@Body() like: Like): Promise<void | Object> {
        validateSchema(like, Joi.object({
                                    parentid:  Joi.string().regex(pattern).required(),
                                    userid: Joi.string().regex(pattern).required(),
                                }).unknown(false));
        const data =  await this.likesService.addLike(like).then((data) => {
            return data;
        }).catch((err)=>{
            console.log(err);
        });
        return {data};
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete()
    async removeOne(@Body() like: Like): Promise<void | Object> {
        validateSchema(like, Joi.object({
            parentid:  Joi.string().regex(pattern).required(),
            userid: Joi.string().regex(pattern).required(),
            id: Joi.string().regex(pattern).required(),

        }).unknown(false));
        const data = await this.likesService.removeLike(like).then(data=>{
            return data;
        });
        return {data};
    }

}
