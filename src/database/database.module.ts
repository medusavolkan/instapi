import { Module } from "@nestjs/common";
import { sqliteProviders } from "./sqlite/sqlite.providers";

@Module({
    providers: [...sqliteProviders],
    exports: [...sqliteProviders]
})
export class DatabaseModule {}