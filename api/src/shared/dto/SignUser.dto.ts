import { IsNotEmpty,IsStrongPassword } from "class-validator";

export class SignUserDto{
    @IsNotEmpty()
    ICE:String 
    @IsStrongPassword()
    Password:String
}