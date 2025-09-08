import { Outlet } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';

export default function Layout(){
    return (
        <>
            <div className="flex">
                <Navbar/>
                <Outlet/>
            </div>
        </>
    )
}