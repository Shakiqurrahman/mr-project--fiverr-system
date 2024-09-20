import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchUserDataQuery } from "../Redux/api/apiSlice";
import { logout, setUser } from "../Redux/features/userSlice";
import { connectSocket, disconnectSocket } from "./socketService";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { data: user, error } = useFetchUserDataQuery(null, {
    skip: !Cookies.get("authToken"),
  });

  useEffect(() => {
    if (error) {
      dispatch(logout(error));
    } else if (!Cookies.get("authToken")) {
      dispatch(logout(error));
    } else if (user) {
      const token = Cookies.get("authToken");
      dispatch(setUser({ user: user.data, token }));
      // Connect to socket when the user is authenticated
      connectSocket("http://localhost:3000", token);
      
      // Cleanup function to disconnect socket
      return () => {
        disconnectSocket();
      };
    }
  }, [user, error, dispatch]);

  return children;
};

export default AuthWrapper;
