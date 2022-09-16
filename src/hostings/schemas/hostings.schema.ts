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

    @Prop({type: Number, required: true})
    price: Number;

    @Prop({type: String, required: true})
    capacity: String;

    @Prop({type: String, default: null})
    bandwidth: String;

    @Prop({type: String, default: null})
    subdomain: String;

    @Prop({type: String, default: null})
    email: String;

    @Prop({type: String, default: null})
    ftp: String;
    
    @Prop({type: String, default: null})
    database: String;
}

export const HostingsSchema = SchemaFactory.createForClass(Hostings);