import { createBrowserRouter } from "react-router-dom";
import Layout from "../AllRoutes/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
]);
