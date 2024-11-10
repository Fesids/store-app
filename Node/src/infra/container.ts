import { AsyncContainerModule, interfaces } from "inversify";
import { Db } from "mongodb";
import { createMongodbConnection } from "./db/mongodb";
import config from '../config/main'
import { TYPES } from "../constants/types";
import { IDataMapper } from "../core/IDataMapper";
import { Application } from "../domain/application/Application";
import { UserDataMapper } from "./dataMapper/UserDataMapper";
import { ApplicationDataMapper } from "./dataMapper/ApplicationDataMapper";
import { IApplicationRepository } from "../domain/application/IApplicationRepository";
import { IUserRepository } from "../domain/user/IUserRepository";
import { UserRepository } from "./repositories/UserRepository";
import { User } from "../domain/user/User";
import { ITaskProps, Task } from "../domain/task/Task";
import { TaskDataMapper } from "./dataMapper/TaskDataMapper";
import { ITaskRepository } from "../domain/task/ITaskRepository";
import { TaskRepository } from "./repositories/TaskRepository";

export const infraestructureContainerModule = new AsyncContainerModule(async(bind: interfaces.Bind) =>{
    const db: Db = await createMongodbConnection(config.MONGODB_URI, {});
    bind<Db>(TYPES.Db).toConstantValue(db);

    bind<IDataMapper<Application>>(TYPES.ApplicationDataMapper).to(ApplicationDataMapper);
    
    bind<IDataMapper<User>>(TYPES.UserDataMapper).to(UserDataMapper);
    bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

    // ** Task

    bind<IDataMapper<Task>>(TYPES.TaskDataMapper).to(TaskDataMapper);
    bind<ITaskRepository>(TYPES.TaskRepository).to(TaskRepository);

} )