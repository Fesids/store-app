import { Pagination } from "../shared/pagination/Pagination";

export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findOneById(id: string): Promise<T | null>;
    findFieldValue(lookupField: string, lookupValue: any, targetField: string): Promise<any | null>,
    //findOneByParam(key: string, value: string): Promise<T | any>;
    findOneByParam(params: Record<string, any>): Promise<T | any>;
    findAllByParams(params?: Record<string, any>, pagination?: Pagination): Promise<T | any>;
    findAllByParam(param: any, value:any): Promise<Array<T> | any>;
    doesExists(id: string): Promise<boolean>;
    save(entity: T): Promise<void>;
    delete(id: string): Promise<void>;
    updateOneById(id: string, updates: Partial<T>): Promise<void>;
    updateManyByParams(params: Record<string, any>, updates: Partial<T>): Promise<void>;
    countByCriteria(criteria: Record<string, any>): Promise<number>;
    aggregate(pipeline: any[]): Promise<any[]>;


}