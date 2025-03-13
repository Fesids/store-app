import { inject } from "inversify";
import { Attach } from "../../domain/attach/Attach";
import { IAttachRepository } from "../../domain/attach/IAttachRepository";
import { Repository } from "./Repository";
import { TYPES } from "../../constants/types";
import { Db } from "mongodb";
import { IDataMapper } from "../../core/IDataMapper";
import { Department } from "../../domain/department/Department";
import { IDepartmentRepository } from "../../domain/department/IDepartmentRepository";



export class DepartmentRepository extends Repository<Department> implements IDepartmentRepository {

    constructor(
        @inject(TYPES.Db) private readonly db:Db,
        @inject(TYPES.DepartmentDataMapper) private readonly departmentDataMapper: IDataMapper<Department>
    ) {
        super(db.collection('departments'), departmentDataMapper)
    }

}