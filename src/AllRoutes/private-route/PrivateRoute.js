import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useLogout from '../../components/useLogout';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation()
    const token = Cookies.get('authToken');
    const handleLogout = useLogout();

    useEffect(() => {
        if (!token) {
            // Redirect to another page if token is not present
            navigate('/join', { state: { from: location }, replace: true }); // Replace '/login' with your desired path
        }
    }, [token, navigate]);

    return children;
};

export default PrivateRoute;
