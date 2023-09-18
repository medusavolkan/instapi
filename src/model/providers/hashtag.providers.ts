import { DataSource } from "typeorm";
import { Hashtag } from "../hashtag.model";

export const hashtagProviders = [
    {
        provide: 'HASHTAG_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Hashtag),
        inject: ['SQLITE']
    }
]