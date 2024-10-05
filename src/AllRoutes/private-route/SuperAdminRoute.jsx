import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/features/userSlice";

const SuperAdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const isSuperAdmin = user?.role === "SUPER_ADMIN";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!isSuperAdmin || !token) {
      dispatch(logout());
      navigate("/not-found");
    }
  }, [isSuperAdmin, navigate, dispatch]);

  return children;
};

export default SuperAdminRoute;
