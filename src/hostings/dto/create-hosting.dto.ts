import { IsNotEmpty, MinLength, MaxLength, IsNumber, IsPositive } from 'class-validator';
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

    @IsPositive({
        message: 'Price is a positive number greater than zero'
    })
    @IsNotEmpty({
        message: 'Price should not be empty'
    })
    @IsNumber()
    price: Number;

    @IsNotEmpty({
        message: 'Price should not be empty'
    })
    capacity: String;

    bandwidth: String;
    subdomain: String;
    email: String;
    ftp: String;
    database: String;
}
