import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { WebsitesService } from '../websites.service';

  @ValidatorConstraint({ async: true })
  @Injectable()
  export class IsWebsitesAlreadyExistConstraint implements ValidatorConstraintInterface {
    constructor(private websites: WebsitesService) {}

    async validate(str: any, args: ValidationArguments,) {
        var model = await this.websites.findByName(str);
        if(model == null) return true;
        return false;
    }
  }
  export function IsWebsitesAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsWebsitesAlreadyExistConstraint,
      });
    };
  }