import { createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Users from "./views/Users";
import MainContainer from "./views/MainContainer";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import NotFound from "./views/NotFound";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Users />
            },

            {
                path: '/users',
                element: <Users />
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },

        ]
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/main',
                element: <MainContainer />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },


])

export default router;
