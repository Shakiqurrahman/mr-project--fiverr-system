import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
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

  useEffect(() => {
    socket.on("get:notification", (notification) => {
      console.log("notification", notification);
    });
  }, [socket]);

  return (
    <Provider store={store}>
      <AuthWrapper>
        <RouterProvider router={router}>
          <Layout />
        </RouterProvider>
      </AuthWrapper>
    </Provider>
  );
}

export default App;
