import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IsWebsiteAlreadyExist } from '../schemas/website.validate';
import { ObjectId } from 'mongoose';

export class CreateWebsiteDto {
    @IsNotEmpty({
        message: 'Name should not be empty'
    })
    @MinLength(3, {
        message: 'Name is too short, mininal length is $constraint1'
    })
    @MaxLength(20, {
        message: 'Name is too long, maxinimal length is $constraint1 characters, but actual is $value',
    })
    @IsWebsiteAlreadyExist({
        message: '$value already exists. Choose another name.'
    })
    name: String;

    price: String;
    hosting: ObjectId;
}
