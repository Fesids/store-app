import e from "express";
import { Entity } from "../../core/Entity";
import { IAggregateRoot } from "../../core/IAggregateRoot";


export interface IUserProps {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    roles: Array<string>;
    createdAt: Date;
    updatedAt: Date;
}

export class User extends Entity<IUserProps> implements IAggregateRoot {
    private _email: string;
    private _firstName: string;
    private _lastName: string;
    private _password: string;
    private _createdAt: Date;
    private _updatedAt: Date;
    private _roles: Array<string>;

    constructor({email, firstName, lastName, password, createdAt, updatedAt, roles}: IUserProps, guid?: string){
        super(guid);
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
        this._password = password;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
        this._roles = roles;
    }

    get email() {
        return this._email;
      }
    
    get firstname() {
    return this._firstName;
    }

    get lastname() {
    return this._lastName;
    }

    get password() {
        return this._password;
    }

    get createdAt() {
        return this._createdAt;
    }

    get updatedAt() {
        return this._updatedAt;
    }

    get roles() {
        return this._roles;
    }

    public static create(props: IUserProps, guid?: string) {
    return new User(props, guid);
      }



}