import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type HostingsDocument = Hostings & Document;

export enum HostingsStatus {
  OK,BAD,NOTEXIST
}

@Schema({ timestamps: true })
export class Hostings {
    @Prop({type: String, required: true})
    name: String;
}

export const HostingsSchema = SchemaFactory.createForClass(Hostings);