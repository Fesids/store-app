import { inject } from "inversify";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/User";
import { Repository } from "./Repository";
import { TYPES } from "../../constants/types";
import { IDataMapper } from "../../core/IDataMapper";
import { Db } from "mongodb";


export class UserRepository extends Repository<User> implements IUserRepository {

    constructor(
        @inject(TYPES.Db) private readonly db:Db,
        @inject(TYPES.UserDataMapper) private readonly userDataMapper: IDataMapper<User>
    ) {
        super(db.collection('users'), userDataMapper)
    }

}