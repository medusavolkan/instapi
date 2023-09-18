import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import {secureSession} from 'fastify-secure-session'

@Injectable()
export class LoginInterceptors implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        let isLogin = false

        const request = context.switchToHttp().getRequest()
        const response = context.switchToHttp().getResponse()
        const session = request.session as secureSession

        if (session && session['token']){
            isLogin = true
        }

        response.locals.isLogin = isLogin
        return next.handle()
    }
}