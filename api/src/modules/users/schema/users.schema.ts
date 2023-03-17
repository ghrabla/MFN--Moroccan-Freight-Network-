import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({
    timestamps:true,
})
export class User {
    @Prop()
    ICE:String
    @Prop()
    STE:String
    @Prop()
    Manager:String
    @Prop()
    NUM:String    
    @Prop()
    coords:[{
        lang:number
        lat:number
    }]
    @Prop()
    Password:String
    @Prop({default:false})
    Deleted:boolean
}
export const UserSchema = SchemaFactory.createForClass(User)