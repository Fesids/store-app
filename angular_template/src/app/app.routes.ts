import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login.component';
import { SignupPageComponent } from './pages/signUp/signup.component';

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
    }

];
