import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Task } from "../pages/task/Task";
import { LoginPage } from "../pages/login/Login";
import { SignUpForm } from "../components/signUpForm/form";
import { SignupPage } from "../pages/signup/SignUp";


export const routes = createBrowserRouter(
    [
        {
            path: "",
            element: <Home/>
        },
        {
            path: "/:id",
            element: <Task/>
        },
        {
            path: "/login",
            element: <LoginPage/>,

        },
        {
            path: "/signup",
            element: <SignupPage/>
        }
    ]
)


export const RoutesList = () => {

    return (
        <RouterProvider router={routes}/>
    )
}