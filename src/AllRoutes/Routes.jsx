import { createBrowserRouter } from "react-router-dom";
import Layout from "../AllRoutes/Layout";
import About from "../pages/About";
import Affiliate from "../pages/Affiliate";
import Companies from "../pages/Companies";
import Contact from "../pages/Contact";
import Designs from "../pages/Designs";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Join from "../pages/Join";
import PriceList from "../pages/PriceList";
import PrivacyAndPolicy from "../pages/PrivacyAndPolicy";
import Project from "../pages/Project";
import TermsAndConditions from "../pages/TermsAndConditions";
import SetupProfile from "../pages/SetupProfile";
import Profile from "../pages/Profile";
import MyAccount from "../pages/MyAccount";
import ForgetPassword from "../pages/ForgetPassword";
import Verify from "../pages/Verify";
import ChangePassword from "../pages/ChangePassword";
import SocialMediasForm from "../components/SocialMediasForm";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SetupProfile />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/join",
        element: <Join />,
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
        element: <PrivacyAndPolicy />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/verify",
        element: <Verify />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/setup-profile",
        element: <SetupProfile />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/my-account",
        element: <MyAccount />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
