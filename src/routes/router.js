import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {path: "", element: <Home/>},
            {path: "dashboard", element: <Dashboard/>},
            {path: "transactions", element: <Transactions/>},
            {path: "*", element: <NotFound/>}

        ]
    }
]
)

export default router;
