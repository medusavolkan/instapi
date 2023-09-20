import { Injectable } from "@nestjs/common";
import { AccountService } from "src/account/account.service";
import { IgApiClient } from 'instagram-private-api';
import { readFileSync } from "fs";
import { join } from "path";
import { StickerBuilder } from "instagram-private-api/dist/sticker-builder";

@Injectable()
export class InstagramService {
    private readonly ig: IgApiClient

    constructor(
        private accountService: AccountService
        ) {
            this.ig = new IgApiClient();
        }
    
    async login(username:string, password:string): Promise<void> {
        try{
            this.ig.state.generateDevice(username);
            await this.ig.account.login(username, password);
            console.log('Instagram login success')
        }catch(err){
            console.log('Instagram login not success')
        }
    }
    async send_story(data:any){
        try{
            const path = join(__dirname, '..', '..', 'src/assets/' + data.story_image);
            const file = readFileSync(path);

            await this.ig.publish.story({
                file,
                stickerConfig: new StickerBuilder()
                .add(StickerBuilder.location({
                    locationId: (await this.ig.locationSearch.index(0,0, data.location)).venues[0].external_id,
                    width: 0.5,
                    height: 0.5,
                    x: 0.5,
                    y: 0.5
                }))
                .build(),
            })

            return true

        }catch(err){
            console.log(err)
            return false
        }
    }

    async send_post(data:any){
        try{
            const path = join(__dirname, '..', '..', 'src/assets/' + data.post_img);
            const file = readFileSync(path);

            await this.ig.publish.photo({
                file,
                caption: data.text,
                location: await this.get_location(data.location)
            })
            return true

        }catch(err){
            console.log(err)
            return false
        }
    }

    async send_albume(data:any){
        try{
            const files = []
            for (const _file of data.files){
                const path = join(__dirname, '..', '..', 'src/assets/' + _file);
                const file = readFileSync(path);
                files.push({file: file})
            }
            await this.ig.publish.album({
                items: files,
                caption: data.text,
                location: await this.get_location(data.location)
            })
        }catch(err){
            console.log(err)
            return false
        }
    }

    async get_location(payload:string){
        try{
            const location = await this.ig.locationSearch.index(0,0, payload);
            return location?.venues[0] || null
        }catch(err){
            console.log('Get location error')
            console.log(err)
        }
    }
}