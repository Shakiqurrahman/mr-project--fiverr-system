import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/features/userSlice";
import Cookies from 'js-cookie'

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = Cookies.get('authToken');
    if (user?.role !== "ADMIN" || !token) {
      dispatch(logout());
      navigate("/not-found");
    }
  }, [user, navigate, dispatch]);

  return children;
};

export default AdminRoute;
