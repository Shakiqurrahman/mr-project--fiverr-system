import { createBrowserRouter } from "react-router-dom";
import Layout from "../AllRoutes/Layout";
import SocialMediasForm from "../components/SocialMediasForm";
import About from "../pages/About";
import Affiliate from "../pages/Affiliate";
import AllCategory from "../pages/AllCategory";
import AllCompletedProjects from "../pages/AllCompletedProjects";
import AllDesign from "../pages/AllDesign";
import Cart from "../pages/Cart";
import ChangePassword from "../pages/ChangePassword";
import Contact from "../pages/Contact";
import CreateCategory from "../pages/CreateCategory";
import CreateOfferProject from "../pages/CreateOfferProject";
import Designs from "../pages/Designs";
import EditCategory from "../pages/EditCategory";
import EditDesign from "../pages/EditDesign";
import ErrorPage from "../pages/ErrorPage";
import Feedback from "../pages/Feedback";
import ForgetPassword from "../pages/ForgetPassword";
import Home from "../pages/Home";
import InboxPage from "../pages/InboxPage";
import Industries from "../pages/Industries";
import Join from "../pages/Join";
import OfferProject from "../pages/OfferProject";
import PriceList from "../pages/PriceList";
import PrivacyAndPolicy from "../pages/PrivacyAndPolicy";
import ProfileLayout from "../pages/ProfileLayout";
import Project from "../pages/Project";
import SetupProfile from "../pages/SetupProfile";
import SingleProductPage from "../pages/SingleProductPage";
import TermsAndConditions from "../pages/TermsAndConditions";
import Tips from "../pages/Tips";
import UpdatePassword from "../pages/UpdatePassword";
import UploadDesign from "../pages/UploadDesign";
import Verify from "../pages/Verify";
import ChatLayout from "./ChatLayout";
import AdminRoute from "./private-route/AdminRoute";
import PrivateRoute from "./private-route/PrivateRoute";
import UnAuthenticatedRoute from "./private-route/UnAuthenticatedRoute";

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
        path: "/join",
        element: (
          <UnAuthenticatedRoute>
            <Join />
          </UnAuthenticatedRoute>
        ),
      },
      {
        path: "/designs",
        element: <Designs />,
      },
      {
        path: "/industries",
        element: <Industries />,
      },
      {
        path: "/designs/:catSlug/:slug",
        element: <AllDesign />,
      },
      {
        path: "/categories/:slug",
        element: <AllCategory />,
      },
      {
        path: "/design/:slug",
        element: <SingleProductPage />,
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
        path: "/all-completed-projects",
        element: <AllCompletedProjects />,
      },
      {
        path: "/start-offer-project",
        element: <OfferProject />,
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
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "/setup-profile",
        element: (
          <PrivateRoute>
            <SetupProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/social-media",
        element: (
          // <PrivateRoute>
          <SocialMediasForm />
          // </PrivateRoute>
        ),
      },
      {
        path: "/:userName",
        element: (
          // <PrivateRoute>
          <ProfileLayout />
          // </PrivateRoute>
        ),
      },
      {
        path: "/billing-information",
        element: <SetupProfile from_profile={true} />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/offer-project",
        element: (
          <AdminRoute>
            <CreateOfferProject />
          </AdminRoute>
        ),
      },
      // Mahdi's created routes start
      {
        path: "/tips",
        element: <Tips />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      // Mahdi's created routes end
      {
        path: "/create-category",
        element: (
          <AdminRoute>
            <CreateCategory />
          </AdminRoute>
        ),
      },
      {
        path: "/edit-category",
        element: (
          <AdminRoute>
            <EditCategory />
          </AdminRoute>
        ),
      },
      {
        path: "/upload-design",
        element: (
          <AdminRoute>
            <UploadDesign />
          </AdminRoute>
        ),
      },
      {
        path: "/edit-design",
        element: (
          <AdminRoute>
            <EditDesign />
          </AdminRoute>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/inbox",
    element: <ChatLayout />,
    children: [
      {
        path: "/inbox",
        element: <InboxPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
