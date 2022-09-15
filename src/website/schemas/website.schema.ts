import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PromiseProvider, Schema as MongooseSchema } from 'mongoose';

export type WebsiteDocument = Website & Document;

export enum WebsiteStatus {
  OK,BAD,NOTEXIST
}

@Schema({ timestamps: true })
export class Website {
    @Prop({type: String, required: true})
    name: String;

    @Prop({type: String, required: true})
    price: String;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hostings', required: false,  autopopulate: true })
    hosting:  MongooseSchema.Types.ObjectId
}

export const WebsiteSchema = SchemaFactory.createForClass(Website);