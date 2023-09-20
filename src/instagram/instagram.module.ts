import { Module } from "@nestjs/common";
import { InstagramController } from "./instagram.controller";
import { InstagramService } from "./instagram.service";
import { GalleryService } from "src/gallery/gallery.service";
import { GalleryModule } from "src/gallery/gallery.module";
import { galleryProviders } from "src/model/providers/gallery.providers";
import { AccountService } from "src/account/account.service";
import { accountProviders } from "src/model/providers/account.providers";
import { LocationService } from "src/location/location.service";
import { locationProviders } from "src/model/providers/location.providers";

@Module({
    imports: [],
    controllers: [InstagramController],
    providers: [
        InstagramService, 
        GalleryService, ...galleryProviders,
        AccountService, ...accountProviders,
        LocationService, ...locationProviders
    ],
    exports: []
})
export class InstagramModule {}