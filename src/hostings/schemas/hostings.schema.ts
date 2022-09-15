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

    @Prop({type: String})
    price: String;

    @Prop({type: String})
    capacity: String;

    @Prop({type: String})
    bandwidth: String;

    @Prop({type: String})
    subdomain: String;

    @Prop({type: String})
    email: String;

    @Prop({type: String})
    ftp: String;
    
    @Prop({type: String})
    database: String;

    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Website', required: false,  autopopulate: {select: 'name'} })
    websites: MongooseSchema.Types.ObjectId[]
}

export const HostingsSchema = SchemaFactory.createForClass(Hostings);