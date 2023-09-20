import { Body, Controller, Get, Post, Render, Res, UseGuards } from "@nestjs/common";
import { AccountService } from "src/account/account.service";
import { GalleryService } from "src/gallery/gallery.service";
import { InstagramService } from "./instagram.service";
import { Response, response } from "express";
import { AuthGuard } from "src/auth/auth.guard";
import { LocationService } from "src/location/location.service";

@Controller('instagram')
@UseGuards(AuthGuard)
export class InstagramController {
    private locations:any

    constructor(private galleryService: GalleryService, private accountService: AccountService, private instagramService: InstagramService, private locationService: LocationService) { 
        this._initialize()
    }

    private async _initialize(){
        this.locations = await this.locationService.get_all_location()
    }

    @Get('story')
    @Render('instagram/story')
    async get_story() {
        const images = await this.galleryService.get_images();
        const accounts = await this.accountService.get_all_account();

        return {
            title: 'Hikaye Oluştur',
            images: images,
            accounts: accounts,
            locations: this.locations
        }
    }

    @Post('story')
    async post_story(@Body() body: any, @Res() response: Response) {
        for (const account of body.account){
            const user = await this.accountService.get_account(account);
            await this.instagramService.login(user.username, user.password);
            await this.instagramService.send_story(body);
        }

        response.redirect(302, '/instagram/story');
    }

    @Get('post')
    @Render('instagram/post')
    async get_post(){
        const images = await this.galleryService.get_images();
        const accounts = await this.accountService.get_all_account();
        return {
            title: 'Gönderi Oluştur',
            images: images,
            accounts: accounts,
            locations : this.locations
        }
    }

    @Post('post')
    async post_post(@Body() body: any, @Res() response: Response){
        for (const account of body.account){
            const user = await this.accountService.get_account(account);
            await this.instagramService.login(user.username, user.password);
            await this.instagramService.send_post(body);
        }

        response.redirect(302, '/instagram/post');
    }

    @Get('albume')
    @Render('instagram/albume')
    async get_albume(){
        const images = await this.galleryService.get_images();
        const accounts = await this.accountService.get_all_account();
        return {
            title: 'Albüm Oluştur',
            images: images,
            accounts: accounts,
            locations: this.locations
        }
    }

    @Post('albume')
    async post_albume(@Body() data:any, @Res() response: Response){
        const files = String(data.album_img).split(',');
        data.files = files;

        for (const account of data.account){
            const user = await this.accountService.get_account(account);
            await this.instagramService.login(user.username, user.password);
            await this.instagramService.send_albume(data);
        }

        response.redirect(302, '/instagram/albume')
    }
}