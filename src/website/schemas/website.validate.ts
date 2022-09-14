import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { WebsiteService } from '../website.service';

  @ValidatorConstraint({ async: true })
  @Injectable()
  export class IsWebsiteAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(private website: WebsiteService) {}

    async validate(str: any, args: ValidationArguments,) {
        var model = await this.website.findByName(str);
        if(model == null) return true;
        return false;
    }
  }
  export function IsWebsiteAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsWebsiteAlreadyExistConstraint,
      });
    };
  }