import { ForbiddenError } from "@casl/ability";
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RuleTester } from "eslint";
import { CHECK_ABILITY, RequireRule } from "./ability.decorator";
import { PolicyHandler } from "./ability.handler";
import { Action, AppAbility, CaslAbilityFactory } from "./casl-ability.factory";

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequireRule[]>(
        CHECK_ABILITY,
        context.getHandler(),
      ) || [];

    const { user } = context.switchToHttp().getRequest();
    const ability = this.caslAbilityFactory.createForUser(user);
    try {
        rules.forEach((rule)=>{
            console.log(rule)
            ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
            return true;
        })
    }
    catch(error){
      throw new ForbiddenException(error.message)
    }
    return true;
  }
}