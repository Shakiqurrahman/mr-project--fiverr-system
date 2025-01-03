import axios from "axios";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Layout from "./AllRoutes/Layout";
import { router } from "./AllRoutes/Routes";
import store from "./Redux/store";
import AuthWrapper from "./libs/AuthWrapper";
import NotificationWrapper from "./libs/NotificationWrapper";
import { configApi } from "./libs/configApi";
function App() {
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

  return (
    <Provider store={store}>
      <NotificationWrapper>
        <AuthWrapper>
          <RouterProvider router={router}>
            <Layout />
          </RouterProvider>
        </AuthWrapper>
      </NotificationWrapper>
    </Provider>
  );
}

export default App;
