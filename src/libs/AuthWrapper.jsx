import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useFetchUserDataQuery } from "../Redux/api/apiSlice";
import { logout, setUser } from "../Redux/features/userSlice";

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
  }, [user, error, dispatch]);

  return children;
};

export default AuthWrapper;
