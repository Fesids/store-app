import { injectable } from "inversify";
import { IDataMapper } from "../../core/IDataMapper";
import { Role } from "../../domain/role/Role";
import { Company } from "../../domain/company/Company";
import { updated } from "../../interfaces/http/processors/response";


@injectable()
export class CompanyDataMapper implements IDataMapper<Company>{
    toDomain(dalEntity: any): Company {
        const {
            guid,
            name,
            employeesCount,
            updatedAt,
            createdAt
        } = dalEntity;

        return Company.create({name, employeesCount, createdAt, updatedAt}, guid)
    }

    
    toDalEntity(entity: Company) {
        return {
            guid: entity.guid,
            name: entity.name,
            employeesCount: entity.employeesCount,
            updatedAt: entity.updatedAt,
            createdAt: entity.createdAt
        }
    }
    
}