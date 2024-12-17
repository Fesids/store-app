import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login.component';
import { SignupPageComponent } from './pages/signUp/signup.component';
import { TaskDetailPageComponent } from './pages/task/detail/taskDetailPage.component';

export const routes: Routes = [

    {
        path: "",
        component: HomePageComponent
    },

    {
        path: "login",
        component: LoginPageComponent
    },

    {
        path: "signup",
        component: SignupPageComponent
    },


    // *** Task routes ***//

    {
        path: "task/:id_task",
        component: TaskDetailPageComponent

    }

];
