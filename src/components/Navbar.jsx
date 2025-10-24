import { NavLink } from "react-router-dom";

const Navbar = () => {

  const onActiveLink = ({isActive}) => {
    // return isActive ? "text-blue-400" : "text-white";
    // return isActive ? "bg-slate-700 px-3 py-2 rounded-md text-white" : "text-white";

    return isActive
  ? "bg-slate-700 px-3 py-2 rounded-md text-white transition-colors duration-300"
  : "text-white px-3 py-2 transition-colors duration-300";
  }

  return (<>
    <div className="fixed left-0 top-0 flex flex-col justify-center items-center gap-5 bg-slate-800 text-white h-screen px-5">
      <NavLink to="/" className={onActiveLink}>HOME</NavLink>
      <NavLink to="/dashboard" className={onActiveLink}>DASHBOARD</NavLink>
      <NavLink to="/transactions" className={onActiveLink}>TRANSACTIONS</NavLink>
      <NavLink to="/reports" className={onActiveLink}>REPORTS</NavLink>
      <NavLink to="/expenses" className={onActiveLink}>EXPENSES</NavLink>
      <NavLink to="/add" className={onActiveLink}>ADD</NavLink>
    </div>
  </>);
};

// NavLink automatically passes an object like { isActive: true/false } to whatever function you give in className.
export default Navbar;
