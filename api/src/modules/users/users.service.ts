import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>
    ){}
    async FetchUsers():Promise<{users:{}}> {
        const users = await this.userModel.find()
        if (!users) {  
            throw new NotFoundException(`User Not found`);
        }
        return {users}
    }
}
