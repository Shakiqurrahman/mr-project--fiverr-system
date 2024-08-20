import { createBrowserRouter } from 'react-router-dom';
import Layout from '../AllRoutes/Layout';
import CategoryPage from '../components/categories/CategoryPage';
import About from '../pages/About';
import Affiliate from '../pages/Affiliate';
import ChangePassword from '../pages/ChangePassword';
import Contact from '../pages/Contact';
import CreateProject from '../pages/CreateProject';
import Designs from '../pages/Designs';
import ErrorPage from '../pages/ErrorPage';
import Feedback from '../pages/Feedback';
import ForgetPassword from '../pages/ForgetPassword';
import Home from '../pages/Home';
import Industries from '../pages/Industries';
import Join from '../pages/Join';
import OfferProject from '../pages/OfferProject';
import PriceList from '../pages/PriceList';
import PrivacyAndPolicy from '../pages/PrivacyAndPolicy';
import Profile from '../pages/Profile';
import Project from '../pages/Project';
import SetupProfile from '../pages/SetupProfile';
import SingleProductPage from '../pages/SingleProductPage';
import TermsAndConditions from '../pages/TermsAndConditions';
import Tips from '../pages/Tips';
import UpdatePassword from '../pages/UpdatePassword';
import Verify from '../pages/Verify';
import ProtectedRoute from './private-rotue/PrivateRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />,
            },
            {
                path: '/join',
                element: <Join />,
            },
            {
                path: '/designs',
                element: <Designs />,
            },
            {
                path: '/industries',
                element: <Industries />,
            },
            {
                path: '/category',
                element: <CategoryPage />,
            },
            {
                path: '/category/single-product',
                element: <SingleProductPage />,
            },
            {
                path: '/pricelist',
                element: <PriceList />,
            },
            {
                path: '/project',
                element: <Project />,
            },
            {
                path: '/start-offer-project',
                element: <OfferProject />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            // Mahdi's created routes start
            {
                path: '/tips',
                element: <Tips />,
            },
            {
                path: '/feedback',
                element: <Feedback />,
            },
            // Mahdi's created routes end
            {
                path: '/affiliate',
                element: <Affiliate />,
            },
            {
                path: '/termsandconditions',
                element: <TermsAndConditions />,
            },
            {
                path: '/privacypolicy',
                element: <PrivacyAndPolicy />,
            },
            {
                path: '/forget-password',
                element: <ForgetPassword />,
            },
            {
                path: '/verify',
                element: <Verify />,
            },
            {
                path: '/update-password',
                element: <UpdatePassword />,
            },
            {
                path: '/setup-profile',
                element: (
                    <ProtectedRoute>
                        <SetupProfile />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/change-password',
                element: <ChangePassword />,
            },
            {
                path: '/create-project',
                element: <CreateProject />,
            },
            {
                path: '*',
                element: <ErrorPage />,
            },
        ],
    },
]);
