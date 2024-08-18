// Logout function with persistor
import { useDispatch } from 'react-redux';
import { persistor } from '../Redux/store';
import { logout } from '../Redux/features/userSlice';
import { removeCookie } from '../libs/removeCookie';

const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');
    
    // Dispatch logout action to clear Redux state
    dispatch(logout());
    removeCookie('authToken');

    // Clear persisted state
    persistor.purge();
  };

  return handleLogout;
};

export default useLogout;
