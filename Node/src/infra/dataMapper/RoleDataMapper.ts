import { injectable } from "inversify";
import { IDataMapper } from "../../core/IDataMapper";
import { Role } from "../../domain/role/Role";


@injectable()
export class RoleDataMapper implements IDataMapper<Role>{
    toDomain(dalEntity: any): Role {
        const {
            guid,
            name,
            description,
            active
        } = dalEntity;

        return Role.create({name, description, active}, guid)
    }

    
    toDalEntity(entity: Role) {
        return {
            guid: entity.guid,
            name: entity.name,
            description: entity.description,
            active: entity.active
        }
    }
    
}