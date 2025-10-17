import React, { useContext, useMemo } from "react";
import { TransactionContext } from "../context/TransactionsProvider";
import Expense from "../components/Expense";
import LineChart from "../components/LineChart";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
const Home = () => {
  const { transactions } = useContext(TransactionContext);

  const recentTransactions = transactions.slice(0, 5); // most recent five transactions

  return (
    <div className="parent flex flex-col bg-blue-100">
      <div className="box flex flex-col gap-10 justify-center items-center h-screen p-4">
        {/* title and taglin */}
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-center">
            Expense Tracker App
          </h1>
          <span className="text-xl">Track Smarter. Spend Better.</span>
        </div>

        {/* Description */}
        <div className="description w-3/4">
          Stay on top of your finances with real-time insights into your income
          and expenses. Visualize your spending habits, set goals, and take
          control of your money effortlessly.Easily add, view, and analyze your
          daily expenses in one place. Get clear visual summaries that help you
          understand where your money goes — no spreadsheets required.
        </div>

        {/* Quick access buttons */}
        <div className="buttons flex gap-3">
          <Link
            to="menu"
            smooth={true}
            duration={500}
            className="bg-blue-400 p-3 rounded-lg cursor-pointer"
          >
            Get Started{" "}
          </Link>
          <NavLink className="border border-black p-3 rounded-lg" to="/add">
            Add Transaction
          </NavLink>
        </div>
      </div>

      <div
        id="menu"
        className="box flex flex-col gap-10 justify-center items-center py-10 p-4"
      >
        <NavLink to="/dashboard" className="border border-black w-1/4 text-center p-3 hover:bg-blue-200 rounded-lg">Monthly Summary</NavLink>
        <NavLink to="/reports" className="border border-black w-1/4 text-center p-3 hover:bg-blue-200 rounded-lg">View Insights</NavLink>
        <NavLink to="/reports" className="border border-black w-1/4 text-center p-3 hover:bg-blue-200 rounded-lg">Trends</NavLink>
      </div>

      <div className="box bg-green-300 flex flex-col gap-2 items-center h-screen p-4">
        <h3 className="text-lg font-bold">Recent Transactions</h3>
        <div className="transactions-box w-full">
          <div className="table-headers font-bold grid grid-cols-4 p-2 text-center">
            <div>Date</div>
            <div>Amount</div>
            <div>Description</div>
            <div>Category</div>
          </div>
          {recentTransactions.map((t) => (
            <Expense key={t.id} {...t} showDelete={false} />
          ))}
        </div>
        <NavLink className="self-start hover:underline" to="/transactions">
          View all Transactions
        </NavLink>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
