import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export type EmailsDocument = Emails & Document;

export enum EmailsStatus {
    OK, BAD, NOTEXIST
}

@Schema({ timestamps: true })
export class Emails {
    @Prop({type: String, required: true})
    name: String;

    @Prop({type: Number, required: true})
    price: Number;

    @Prop({type: String, required: true})
    capacity: String;
}

export const EmailsSchema = SchemaFactory.createForClass(Emails);