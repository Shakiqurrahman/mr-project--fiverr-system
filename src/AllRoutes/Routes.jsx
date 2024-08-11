import { createBrowserRouter } from "react-router-dom";
import Layout from "../AllRoutes/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import About from "../pages/About";
import Designs from "../pages/Designs";
import Companies from "../pages/Companies";
import PriceList from "../pages/PriceList";
import Project from "../pages/Project";
import Contact from "../pages/Contact";
import Affiliate from "../pages/Affiliate";
import TermsAndConditions from "../pages/TermsAndConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";

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
                path: "/about",
                element: <About />,
            },
            {
                path: "/designs",
                element: <Designs />,
            },
            {
                path: "/companies",
                element: <Companies />,
            },
            {
                path: "/pricelist",
                element: <PriceList />,
            },
            {
                path: "/project",
                element: <Project />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/affiliate",
                element: <Affiliate />,
            },
            {
                path: "/termsandconditions",
                element: <TermsAndConditions />,
            },
            {
                path: "/privacypolicy",
                element: <PrivacyPolicy />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
]);
