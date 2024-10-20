import { injectable } from "inversify";
import { IDataMapper } from "../../core/IDataMapper";
import { Application } from "../../domain/application/Application";

@injectable()
export class ApplicationDataMapper implements IDataMapper<Application>{
    toDomain(dalEntity: any): Application {
        throw new Error("Method not implemented.");
    }
    toDalEntity(entity: Application) {
        throw new Error("Method not implemented.");
    }

}