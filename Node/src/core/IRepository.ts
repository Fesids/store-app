export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findOneById(id: string): Promise<T | null>;
    //findOneByParam(key: string, value: string): Promise<T | any>;
    findOneByParam(params: Record<string, any>): Promise<T | any>;
    doesExists(id: string): Promise<boolean>;
    save(entity: T): Promise<void>;
    delete(id: string): Promise<void>;

}