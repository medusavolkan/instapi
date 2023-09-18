import { Body, Controller, Get, Param, Post, Render, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AccountService } from "./account.service";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {
    constructor(private accountService: AccountService) { }

    @Get()
    @Render('account')
    async get_account(){
        const accounts = await this.accountService.get_all_account()

        return {
            title: 'Hesap İşlemleri',
            accounts: accounts
        }
    }

    @Post()
    async post_paccount(@Body() body:any, @Res() response:Response){
        const save = await this.accountService.create_account(body)
        response.redirect(302, '/account')
    }

    @Get('delete/:id')
    async get_delete_user(@Param('id') id:number, @Res() response:Response){
        await this.accountService.get_delete(id)
        response.redirect(302, '/account')
    }
}