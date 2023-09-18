import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'
import { JwtService } from "src/customService/jwt.service";
import { User } from "src/model/user.model";
import { Repository } from "typeorm";


@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async register(data:any){
        try{
            const password = await bcrypt.hash(data.password, 5)
            data.password = password
            await this.userRepository.save(data)
            return true
        }catch(err){
            console.log(err)
            return false
        }
    }

    async login(data:any){
        try{
            const control = await this.userRepository.findOne(
                {
                    where: {
                        email:data.email
                    }
                }
            )

            if (control){
                const password_control = await bcrypt.compare(data.password, control.password)

                if (password_control){
                    const token = this.jwtService.generate_token({id: control.id})
                    return token
                }
            }

        }catch(err){
            console.log(err)
            return false
        }
    }
    
}