import { Module } from "@nestjs/common";
import { GalleryController } from "./gallery.controller";
import { GalleryService } from "./gallery.service";
import { galleryProviders } from "src/model/providers/gallery.providers";

@Module({
    controllers: [GalleryController],
    providers: [GalleryService, ...galleryProviders],
    exports: [GalleryService]
})
export class GalleryModule {}