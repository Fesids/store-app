

export const TYPES = {
    Db: Symbol('Db'),

    ApplicationDataMapper: Symbol('ApplicationDataMapper'),
    ApplicationApplication: Symbol('ApplicationApplication'),
    
    // ** user auth     
    UserRepository: Symbol('UserRepository'),
    
    UserDataMapper: Symbol('UserDataMapper'),

    UserApplication: Symbol('UserApplication'),

    AuthApplication: Symbol('AuthApplication'),

    // ** Task

    TaskDataMapper: Symbol('TaskDataMapper'),

    TaskApplication: Symbol('TaskApplication'),

    TaskRepository: Symbol('TaskRepository'),

    // ** ATTACH 

    AttachDataMapper: Symbol('AttachDataMapper'),

    AttachApplication: Symbol('AttachApplication'),

    AttachRepository: Symbol('AttachRepository')
    
}