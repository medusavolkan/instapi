import { Account } from "src/model/account.model"
import { Gallery } from "src/model/gallery.model"
import { Hashtag } from "src/model/hashtag.model"
import { User } from "src/model/user.model"
import { DataSource } from "typeorm"


export const sqliteProviders = [
    {
        provide: 'SQLITE',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'sqlite',
                database: 'src/database/db.sqlite',
                entities: [Account, Hashtag, Gallery, User],
                synchronize: true,
            })

            return dataSource.initialize()
        }
    }
]