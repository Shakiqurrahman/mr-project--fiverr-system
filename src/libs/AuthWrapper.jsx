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
      dispatch(setUser({ user: user.data, token: Cookies.get("authToken") }));
    }
    if (user && !Cookies.get("authToken")) {
      connectSocket("http://localhost:3000", {
        auth: {
          token: Cookies.get("authToken"),
        },
      });
  
      return () => {
        disconnectSocket();
      };
    }
  }, [user, error, dispatch]);

  return children;
};

export default AuthWrapper;