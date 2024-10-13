import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { Task } from "../pages/task/Task";


export const routes = createBrowserRouter(
    [
        {
            path: "",
            element: <Home/>
        },
        {
            path: "/:id",
            element: <Task/>
        }
    ]
)


export const RoutesList = () => {

    return (
        <RouterProvider router={routes}/>
    )
}