import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { IsHostingsAlreadyExist } from '../schemas/hostings.validate';

export class CreateHostingDto {
    @IsNotEmpty({
        message: 'Name should not be empty'
    })
    @MinLength(3, {
        message: 'Name is too short, mininal length is $constraint1'
    })
    @MaxLength(20, {
        message: 'Name is too long, maxinimal length is $constraint1 characters, but actual is $value',
    })
    @IsHostingsAlreadyExist({
        message: '$value already exists. Choose another name.'
    })
    name: String;

    price: String;
    capacity: String;
    bandwidth: String;
    subdomain: String;
    email: String;
    ftp: String;
    database: String;
}
