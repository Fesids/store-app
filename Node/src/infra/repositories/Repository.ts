import { injectable, unmanaged } from "inversify";
import { IRepository } from "../../core/IRepository";
import { Collection } from "mongodb";
import { IDataMapper } from "../../core/IDataMapper";


@injectable()
export class Repository<IDomainEntity> implements IRepository<IDomainEntity> {

    private readonly collectionInstance: Collection;
    private readonly dataMapper: IDataMapper<IDomainEntity>;


    constructor(
        @unmanaged() collectionInstance: Collection,
        @unmanaged() dataMapper: IDataMapper<IDomainEntity>
    ) {
        this.collectionInstance = collectionInstance;
        this.dataMapper = dataMapper;
    }

    async findAllByParam(params: Record<string, any>): Promise<IDomainEntity | any> {
       
        const query = Object.fromEntries(
            Object.entries(params).map(([key, value]) => 
                Array.isArray(value) ? [key, { $in: value }] : [key, value]
            )
        );
    
        const dbResult = await this.collectionInstance.find(query).toArray();
        if (!dbResult) return null;
        
        return dbResult.map(item => this.dataMapper.toDomain(item));
    }
    

    async findAll(): Promise<IDomainEntity[]> {
       const dbResult = await this.collectionInstance.find({}).toArray();
       return dbResult.map((result) => this.dataMapper.toDomain(result));
    }

    async findOneById(id: string): Promise<IDomainEntity | null> {
        const dbResult = await this.collectionInstance.findOne({guid:id});
        if (!dbResult) return null;
        return this.dataMapper.toDomain(dbResult);

    }

    async findOneByParam(
        params: Record<string, any>
    ): Promise<IDomainEntity | null> {
        //const paramKeyValue = {key: value}
        const dbResult = await this.collectionInstance.findOne(params);
        if (!dbResult) return null;
        return this.dataMapper.toDomain(dbResult);
    }

    async doesExists(id: string): Promise<boolean> {
        const dbResult = await this.collectionInstance.findOne({id});
        return !!dbResult;
    }

    /*async save(entity: IDomainEntity): Promise<void> {
        const guid = (entity as any).guid;
        const exists = await this.doesExists(guid);

        if(!exists){
            await this.collectionInstance.insertOne(this.dataMapper.toDalEntity(entity));
            return;
        }
        await this.collectionInstance.replaceOne({guid}, entity as any)
    }*/

        async save(entity: IDomainEntity): Promise<void> {
            try {
                const guid = (entity as any).guid;
                const exists = await this.doesExists(guid);
        
                if (!exists) {
                    await this.collectionInstance.insertOne(this.dataMapper.toDalEntity(entity));
                    return;
                }
                
                await this.collectionInstance.replaceOne({ guid }, entity as any);
            } catch (error) {
                console.error("An error occurred while saving the entity:", error);
                // Handle the error as needed, e.g., throw a custom error or perform cleanup
                throw error;
            }
        }
        
    
    async delete(id: string): Promise<void> {
        await this.collectionInstance.deleteOne({guid: id})
    }

    
}