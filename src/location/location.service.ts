import { Inject, Injectable } from "@nestjs/common";
import { AccountService } from "src/account/account.service";
import { InstagramService } from "src/instagram/instagram.service";
import { Location } from "src/model/location.model";
import { Repository } from "typeorm";

@Injectable()
export class LocationService {
    constructor(private instagramService: InstagramService, private accountService: AccountService, @Inject('LOCATION_REPOSITORY') private locationRepository: Repository<Location>) {}

    async create_location(payload:string){
        const account = await this.accountService.get_all_account()
        const _account = await account[0]

        await this.instagramService.login(_account.username, _account.password)
        const location = await this.instagramService.get_location(payload)
        
        const _location = new Location()
        _location.name = location.name
        _location.coordinates = location.lat + ',' + location.lng
        await this.locationRepository.save(_location)
        return location
    }

    async get_all_location(){
        try{
            const locations = await this.locationRepository.find()
            return locations

        }catch(err){
            console.log(err)
        }
    }
}