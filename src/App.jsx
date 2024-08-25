import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Layout from "./AllRoutes/Layout";
import { router } from "./AllRoutes/Routes";
import store from "./Redux/store";
import AuthWrapper from "./libs/AuthWrapper";
function App() {
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
