import { RouterProvider } from "react-router-dom";
import { router } from "./AllRoutes/Routes";
import Layout from "./AllRoutes/Layout";

function App() {
    return (
        <RouterProvider router={router}>
            <Layout />
        </RouterProvider>
    );
}

export default App;
