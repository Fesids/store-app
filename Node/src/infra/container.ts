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
import { Attach } from "../domain/attach/Attach";
import { AttachDataMapper } from "./dataMapper/AttachDataMapper";
import { IAttachRepository } from "../domain/attach/IAttachRepository";
import { AttachRepository } from "./repositories/AttachRepository";
import { Role } from "../domain/role/Role";
import { RoleDataMapper } from "./dataMapper/RoleDataMapper";
import { IRoleRepository } from "../domain/role/IRoleRepository";
import { RoleRepository } from "./repositories/RoleRepository";
import { Department } from "../domain/department/Department";
import { DepartmentDataMapper } from "./dataMapper/DepartmentDataMapper";
import { IDepartmentRepository } from "../domain/department/IDepartmentRepository";
import { DepartmentRepository } from "./repositories/DepartmentRepository";
import { Company } from "../domain/company/Company";
import { CompanyDataMapper } from "./dataMapper/CompanyDataMapper";
import { ICompanyRepository } from "../domain/company/ICompanyRepository";
import { CompanyRepository } from "./repositories/CompanyRepository";
import { Membership } from "../domain/membership/Membership";
import { MembershipDataMapper } from "./dataMapper/MembershipDataMapper";
import bodyParser from "body-parser";
import { IMembershipRepository } from "../domain/membership/IMembershipRepository";
import { MembershipRepository } from "./repositories/MembershipRepository";

export const infraestructureContainerModule = new AsyncContainerModule(async(bind: interfaces.Bind) =>{
    const db: Db = await createMongodbConnection(config.MONGODB_URI, {});
    bind<Db>(TYPES.Db).toConstantValue(db);

    bind<IDataMapper<Application>>(TYPES.ApplicationDataMapper).to(ApplicationDataMapper);
    
    bind<IDataMapper<User>>(TYPES.UserDataMapper).to(UserDataMapper);
    bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);

    // ** Task

    bind<IDataMapper<Task>>(TYPES.TaskDataMapper).to(TaskDataMapper);
    bind<ITaskRepository>(TYPES.TaskRepository).to(TaskRepository);

    // ** Attach

    bind<IDataMapper<Attach>>(TYPES.AttachDataMapper).to(AttachDataMapper);
    bind<IAttachRepository>(TYPES.AttachRepository).to(AttachRepository);

    // ** Role

    bind<IDataMapper<Role>>(TYPES.RoleDataMapper).to(RoleDataMapper);
    bind<IRoleRepository>(TYPES.RoleRepository).to(RoleRepository);

    // ** department

    bind<IDataMapper<Department>>(TYPES.DepartmentDataMapper).to(DepartmentDataMapper);
    bind<IDepartmentRepository>(TYPES.DepartmentRepository).to(DepartmentRepository);

    // ** company

    bind<IDataMapper<Company>>(TYPES.CompanyDataMapper).to(CompanyDataMapper);
    bind<ICompanyRepository>(TYPES.CompanyRepository).to(CompanyRepository);

    // ** membership

    bind<IDataMapper<Membership>>(TYPES.MembershipDataMapper).to(MembershipDataMapper);
    bind<IMembershipRepository>(TYPES.MembershipRepository).to(MembershipRepository);

} )