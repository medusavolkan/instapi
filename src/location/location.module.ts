import { Module } from "@nestjs/common";
import { LocationController } from "./location.controller";
import { DatabaseModule } from "src/database/database.module";
import { locationProviders } from "src/model/providers/location.providers";
import { LocationService } from "./location.service";
import { InstagramService } from "src/instagram/instagram.service";
import { AccountService } from "src/account/account.service";
import { accountProviders } from "src/model/providers/account.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [LocationController],
    providers: [...locationProviders, LocationService, InstagramService, AccountService, ...accountProviders],
})
export class LocationModule {}