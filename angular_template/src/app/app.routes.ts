import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login.component';
import { SignupPageComponent } from './pages/signUp/signup.component';
import { TaskDetailPageComponent } from './pages/task/detail/taskDetailPage.component';
import { TaskAttachmentsPageComponent } from './pages/task/attachments/attachments-page.component';
import { LoadingPagecomponent } from './pages/loading/loading.component';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';
import { TasksByDeptComponent } from './pages/task/tasksByDepartment/taskByDept-page.component';

export const routes: Routes = [

    {
        path: "",
        component: HomePageComponent,
        canActivate: [authGuard]
    },

    {
        path: "login",
        component: LoginPageComponent,
        canActivate: [loginGuard]
    },

    {
        path: "signup",
        component: SignupPageComponent,
        canActivate: [loginGuard]

    },


    // *** Task routes ***//

    {
        path: "tarefa/:id_task",
        component: TaskDetailPageComponent,
        canActivate: [authGuard]

    },

    // ** attachments
    {
        path: "tarefa/:id_task/anexos",
        component: TaskAttachmentsPageComponent,
        canActivate: [authGuard]
    },

    {
        path: "loading",
        component: LoadingPagecomponent
    },

    {
        path: "tarefas",
        component: TasksByDeptComponent
    }

];
