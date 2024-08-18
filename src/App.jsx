import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "./AllRoutes/Layout";
import { router } from "./AllRoutes/Routes";
import store, { persistor } from "./Redux/store";
function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <RouterProvider router={router}>
                    <Layout />
                </RouterProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
