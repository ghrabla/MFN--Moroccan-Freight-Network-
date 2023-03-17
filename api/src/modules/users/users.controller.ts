import { Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private UsersService : UsersService){}
    @Get('')
    FetchUsers(){
        return this.UsersService.FetchUsers()
    }
}
