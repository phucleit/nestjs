import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { HostingsService } from '../hostings.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsHostingsAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(private hostings: HostingsService) {}

    async validate(str: any, args: ValidationArguments) {
        var model = await this.hostings.findByName(str);
        if(model == null) return true;
        return false;
    }
}

export function IsHostingsAlreadyExist(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsHostingsAlreadyExistConstraint,
          });
    }
}