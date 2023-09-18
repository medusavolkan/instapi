import { DataSource } from "typeorm";
import { Gallery } from "../gallery.model";

export const galleryProviders = [
    {
        provide: 'GALLERY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Gallery),
        inject: ['SQLITE']
    }
]