import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import TransactionsProvider from "../context/TransactionsProvider.jsx";

export default function Layout(){
    return (
        <>
            <TransactionsProvider>
            <div className="flex">
                <Navbar/>
                <Outlet/>
            </div>
            </TransactionsProvider>
        </>
    )
}