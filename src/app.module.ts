import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PartialsInterceptor } from './interceptors/partials.interceptors';
import { DatabaseModule } from './database/database.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { GalleryModule } from './gallery/gallery.module';
import { InstagramModule } from './instagram/instagram.module';
import { LoginInterceptors } from './interceptors/login.interceptors';
import { UserModule } from './user/user.module';
import { JwtService } from './customService/jwt.service';
import { LocationModule } from './location/location.module';
import { InstagramService } from './instagram/instagram.service';
import { LocationService } from './location/location.service';
import { locationProviders } from './model/providers/location.providers';

@Global()
@Module({
  imports: [DatabaseModule,AccountModule, HashtagModule, GalleryModule, InstagramModule, UserModule, LocationModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PartialsInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoginInterceptors
    },
    JwtService
  ],
  exports: [DatabaseModule, JwtService, LocationModule]
})
export class AppModule {}
