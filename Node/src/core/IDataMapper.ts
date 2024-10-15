export interface IDataMapper<IDomainEntity>{
    toDomain(dalEntity: any): IDomainEntity;
    toDalEntity(entity: IDomainEntity): any;
}