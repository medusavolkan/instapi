import { Body, Controller, Get, Param, Post, Render, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { HashtagService } from "./hashtag.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('hashtag')
@UseGuards(AuthGuard)
export class HashtagController {
    constructor(private hashtagService: HashtagService) {}

    @Get()
    @Render('hashtag')
    async get_hashtag() {
        const hashtags = await this.hashtagService.get_all_hashtag()
        return {
            title: 'Hashtag',
            hashtags: hashtags
        }
    }

    @Post()
    async post_hashtag(@Body() body:any, @Res() response:Response){
        const hashtag = await this.hashtagService.create_hashtag(body)
        response.redirect(302, '/hashtag')
    }

    @Get('delete/:id')
    async get_delete(@Param('id') id:number, @Res() res:Response){
        await this.hashtagService.get_delete_hashtag(id)
        res.redirect(302, '/hashtag')
    }
}