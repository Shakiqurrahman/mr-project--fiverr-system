import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useSaveAffiliate from "../hooks/useSaveAffiliate";
import { useFetchUserDataQuery } from "../Redux/api/apiSlice";
import { logout, setUser } from "../Redux/features/userSlice";
import { disconnectSocket } from "./socketService";

const AuthWrapper = ({ children }) => {
  useSaveAffiliate();
  const dispatch = useDispatch();
  const { data: user, error } = useFetchUserDataQuery(null, {
    skip: !Cookies.get("authToken"),
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (error) {
      disconnectSocket();
    } else if (!Cookies.get("authToken")) {
      dispatch(logout());
      disconnectSocket();
    } else if (user) {
      const token = Cookies.get("authToken");
      dispatch(setUser({ user: user.data, token }));
    }
  }, [user, error, dispatch]);

  // const token = Cookies.get("authToken");
  // const socket = connectSocket(`${configApi.socket}`, token);
  // all avaiable user's
  // useEffect(() => {
  //   const fetchOnlineUsers = () => {
  //     socket?.emit("view-online-users");
  //     socket?.on("online-users", (onlineUsers) => {
  //       dispatch(setOnlineUsers(onlineUsers));
  //     });
  //   };

  //   // Fetch immediately on mount
  //   fetchOnlineUsers();

  //   const intervalId = setInterval(() => {
  //     fetchOnlineUsers();
  //   }, 1000 * 60);

  //   // Clean up the interval on unmount to prevent memory leaks
  //   return () => {
  //     clearInterval(intervalId);
  //     socket?.off("online-users");
  //   };
  // }, [socket, dispatch]);

  return children;
};

export default AuthWrapper;
