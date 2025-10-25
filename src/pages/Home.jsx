import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionsProvider";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import Transaction from "../components/Transaction";

const Home = () => {
  const { transactions } = useContext(TransactionContext);

  const recentTransactions = transactions.slice(0, 5); // most recent five transactions

  return (
    <div className="main-page-container flex flex-col bg-slate-50 text-slate-800 scroll-smooth">
      <div className="box flex flex-col gap-8 justify-center items-center min-h-screen p-6">
        {/* title and taglin */}
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-2">
            Expense Tracker App
          </h1>
          <span className="text-lg md:text-xl text-slate-600">
            Track Smarter. Spend Better.
          </span>
        </div>

        {/* Description */}
        <div className="description w-3/4 max-w-2xl leading-relaxed text-slate-600 text-center">
          Stay on top of your finances with real-time insights into your income
          and expenses. Visualize your spending habits, set goals, and take
          control of your money effortlessly.Easily add, view, and analyze your
          daily expenses in one place. Get clear visual summaries that help you
          understand where your money goes — no spreadsheets required.
        </div>

        {/* Quick access buttons */}
        <div className="buttons flex gap-3 justify-center mt-4">
          <Link
            to="menu"
            smooth={true}
            duration={500}
            className="bg-blue-600 px-6 py-3 rounded-lg cursor-pointer text-white font-medium shadow-md hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <NavLink
            className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition"
            to="/add"
          >
            Add Transaction
          </NavLink>
        </div>
      </div>

      {/* MENU */}
      <div id="menu" className="box flex flex-col gap-6 justify-center items-center px-6 min-h-screen">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full flex flex-col gap-4 items-center">
          <h3 className="text-2xl font-semibold text-blue-700 text-center">
            Menu
          </h3>
          <NavLink
            to="/dashboard"
            className="w-64 text-center px-6 py-3 rounded-lg border border-slate-300 hover:bg-blue-100 hover:border-blue-400 transition"
          >
            Monthly Summary
          </NavLink>
          <NavLink
            to="/reports"
            className="w-64 text-center px-6 py-3 rounded-lg border border-slate-300 hover:bg-blue-100 hover:border-blue-400 transition"
          >
            View Insights
          </NavLink>
          <NavLink
            to="/reports"
            className="w-64 text-center px-6 py-3 rounded-lg border border-slate-300 hover:bg-blue-100 hover:border-blue-400 transition"
          >
            Trends
          </NavLink>
        </div>
      </div>

      {/* RECENT TRANSACTIONS SECTION */}
      <div className="box flex flex-col gap-6 items-center min-h-screen px-6 rounded-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full flex flex-col">
          <h3 className="text-2xl font-semibold text-blue-700 mb-4 text-center">
            Recent Transactions
          </h3>
          <div className="transactions-box w-full border-t border-slate-200 overflow-x-auto">
            <div className="min-w-[500px]">
              <div className="table-headers font-semibold grid grid-cols-4 p-3 bg-blue-50 text-slate-700 rounded-t-lg text-center">
                <div>Date</div>
                <div>Amount</div>
                <div>Description</div>
                <div>Category</div>
              </div>
              {recentTransactions.map((t) => (
                <Transaction
                  key={t.id}
                  {...t}
                  showDelete={false}
                  blackText={true}
                />
              ))}
            </div>
          </div>
          <NavLink
            to="/transactions"
            className="mt-4 text-blue-600 hover:underline self-end font-medium"
          >
            View all Transactions
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
