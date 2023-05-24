import { Injectable } from "@nestjs/common";
import { AppService } from "./app.service";

@Injectable()
export class Guang {
    constructor(private appService: AppService) {
    }
}