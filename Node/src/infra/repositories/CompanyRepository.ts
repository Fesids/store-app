import { inject } from "inversify";
import { Attach } from "../../domain/attach/Attach";
import { IAttachRepository } from "../../domain/attach/IAttachRepository";
import { Repository } from "./Repository";
import { TYPES } from "../../constants/types";
import { Db } from "mongodb";
import { IDataMapper } from "../../core/IDataMapper";
import { Company } from "../../domain/company/Company";
import { ICompanyRepository } from "../../domain/company/ICompanyRepository";



export class CompanyRepository extends Repository<Company> implements ICompanyRepository {

    constructor(
        @inject(TYPES.Db) private readonly db:Db,
        @inject(TYPES.CompanyDataMapper) private readonly companyDataMapper: IDataMapper<Company>
    ) {
        super(db.collection('companies'), companyDataMapper)
    }

}