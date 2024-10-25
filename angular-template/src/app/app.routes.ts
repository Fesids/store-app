import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login.component';

export const routes: Routes = [

    {
        path: "",
        component: HomePageComponent
    },

    {
        path: "login",
        component: LoginPageComponent
    }
];
