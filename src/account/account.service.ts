import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { Account } from "src/model/account.model";
import { Repository } from "typeorm";

@Injectable()
export class AccountService {
    constructor(@Inject('ACCOUNT_REPOSITORY') private accountRepository: Repository<Account>) { }

    async create_account(data: any) {
        try {
            const account = await this.accountRepository.save(data)
            return account
        } catch (err) {
            throw new HttpException('Account error', HttpStatus.BAD_GATEWAY)
        }
    }

    async get_all_account() {
        try {
            const accounts = await this.accountRepository.find()
            return accounts
        } catch (err) {
            throw new HttpException('Account error', HttpStatus.BAD_GATEWAY)
        }
    }

    async get_account(id: number) {
        try {
            const account = await this.accountRepository.findOne(
                {
                    where: {
                        id: id
                    }
                }
            )

            return account
        } catch (err) {
            throw new HttpException('Account error', HttpStatus.BAD_GATEWAY)
        }
    }

    async get_delete(id:number): Promise<void>{
        try{
            await this.accountRepository.delete(id)
        }catch(err){
            throw new HttpException('Account error', HttpStatus.BAD_GATEWAY)
        }
    }
}