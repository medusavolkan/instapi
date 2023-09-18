import { CallHandler, ExecutionContext, Injectable, NestInterceptor, OnModuleInit } from "@nestjs/common";
import { join } from "path";
import * as fs from 'fs'
import handlebars from 'handlebars'
import { Observable } from "rxjs";

@Injectable()
export class PartialsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const partialsDir = join(__dirname, '..','..', 'src/assets/views/partials');
        const partialFiles = fs.readdirSync(partialsDir);
        
        partialFiles.forEach((file) => {
            const partialPath = join(partialsDir, file);
            const partialContent = fs.readFileSync(partialPath, 'utf8');
            const partialName = file.split('.')[0];
            handlebars.registerPartial(partialName, partialContent);
        })

        return next.handle();
    }
}