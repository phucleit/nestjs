import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserStatus {
  OK,BAD,NOTEXIST
}

@Schema()
export class User {
  @Prop({type: Number})
  id: Number;

  @Prop({required:true})
  username: string;

  @Prop({require:true, type: String})
  password: String;

  @Prop({require: true})
  email: String;
  
  @Prop({type: Number})
  status: Number;

  @Prop({type: Boolean})
  isAdmin: Boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);