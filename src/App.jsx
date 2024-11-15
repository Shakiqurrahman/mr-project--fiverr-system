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
    const url = `${configApi.api}analytics/visitors/`;
    axios.get(url);
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
