import { Module } from "@nestjs/common";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";
import { accountProviders } from "src/model/providers/account.providers";

@Module({
    controllers: [AccountController],
    providers: [AccountService, ...accountProviders]
})
export class AccountModule {}