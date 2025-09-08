import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import NotFound from "../pages/NotFound";
import Reports from "../pages/Reports";
import Expenses from "../pages/Expenses";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {index: true, element: <Home/>},
            {path: "dashboard", element: <Dashboard/>},
            {path: "transactions", element: <Transactions/>},
            {path: "reports", element: <Reports/>},
            {path: "expenses", element: <Expenses/>},
            {path: "*", element: <NotFound/>},
        ]
    },
]
)

export default router;
