import { inject } from "inversify";
import { Attach } from "../../domain/attach/Attach";
import { IAttachRepository } from "../../domain/attach/IAttachRepository";
import { Repository } from "./Repository";
import { TYPES } from "../../constants/types";
import { Db } from "mongodb";
import { IDataMapper } from "../../core/IDataMapper";



export class AttachRepository extends Repository<Attach> implements IAttachRepository {

    constructor(
        @inject(TYPES.Db) private readonly db:Db,
        @inject(TYPES.AttachDataMapper) private readonly attachDataMapper: IDataMapper<Attach>
    ) {
        super(db.collection('attachments'), attachDataMapper)
    }

}