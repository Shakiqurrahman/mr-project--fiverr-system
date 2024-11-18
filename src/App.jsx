import axios from "axios";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Layout from "./AllRoutes/Layout";
import { router } from "./AllRoutes/Routes";
import store from "./Redux/store";
import AuthWrapper from "./libs/AuthWrapper";
import { configApi } from "./libs/configApi";
function App() {
  useEffect(() => {
    const countVisitor = async () => {
      const hasCounted = sessionStorage.getItem("hasVisited");

      if (!hasCounted) {
        try {
          const url = `${configApi.api}analytics/visitors/`;
          await axios.get(url);
          sessionStorage.setItem("hasVisited", "true");
        } catch (error) {
          return;
        }
      }
    };

    countVisitor();
  }, []);

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
