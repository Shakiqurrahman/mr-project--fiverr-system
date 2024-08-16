import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import Layout from "./AllRoutes/Layout";
import { router } from "./AllRoutes/Routes";
import store from "./Redux/store";
function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router}>
                <Layout />
            </RouterProvider>
        </Provider>
    );
}

export default App;
