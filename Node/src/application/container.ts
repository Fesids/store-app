import {ContainerModule, interfaces} from 'inversify';
import { ApplicationApplication } from './application/ApplicationApplicationService';
import { TYPES } from '../constants/types';
import { UserApplication } from './user/UserApplication';
import { AuthApplication } from './auth/AuthApplication';
import { TaskApplication } from './task/TaskApplication';
import { AttachApplication } from './attach/AttachApplication';
import { RoleApplication } from './role/RoleApplication';
import { DepartmentApplication } from './department/DepartmentApplication';
import { CompanyApplication } from './company/CompanyApplication';
import { MembershipApplication } from './membership/MembershipApplication';

export const applicationContainerModule = new ContainerModule(
    (
    bind: interfaces.Bind
    ) => {
        bind<ApplicationApplication>(TYPES.ApplicationApplication).to(ApplicationApplication);
        bind<UserApplication>(TYPES.UserApplication).to(UserApplication);
        bind<AuthApplication>(TYPES.AuthApplication).to(AuthApplication);
        bind<TaskApplication>(TYPES.TaskApplication).to(TaskApplication);
        bind<AttachApplication>(TYPES.AttachApplication).to(AttachApplication);
        bind<RoleApplication>(TYPES.RoleApplication).to(RoleApplication);
        bind<DepartmentApplication>(TYPES.DepartmentApplication).to(DepartmentApplication);
        bind<CompanyApplication>(TYPES.CompanyApplication).to(CompanyApplication);
        bind<MembershipApplication>(TYPES.MembershipApplication).to(MembershipApplication)
    }
) 