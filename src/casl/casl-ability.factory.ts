import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from "src/user/schemas/user.schema";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export type Subjects = InferSubjects<typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);
    console.log(user)
    if (user.isAdmin) {
      can(Action.Manage, 'all');
      can(Action.Read, 'all'); 
      can(Action.Create, 'all');
      can(Action.Update, 'all');
      can(Action.Delete, 'all'); 
    } else {
      //cannot(Action.Read, Product).because("??? hoi lam gi")
    }
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}


