import { FilesInterceptor, MemoryStorageFile, UploadedFile, UploadedFiles } from "@blazity/nest-file-fastify";
import { Controller, Get, Param, Post, Render, Res, UseGuards, UseInterceptors } from "@nestjs/common";
import { GalleryService } from "./gallery.service";
import { Response } from "express";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('gallery')
@UseGuards(AuthGuard)
export class GalleryController {
    constructor(private galleryService:GalleryService) {}

    @Get()
    @Render('gallery')
    async get_gallery(){
        const images = await this.galleryService.get_images()
        return {
            title: 'Galeri',
            images: images
        }
    }

    @Post()
    @UseInterceptors(FilesInterceptor('files', 5, {
        dest: 'src/assets/public/uploads'
    }))
    async post_gallery(@UploadedFiles() files: MemoryStorageFile, @Res() response:Response){
        const save = await this.galleryService.create_gallery(files)
        response.redirect(302, '/gallery')
    }

    @Get('delete/:id')
    async delete_image(@Param('id') id:number, @Res() response:Response):Promise<void>{
        await this.galleryService.delete_image(id)
        response.redirect(302, '/gallery')
    }
}