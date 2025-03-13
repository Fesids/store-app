import { Entity } from "../../core/Entity";
import { IAggregateRoot } from "../../core/IAggregateRoot";



export interface IMembershipProps{
    userId: string,
    companyId: string,
    departmentId: Array<string>,
    memberRole: string,
    createdAt: Date,
    updatedAt: Date
}

export class Membership extends Entity<IMembershipProps> implements IAggregateRoot{

    private _userId: string;
    private _companyId: string;
    private _departmentId: Array<string>;
    private _memberRole: string;
    private _createdAt: Date;
    private _updatedAt: Date;


    constructor({userId, companyId, departmentId,memberRole, createdAt, updatedAt}: IMembershipProps, guid?:string){
        super(guid);
        this._userId = userId;
        this._companyId = companyId;
        this._departmentId = departmentId;
        this._memberRole = memberRole;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
       
    }

    get userId(){
        return this._userId;
    } 
    
    get companyId(){
        return this._companyId;
    }

    get memberRole(){
        return this._memberRole;
    }

    get departmentId(){
        return this._departmentId;
    }

    get createdAt(){
        return this._createdAt;
    }

    get updatedAt(){
        return this._updatedAt;
    }

 

    public static create(props: IMembershipProps, guid?: string ){
        return new Membership(props, guid);
    }

}