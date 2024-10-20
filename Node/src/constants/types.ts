import { UserRepository } from "../infra/repositories/UserRepository";

export const TYPES = {
    Db: Symbol('Db'),

    ApplicationApplication: Symbol('ApplicationApplication'),
    UserRepository: Symbol('UserRepository'),
    
    ApplicationDataMapper: Symbol('ApplicationDataMapper'),
    UserDataMapper: Symbol('UserDataMapper'),

    UserApplication: Symbol('UserApplication'),

    AuthApplication: Symbol('AuthApplication')
    
}