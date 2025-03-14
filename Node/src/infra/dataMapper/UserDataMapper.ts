import { injectable } from "inversify";
import { IDataMapper } from "../../core/IDataMapper";
import { User } from "../../domain/user/User";
import e from "express";

@injectable()
export class UserDataMapper implements IDataMapper<User> {
    toDomain(dalEntity: any): User {
        const {
            guid,
            email,
            firstName,
            lastName,
            password,
            createdAt,
            updatedAt,
            roles
        } = dalEntity;

        return User.create({email,firstName, lastName, password, createdAt, updatedAt, roles}, guid);
    }

    toDalEntity(entity: User) {
        return {
            guid: entity.guid,
            email: entity.email,
            firstName: entity.firstname,
            lastName: entity.lastname,
            password: entity.password,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            roles: entity.roles
        }
    }

    
}