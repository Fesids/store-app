import { inject } from "inversify";
import { Attach } from "../../domain/attach/Attach";
import { IAttachRepository } from "../../domain/attach/IAttachRepository";
import { Repository } from "./Repository";
import { TYPES } from "../../constants/types";
import { Db } from "mongodb";
import { IDataMapper } from "../../core/IDataMapper";
import { Membership } from "../../domain/membership/Membership";
import { IMembershipRepository } from "../../domain/membership/IMembershipRepository";



export class MembershipRepository extends Repository<Membership> implements IMembershipRepository {

    constructor(
        @inject(TYPES.Db) private readonly db:Db,
        @inject(TYPES.MembershipDataMapper) private readonly membershipDataMapper: IDataMapper<Membership>
    ) {
        super(db.collection('membership'), membershipDataMapper)
    }

}