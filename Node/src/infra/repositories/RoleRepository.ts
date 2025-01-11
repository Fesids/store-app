import { inject } from "inversify";
import { IRoleRepository } from "../../domain/role/IRoleRepository";
import { Role } from "../../domain/role/Role";
import { Repository } from "./Repository";
import { TYPES } from "../../constants/types";
import { Db } from "mongodb";
import { IDataMapper } from "../../core/IDataMapper";

export class RoleRepository extends Repository<Role> implements IRoleRepository {

    constructor(
        @inject(TYPES.Db) private readonly db:Db,
        @inject(TYPES.RoleDataMapper) private readonly roleDataMapper: IDataMapper<Role>
    ) {
        super(db.collection('roles'), roleDataMapper)
    }

}