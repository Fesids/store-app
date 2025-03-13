import { injectable } from "inversify";
import { IDataMapper } from "../../core/IDataMapper";
import { Membership } from "../../domain/membership/Membership";

@injectable()
export class MembershipDataMapper implements IDataMapper<Membership>{
    toDomain(dalEntity: any): Membership {
        const {
            guid,
            userId,
            companyId,
            departmentId,
            memberRole,
            updatedAt,
            createdAt
        } = dalEntity;

        return Membership.create({userId,  companyId, departmentId, memberRole, createdAt, updatedAt}, guid)
    }

    
    toDalEntity(entity: Membership) {
        return {
            guid: entity.guid,
            userId: entity.userId,
            companyId: entity.companyId,
            departmentId: entity.departmentId,
            memberRole: entity.memberRole,
            updatedAt: entity.updatedAt,
            createdAt: entity.createdAt
        }
    }
    
}