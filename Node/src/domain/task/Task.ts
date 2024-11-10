import { Entity } from "../../core/Entity";
import { IAggregateRoot } from "../../core/IAggregateRoot";

export interface ITaskProps {
    title: string,
    description: string,
    completed: boolean,
    employees: Array<string>,
    createdBy: Array<string>,
    departments: Array<string>, 
    createdAt: Date,
    updatedAt: Date
}

export class Task extends Entity<ITaskProps> implements IAggregateRoot{

    private _title: string;
    private _description: string;
    private _completed: boolean;
    private _employees: Array<string>;
    private _createdBy: Array<string>;
    private _departments: Array<string>;
    private _createdAt: Date;
    private _updatedAt: Date;


    constructor({title, description, completed, employees, createdBy, departments, createdAt, updatedAt}: ITaskProps, guid?:string){
        super(guid);
        this._title = title;
        this._description = description;
        this._completed = completed;
        this._employees = employees;
        this._createdBy = createdBy;
        this._departments = departments;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    get title(){
        return this._title;
    }

    get description(){
        return this._description;
    }

    get completed(){
        return this._completed;
    }

    get employees(){
        return this._employees;
    }

    get createdBy(){
        return this._createdBy;
    }

    get departments(){
        return this._departments;
    }

    get createdAt(){
        return this._createdAt;
    }

    get updatedAt(){
        return this._updatedAt;
    }

    public static create(props: ITaskProps, guid?: string ){
        return new Task(props, guid);
    }

}