import Cookies from "js-cookie";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const isAuthorized = ["ADMIN", "SUPER_ADMIN"].includes(user?.role);
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (!isAuthorized || !token) {
      navigate("/not-found");
    }
  }, [isAuthorized, navigate]);

  return children;
};

export default AdminRoute;
