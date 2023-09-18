import { DataSource } from "typeorm";
import { User } from "../user.model";

export const userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory:(dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['SQLITE']
    }
]