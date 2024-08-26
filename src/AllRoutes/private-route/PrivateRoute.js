import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../Redux/features/userSlice";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");

  useEffect(() => {
    if (!token) {
        dispatch(logout());
      // Redirect to another page if token is not present
      navigate("/join", { state: { from: location }, replace: true }); // Replace '/login' with your desired path
    }
  }, [token, navigate]);

  return children;
};

export default PrivateRoute;
