import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { configApi } from "../libs/configApi";
import { logout, setUser } from "../Redux/features/userSlice";
import { removeCookie } from "./removeCookie";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  //   const { token } = useSelector((state) => state.user);

  const handleLogout = () => {
    console.log("coking logout");
    // Remove token from local storage
    localStorage.removeItem("profileData");

    // Dispatch logout action to clear Redux state
    dispatch(logout());
    removeCookie("authToken");

    // Clear persisted state
    // persistor.purge();
    // Optionally, redirect to login page or home page
    // window.location.href = '/join';
  };

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
        console.log(token);
      // Fetch user data if token exists
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${configApi.api}get-singel-user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.success) {
            const user = response.data.data;
            dispatch(setUser({ user, token }));
          } else {
            handleLogout(); // Logout if fetching user data fails
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          handleLogout();
        }
      };
      fetchUserData();
    } else {
      // No token found, log out the user
      handleLogout()
    }
  }, [dispatch]);

  return children;
};

export default AuthWrapper;
