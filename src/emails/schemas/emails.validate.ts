import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { EmailsService } from '../emails.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailsAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(private emails: EmailsService) {}

    async validate(str: any, args: ValidationArguments) {
        var model = await this.emails.findByName(str);
        if(model == null) return true;
        return false;
    }
}

export function IsEmailsAlreadyExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailsAlreadyExistConstraint,
          });
    }
}