import {ContainerModule, interfaces} from 'inversify';
import { ApplicationApplication } from './application/ApplicationApplicationService';
import { TYPES } from '../constants/types';
import { UserApplication } from './user/UserApplication';
import { AuthApplication } from './auth/AuthApplication';
import { TaskApplication } from './task/TaskApplication';

export const applicationContainerModule = new ContainerModule(
    (
    bind: interfaces.Bind
    ) => {
        bind<ApplicationApplication>(TYPES.ApplicationApplication).to(ApplicationApplication);
        bind<UserApplication>(TYPES.UserApplication).to(UserApplication);
        bind<AuthApplication>(TYPES.AuthApplication).to(AuthApplication);
        bind<TaskApplication>(TYPES.TaskApplication).to(TaskApplication);
    }
) 