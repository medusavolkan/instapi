import { DataSource } from "typeorm";
import { Account } from "../account.model";

export const accountProviders = [
    {
        provide: 'ACCOUNT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Account),
        inject: ['SQLITE']
    }
]