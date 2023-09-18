import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Gallery } from "src/model/gallery.model";
import { Repository } from "typeorm";

@Injectable()
export class GalleryService {
    constructor(
        @Inject('GALLERY_REPOSITORY') private galleryRepository: Repository<Gallery>
    ) {}

    async create_gallery(data:any){
        try{

            for (const d of data){
                const gallery = new Gallery()
                gallery.path = d['filename'] || ''
                await this.galleryRepository.save(gallery)
            }
        }catch(err){
            throw new HttpException('Upload file error', HttpStatus.BAD_GATEWAY)
        }
    }

    async get_images(){
        try{
            const images = await this.galleryRepository.find()
            return images
        }catch(err){
            throw new HttpException('Get images error', HttpStatus.BAD_GATEWAY)
        }
    }

    async delete_image(id:number){
        try{
            await this.galleryRepository.delete(id)
            return true
        }catch(err){
            throw new HttpException('Delete image error', HttpStatus.BAD_GATEWAY)
        }
    }
}