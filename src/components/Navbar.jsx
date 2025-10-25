import { MdAddCircle, MdAttachMoney, MdCreditCard, MdDashboard, MdDescription, MdHome } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Navbar = () => {

  const onActiveLink = ({isActive}) => {
    // return isActive ? "text-blue-400" : "text-white";
    // return isActive ? "bg-slate-700 px-3 py-2 rounded-md text-white" : "text-white";

    return isActive
  ? "bg-slate-700 px-3 py-2 rounded-md text-white transition-colors duration-300"
  : "text-white px-3 py-2 transition-colors duration-300";
  }
  const links = [
    {name: "HOME", path:"/", icon:MdHome},
    {name: "DASHBOARD", path:"/dashboard", icon: MdDashboard},
    {name: "TRANSACTIONS", path:"/transactions", icon: MdCreditCard},
    {name: "EXPENSES", path:"/expenses", icon: MdAttachMoney},
    {name: "REPORTS", path:"/reports", icon: MdDescription},
    {name: "ADD", path:"/add", icon: MdAddCircle},
  ]
  return (<>
    {/* <div className="fixed left-0 top-0 flex flex-col justify-center items-center gap-5 bg-slate-800 text-white h-screen px-5">
      <NavLink to="/" className={onActiveLink}>HOME</NavLink>
      <NavLink to="/dashboard" className={onActiveLink}>DASHBOARD</NavLink>
      <NavLink to="/transactions" className={onActiveLink}>TRANSACTIONS</NavLink>
      <NavLink to="/reports" className={onActiveLink}>REPORTS</NavLink>
      <NavLink to="/expenses" className={onActiveLink}>EXPENSES</NavLink>
      <NavLink to="/add" className={onActiveLink}>ADD</NavLink>
    </div> */}

    <div className="fixed left-0 top-0 flex flex-col justify-center items-center gap-5 bg-slate-800 text-white h-screen px-5">
      {links.map(link => {
        const Icon = link.icon;
        return (
          <NavLink key={link.name} to={link.path} className={onActiveLink}>
            <div className="flex justify-center items-center">
              <Icon className="h-5 w-5 mr-2"/>
              {link.name}
            </div>
          </NavLink>
        );
      })}
    </div>
  </>);
};

// NavLink automatically passes an object like { isActive: true/false } to whatever function you give in className.
export default Navbar;
