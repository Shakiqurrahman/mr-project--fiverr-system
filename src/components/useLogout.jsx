// Logout function with persistor
import { useDispatch } from "react-redux";
import { logout } from "../Redux/features/userSlice";
import { removeCookie } from "../libs/removeCookie";

const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("profileData");

    // Dispatch logout action to clear Redux state
    dispatch(logout());
    removeCookie("authToken");

    // Clear persisted state
    // Optionally, redirect to login page or home page
    window.location.href = "/join";
  };

  return handleLogout;
};

export default useLogout;
