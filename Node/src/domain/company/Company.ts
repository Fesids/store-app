import { Entity } from "../../core/Entity";
import { IAggregateRoot } from "../../core/IAggregateRoot";



export interface ICompanyProps{
    name: string,
    employeesCount: number,
    createdAt: Date,
    updatedAt: Date
}

export class Company extends Entity<ICompanyProps> implements IAggregateRoot{

    private _name: string;
    private _employeesCount: number;
    private _createdAt: Date;
    private _updatedAt: Date;


    constructor({name, employeesCount,createdAt, updatedAt}: ICompanyProps, guid?:string){
        super(guid);
        this._name = name;
        this._employeesCount = employeesCount;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
       
    }

    get name(){
        return this._name;
    }  

    get employeesCount(){
        return this._employeesCount;
    }

    get createdAt(){
        return this._createdAt;
    }

    get updatedAt(){
        return this._updatedAt;
    }

 

    public static create(props: ICompanyProps, guid?: string ){
        return new Company(props, guid);
    }

}