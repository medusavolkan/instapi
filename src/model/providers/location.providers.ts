import { DataSource } from "typeorm";
import { Location } from "../location.model";

export const locationProviders = [
    {
        provide: 'LOCATION_REPOSITORY',
        useFactory: (dataSource:DataSource) => dataSource.getRepository(Location),
        inject: ['SQLITE']
    }
]