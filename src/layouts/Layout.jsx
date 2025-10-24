import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import TransactionsProvider from "../context/TransactionsProvider.jsx";

export default function Layout(){
    return (
        <>
            <TransactionsProvider>
            <div className="flex">
                <Navbar/>
                <div className="w-full mx-auto p-6 ml-52">
                    <Outlet/>
                </div>
            </div>
            </TransactionsProvider>
        </>
    )
}