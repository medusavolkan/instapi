import { Body, Controller, Get, Post, Render, Res, Session } from "@nestjs/common";
import { Response, response } from "express";
import { UserService } from "./user.service";
import * as secureSession from '@fastify/secure-session'
@Controller('user')
export class UserController {
    constructor(private userService:UserService) {}


    @Get('register')
    @Render('user/register')
    async get_register(){
        return {
            title: 'Kayıt Ol'
        }
    }

    @Post('register')
    async post_register(@Body() body:any, @Res() res:Response){
        const register = await this.userService.register(body)

        if (register){
            res.redirect(302, '/user/login')
        }

        res.redirect(302, '/user/register')
    }

    @Get('login')
    @Render('user/login')
    async get_login(){
        return {
            title:'Giriş Yap'
        }
    }

    @Post('login')
    async post_login(@Body() body:any, @Res() response:Response, @Session() session: secureSession.Session){
        const login = await this.userService.login(body)

        if (login){
            session.set('token', login)
            response.redirect(302, '/')
        }

        response.redirect(302, '/user/login')
    }

    @Get('logout')
    async get_logout(@Session() session:secureSession.Session, @Res() response:Response){
        session.delete()
        response.redirect(302, '/user/login')
    }
}