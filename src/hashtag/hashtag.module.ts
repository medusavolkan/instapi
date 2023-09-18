import { Module } from "@nestjs/common";
import { HashtagService } from "./hashtag.service";
import { HashtagController } from "./hashtag.controller";
import { hashtagProviders } from "src/model/providers/hashtag.providers";

@Module({
    controllers: [HashtagController],
    providers: [HashtagService, ...hashtagProviders]
})
export class HashtagModule {}