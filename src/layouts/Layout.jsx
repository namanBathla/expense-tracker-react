import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import TransactionsProvider from "../context/TransactionsProvider.jsx";

export default function Layout(){
    return (
        <>
            <TransactionsProvider>
            <div className="flex">
                <Navbar/>
                <div className="max-w-4xl mx-auto p-6 ml-64">
                    <Outlet/>
                </div>
            </div>
            </TransactionsProvider>
        </>
    )
}