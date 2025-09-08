import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import NotFound from "../pages/NotFound";
import Reports from "../pages/Reports";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {index: true, element: <Home/>},
            {path: "dashboard", element: <Dashboard/>},
            {path: "transactions", element: <Transactions/>},
            {path: "*", element: <NotFound/>},
            {path: "reports", element: <Reports/>}
        ]
    },
]
)

export default router;
