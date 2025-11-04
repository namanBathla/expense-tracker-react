import React, { useContext, useEffect, useState } from "react";
import Transaction from "../components/Transaction";
import { TransactionContext } from "../context/TransactionsProvider.jsx";

const Transactions = () => {
  const { transactions, getTransactions } = useContext(TransactionContext);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const monthsLabel = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  const getYearsLabel = () => {
    const years = [];
    const currentYear = (new Date()).getFullYear();
    // years.push(currentYear);
    for(let i = 0; i <= 4; i++) {
      years.push(currentYear - i);
    }
    return years;
    // console.log("current years: " , years);
  }

  const yearsLabel = getYearsLabel();



  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => setDisplayedTransactions(transactions), [transactions]);

  const handleFilterChange = (filterBy, filterValue) => {
    setFilterBy(filterBy);
    setFilterValue(filterValue);
    switch(filterBy) {
      case "month":
        handleMonthFilter(filterValue);
        break;
      case "year":
        handleYearFilter(filterValue);
        break;
      case "type":
        handleTypeFilter(filterValue);
        break;
      default: break;
    }
  }

  const handleMonthFilter = (m) => {
    const month = parseInt(m);
    setDisplayedTransactions(
      transactions.filter(t => t.date.getMonth() === month)
    );
  };

  const handleTypeFilter = (type) => {
    setDisplayedTransactions(
      transactions.filter(t => t.type === type)
    );
  };

  const handleYearFilter = (year) => {
    setDisplayedTransactions(
      transactions.filter(t => t.date.getFullYear() === parseInt(year)))
  }

  return (
    <div className="main-page-container flex flex-col gap-4 px-6 py-8 bg-slate-50 min-h-screen">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center sm:text-left">
          All Transactions
        </h2>

        {/* FILTER DROPDOWN */}
        <div className="filter-box">
          <select
            name="filter"
            id=""
            className=""
            value={filterBy}
            onChange={(e) => {
              setFilterBy(e.target.value);
              // console.log("Filter type: ", filterBy);
            }}
          >
            <option value="" selected disabled className="text-black">
              Filter by
            </option>
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="type">Type</option>
          </select>


          {/* YEAR FILTER DROPDOWN */}
          {filterBy === "year" && (
            <select name="year" id=""
            value={filterValue}
            onChange={(e) => handleFilterChange("year", e.target.value)}>
              {yearsLabel.map(year => <option value={year}>{year}</option>)}
            </select>
          )}

          {/* MONTH FILTER DROPDOWN */}
          {filterBy === "month" && (
            <select name="month" id=""
            value={filterValue}
            onChange={(e) => handleFilterChange("month", e.target.value)}>
              {months.map(m => <option value={m}>{monthsLabel[m]}</option>)}
            </select>
          )}

          {/* TYPE (CREDIT/DEBIT) FILTER DROPDOWN */}
          {/* {filterBy === "type" && (
            <select name="type" id=""
            value={filterValue}
            onChange={(e) => handleFilterChange("type", e.target.value)}>
              <option value="debit"><button onClick={(e) => handleFilterChange("type", e.target.value)}>Debit</button></option>
              <option value="credit">Credit</option>
            </select>
          )} */}

                    
          {filterBy === "type" && (
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${filterValue === "debit" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => handleFilterChange("type", "debit")}
            >
              Debit
            </button>
            <button
              className={`px-3 py-1 rounded ${filterValue === "credit" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              onClick={() => handleFilterChange("type", "credit")}
            >
              Credit
            </button>
          </div>)}

        </div>
      </div>

      {/* TRANSACTIONS TABLE BEGIN */}
      <div className="hidden font-semibold sm:grid grid-cols-5 w-full p-3 text-center bg-blue-50 text-slate-700 rounded-t-xl">
        <div>Date</div>
        <div>Amount</div>
        <div>Description</div>
        <div>Category</div>
        <div></div>
      </div>
      <div className="flex flex-col gap-3">
        {displayedTransactions.map((transaction) => {
          return <Transaction key={transaction.id} {...transaction} />;
        })}
      </div>
    </div>
  );
};

export default Transactions;
