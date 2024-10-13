import {ContainerModule, interfaces} from 'inversify';
import { ApplicationApplication } from './application/ApplicationApplicationService';
import { TYPES } from '../constants/types';

export const applicationContainerModule = new ContainerModule(
    (
    bind: interfaces.Bind
    ) => {
        bind<ApplicationApplication>(TYPES.ApplicationApplication).to(ApplicationApplication);
    }
) 