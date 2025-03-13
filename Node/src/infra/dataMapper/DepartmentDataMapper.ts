import { injectable } from "inversify";
import { IDataMapper } from "../../core/IDataMapper";
import { Department } from "../../domain/department/Department";




@injectable()
export class DepartmentDataMapper implements IDataMapper<Department>{
    toDomain(dalEntity: any): Department {
        const {
            guid,
            name,
            companyId,
            description,
            supervisors,
            gestor,
            updatedAt,
            createdAt
        } = dalEntity;

        return Department.create({name, companyId, description, supervisors, gestor, createdAt, updatedAt}, guid)
    }

    
    toDalEntity(entity: Department) {
        return {
            guid: entity.guid,
            name: entity.name,
            companyId: entity.companyId,
            description: entity.description,
            supervisors: entity.supervisors,
            gestor: entity.gestor,
            updatedAt: entity.updatedAt,
            createdAt: entity.createdAt
        }
    }
    
}