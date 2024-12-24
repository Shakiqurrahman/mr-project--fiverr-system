import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Layout from "./AllRoutes/Layout";
import { router } from "./AllRoutes/Routes";
import store from "./Redux/store";
import NotificationPopper from "./components/Notifications/NotificationPopper";
import AuthWrapper from "./libs/AuthWrapper";
import { configApi } from "./libs/configApi";
import { connectSocket } from "./libs/socketService";
function App() {
  const token = Cookies.get("authToken");
  const socket = connectSocket(`${configApi.socket}`, token);

  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const hasVisited = JSON.parse(localStorage.getItem("hasVisited"));

    if (!hasVisited || Date.now() - hasVisited.timestamp > 86400000) {
      axios
        .get(`${configApi.api}analytics/visitors/`)
        .then(() => {
          localStorage.setItem(
            "hasVisited",
            JSON.stringify({ timestamp: Date.now() }),
          );
        })
        .catch(() => {});
    }
  }, []);

  // Listen to new notifications from the server
  useEffect(() => {
    socket?.on("get:notification", (notification) => {
      console.log("notification", notification);
      setNotification(notification);
      setShowNotification(true);
    });
  }, [socket]);

  return (
    <Provider store={store}>
      <AuthWrapper>
        <RouterProvider router={router}>
          <Layout />
        </RouterProvider>
      </AuthWrapper>
      {showNotification && (
        <NotificationPopper
          onClose={() => setShowNotification(false)}
          notification={notification}
        />
      )}
    </Provider>
  );
}

export default App;
