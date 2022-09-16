import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PromiseProvider, Schema as MongooseSchema } from 'mongoose';

export type WebsitesDocument = Websites & Document;

export enum WebsitesStatus {
  OK,BAD,NOTEXIST
}

@Schema({ timestamps: true })
export class Websites {
    @Prop({type: String, required: true})
    name: String;

    @Prop({type: Number, required: true})
    price: Number;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hostings', required: false, default: null, autopopulate: true })
    hosting:  MongooseSchema.Types.ObjectId
}

export const WebsitesSchema = SchemaFactory.createForClass(Websites);