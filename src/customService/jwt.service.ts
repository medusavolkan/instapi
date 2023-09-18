import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken'

@Injectable()
export class JwtService {
    private secret_key = "instapi"
    constructor() {}

    generate_token(payload:any){
        return jwt.sign(payload, this.secret_key)
    }

    verify_token(token:string){
        return jwt.verify(token, this.secret_key)
    }
}