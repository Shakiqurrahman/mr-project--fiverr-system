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
  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
  useEffect(() => {
    const hasVisited = JSON.parse(localStorage.getItem("hasVisited"));
    if (
      !hasVisited ||
      (Date.now() - hasVisited.startTimeStamp < ONE_DAY_IN_MS &&
        Date.now() - hasVisited.timestamp > ONE_DAY_IN_MS) ||
      (!hasVisited.startTimeStamp &&
        Date.now() - hasVisited.timestamp > ONE_DAY_IN_MS)
    ) {
      axios
        .post(`${configApi.api}analytics/user-visitor`, {
          userType: "NEW_CLIENT",
        })
        .then(() => {
          localStorage.setItem(
            "hasVisited",
            JSON.stringify({
              ...hasVisited,
              timestamp: Date.now(),
              userType: "NEW_CLIENT",
            }),
          );
        })
        .catch((error) => {});
    } else if (
      hasVisited.startTimeStamp &&
      Date.now() - hasVisited.startTimeStamp > ONE_DAY_IN_MS &&
      Date.now() - hasVisited.timestamp > ONE_DAY_IN_MS
    ) {
      const response = axios
        .post(`${configApi.api}analytics/user-visitor`, {
          userType: "REPEATED_CLIENT",
        })
        .then(() => {
          localStorage.setItem(
            "hasVisited",
            JSON.stringify({
              ...hasVisited,
              timestamp: Date.now(),
              userType: "REPEATED_CLIENT",
            }),
          );
        })
        .catch((error) => {});
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
