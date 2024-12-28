import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/features/userSlice";

const AllAdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const isAuthorized = ["SUB_ADMIN","ADMIN", "SUPER_ADMIN"].includes(user?.role);  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!isAuthorized || !token) {
      dispatch(logout());
      navigate("/not-found");
    }
  }, [isAuthorized, navigate, dispatch]);

  return children;
};

export default AllAdminRoute;
