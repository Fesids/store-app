import e from "express";
import { Entity } from "../../core/Entity";
import { IAggregateRoot } from "../../core/IAggregateRoot";


export interface IUserProps {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export class User extends Entity<IUserProps> implements IAggregateRoot {
    private _email: string;
    private _firstName: string;
    private _lastName: string;
    private _password: string

    constructor({email, firstName, lastName, password}: IUserProps, guid?: string){
        super(guid);
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
        this._password = password;
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

    public static create(props: IUserProps, guid?: string) {
    return new User(props, guid);
      }



}