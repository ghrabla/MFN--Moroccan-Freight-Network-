import { IsArray, IsNotEmpty ,IsObject,IsStrongPassword} from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    STE:String
    @IsNotEmpty()
    Manager:string
    @IsNotEmpty()
    NUM:String
    @IsNotEmpty()
    ICE:String
    @IsNotEmpty()
    coords:[{
        lang:number
        lat:number
    }]
    @IsStrongPassword()
    Password:string
}