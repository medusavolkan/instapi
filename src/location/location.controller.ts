import { Body, Controller, Get, Post, Render, Res } from "@nestjs/common";
import { Response } from "express";
import { LocationService } from "./location.service";

@Controller('location')
export class LocationController {
    constructor(private locationService:LocationService) {}

    @Get()
    @Render('location')
    async get_location() {
        const locations = await this.locationService.get_all_location()

        return {
            title: "Lokasyonlar",
            locations: locations
        }
    }

    @Post()
    async post_location(@Body() body:any, @Res() response:Response){
        await this.locationService.create_location(body.name);
        response.redirect(302, '/location');
    }
}