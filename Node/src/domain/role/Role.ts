import { Entity } from "../../core/Entity";
import { IAggregateRoot } from "../../core/IAggregateRoot";

export interface IRoleProps{
    name: string,
    description: string,
    active: boolean
}

export class Role extends Entity<IRoleProps> implements IAggregateRoot{
    private _name: string;
    private _description: string;
    private _active: boolean;

    constructor({name, description, active}: IRoleProps, guid?:string){
        super(guid);
        this._name = name;
        this._description = description;
        this._active = active;
    }

    get name(){
        return this._name
    }

    get description(){
        return this._description
    }

    get active(){
        return this._active
    }

    public static create(props: IRoleProps, guid?: string) {
        return new Role(props, guid);
    }
    
    
}