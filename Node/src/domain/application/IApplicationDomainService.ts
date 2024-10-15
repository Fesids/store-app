import { Property } from "../property/Property";
import { Application } from "./Application";

export interface IApplicationRegistration {
    applyUserToProperty(user: any, property: Property): Application;
}