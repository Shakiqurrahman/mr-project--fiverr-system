import { useDispatch } from "react-redux";
import { logout } from "../Redux/features/userSlice";
import { removeCookie } from "../libs/removeCookie";
import { persistor } from "../Redux/store";

const useLogout = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from local storage and cookies
    localStorage.removeItem("profileData");
    removeCookie("authToken");

    // Dispatch logout action to clear Redux state
    dispatch(logout());

    // Clear persisted state
    persistor.purge();

    // Redirect to login page
    // navigate("/join");
  };

  return handleLogout;
};

export default useLogout;
