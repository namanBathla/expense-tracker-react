import { NavLink } from "react-router-dom";

const Navbar = () => {

  const onActiveLink = ({isActive}) => {
    return isActive ? "text-red-900" : "text-white";
  }

  return (<>
    <div className="flex flex-col justify-center items-center gap-5 bg-slate-400 h-screen px-5">
      <NavLink to="/" className={onActiveLink}>HOME</NavLink>
      <NavLink to="/dashboard" className={onActiveLink}>DASHBOARD</NavLink>
      <NavLink to="/transactions" className={onActiveLink}>TRANSACTIONS</NavLink>
      <NavLink to="/reports" className={onActiveLink}>REPORTS</NavLink>
      <NavLink to="/expenses" className={onActiveLink}>EXPENSES</NavLink>
      <NavLink to="/add">ADD</NavLink>
    </div>
  </>);
};

// NavLink automatically passes an object like { isActive: true/false } to whatever function you give in className.
export default Navbar;
