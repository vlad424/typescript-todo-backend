import { Injectable } from "@nestjs/common";

@Injectable()

export class AppService {
    getUsers(check : number) {
        if(check === 1) {
            return 'access'
        }
        else {
            return 'blocked'
        }
    }
}