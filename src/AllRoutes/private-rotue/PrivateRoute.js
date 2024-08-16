
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = Cookies.get('authToken');
   

    useEffect(() => {
        if (!token) {
            // Redirect to another page if token is not present
            navigate('/join'); // Replace '/login' with your desired path
        }
    }, [token, navigate]);

    return children;
};

export default ProtectedRoute;
