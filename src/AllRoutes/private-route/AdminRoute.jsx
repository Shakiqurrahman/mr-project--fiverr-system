import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user?.role !== "ADMIN") {
      navigate("/not-found");
    }
  }, [user, navigate]);

  return children;
};

export default AdminRoute;
