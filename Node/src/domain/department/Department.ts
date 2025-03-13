import { Entity } from "../../core/Entity";
import { IAggregateRoot } from "../../core/IAggregateRoot";



export interface IDepartmentProps{
    name: string,
    companyId: string,
    description: string,
    supervisors: Array<string>,
    gestor: string,
    createdAt: Date,
    updatedAt: Date
}

export class Department extends Entity<IDepartmentProps> implements IAggregateRoot{

    private _name: string;
    private _companyId: string;
    private _description: string;
    private _supervisors: Array<string>;
    private _gestor: string;
    private _createdAt: Date;
    private _updatedAt: Date;


    constructor({name, companyId, description, supervisors, gestor, createdAt, updatedAt}: IDepartmentProps, guid?:string){
        super(guid);
        this._name = name;
        this._companyId = companyId;
        this._description = description;
        this._supervisors = supervisors;
        this._gestor = gestor;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
       
    }

    get name(){
        return this._name;
    } 
    
    get companyId(){
        return this._companyId;
    }

    get description(){
        return this._description;
    }

    get supervisors(){
        return this._supervisors;
    }

    get gestor() {
        return this._gestor;
    }

    get createdAt(){
        return this._createdAt;
    }

    get updatedAt(){
        return this._updatedAt;
    }

 

    public static create(props: IDepartmentProps, guid?: string ){
        return new Department(props, guid);
    }

}