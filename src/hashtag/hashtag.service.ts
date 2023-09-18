import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Hashtag } from "src/model/hashtag.model";
import { Repository } from "typeorm";

@Injectable()
export class HashtagService {
    constructor (
        @Inject('HASHTAG_REPOSITORY') private hashtagRepository: Repository<Hashtag>
    ) {}


    async create_hashtag(data:any){
        try{
            const hashtag = await this.hashtagRepository.save(data)
            return hashtag

        }catch(err){
            throw new HttpException('Hashtag add error', HttpStatus.BAD_GATEWAY)
        }
    }

    async get_all_hashtag(){
        try{
            const hashtags = await this.hashtagRepository.find()
            return hashtags

        }catch(err){
            throw new HttpException('Hashtag get error', HttpStatus.BAD_GATEWAY)
        }
    }

    async get_delete_hashtag(id:number): Promise<void>{
        try{
            await this.hashtagRepository.delete(id)
        }catch(err){
            throw new HttpException('Hashtag delete error', HttpStatus.BAD_GATEWAY)
        }
    }
    
}