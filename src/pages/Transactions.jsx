import React, { useContext, useEffect, useState } from "react";
import Transaction from "../components/Transaction";
import { TransactionContext } from "../context/TransactionsProvider.jsx";

const Transactions = () => {
  const { transactions, getTransactions } = useContext(TransactionContext);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const getYearsLabel = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    // years.push(currentYear);
    for (let i = 0; i <= 4; i++) {
      years.push(currentYear - i);
    }
    return years;
    // console.log("current years: " , years);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => setDisplayedTransactions(transactions), [transactions]);

  const handleFilterChange = (filterBy, filterValue) => {
    setFilterBy(filterBy);
    setFilterValue(filterValue);
    switch (filterBy) {
      case "month":
        handleMonthFilter(filterValue);
        break;
      case "year":
        handleYearFilter(filterValue);
        break;
      case "type":
        handleTypeFilter(filterValue);
        break;
      default:
        break;
    }
  };

  const applyFilter = ({ year, month, type, category }) => {
    let filtered = transactions;
    if (year)
      filtered = filtered.filter((txn) => txn.date.getFullYear() === year);
    if (month)
      filtered = filtered.filter((txn) => txn.date.getMonth() === month);
    if (type) filtered = filtered.filter((txn) => txn.type === type);
    if (category) filtered = filtered.filter(txn.category === category);

    setDisplayedTransactions(filtered);
  };

  const resetFilter = () => setDisplayedTransactions(transactions);

  const handleMonthFilter = (m) => {
    const month = parseInt(m);
    setDisplayedTransactions(
      transactions.filter((t) => t.date.getMonth() === month)
    );
  };

  const handleTypeFilter = (type) => {
    setDisplayedTransactions(transactions.filter((t) => t.type === type));
  };

  const handleYearFilter = (year) => {
    setDisplayedTransactions(
      transactions.filter((t) => t.date.getFullYear() === parseInt(year))
    );
  };

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
  const filterByOptions = ["year", "month", "type"];
  const yearsLabel = getYearsLabel();
  const typesLabel = ["debit", "credit"];
  const categoriesLabel = [
    "Fixed",
    "Grocery",
    "Dairy",
    "Veggies",
    "Miscellaneous",
    "Vehicle",
  ];

  return (
    <div className="main-page-container flex flex-col gap-4 px-6 py-8 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center sm:text-left">
          All Transactions
        </h2>
        {/* ---------------------------------------------------------------------------------------------------- */}
        {/* FILTER DROPDOWN */}
        <div>
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
              <select
                name="year"
                id=""
                value={filterValue}
                onChange={(e) => handleFilterChange("year", e.target.value)}
              >
                {yearsLabel.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            )}

            {/* MONTH FILTER DROPDOWN */}
            {filterBy === "month" && (
              <select
                name="month"
                id=""
                value={filterValue}
                onChange={(e) => handleFilterChange("month", e.target.value)}
              >
                {months.map((m) => (
                  <option key={m} value={m}>
                    {monthsLabel[m]}
                  </option>
                ))}
              </select>
            )}

            {/* TYPE (CREDIT/DEBIT) FILTER DROPDOWN */}
            {filterBy === "type" && (
              <select
                name="type"
                id=""
                value={filterValue}
                onChange={(e) => handleFilterChange("type", e.target.value)}
              >
                <option value="debit">Debit</option>
                <option value="credit">Credit</option>
              </select>
            )}
          </div>
        </div>

        
        {/* ------------------------------------------------------------------------------------------------------- */}
        {/* FILTER DROPDOWN USING DIVS AND BUTTONS */}
        <div className="filter-section flex flex-col gap-4">
          <div className="filter-box flex gap-4">
            {/* Left filterBy box */}
            <div className="filter-by flex flex-col gap-4">
              {filterByOptions.map((opt) => (
                <button
                  key={opt}
                  value={opt}
                  onClick={() =>
                    filterBy === opt ? setFilterBy("") : setFilterBy(opt)
                  }
                  className={`px-3 py-1 border rounded-lg ${
                    filterBy === opt ? "bg-blue-600 text-white" : "bg-gray-100"
                  }`}
                >
                  {opt.slice(0, 1).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>

            {/* Right filterBy value */}
            <div className="filterValue flex flex-col">
              <div className="flex flex-col gap-2 bg-red-500">
                {filterBy === "year" &&
                  yearsLabel.map((y) => (
                    <button
                      key={y}
                      onClick={() =>
                        selectedYear === y
                          ? setSelectedYear("")
                          : setSelectedYear(y)
                      }
                      className={`px-3 py-1 border rounded-lg ${
                        selectedYear === y
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
              </div>

              <div className="flex flex-col gap-2 bg-red-500">
                {filterBy === "month" &&
                  months.map((m) => (
                    <button
                      key={m}
                      onClick={() =>
                        selectedMonth === m
                          ? setSelectedMonth("")
                          : setSelectedMonth(m)
                      }
                      className={`px-3 py-1 border rounded-lg ${
                        selectedMonth === m
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {monthsLabel[m]}
                    </button>
                  ))}
              </div>

              <div className="flex flex-col gap-2 bg-red-500">
                {filterBy === "type" &&
                  typesLabel.map((t) => (
                    <button
                      key={t}
                      onClick={() =>
                        selectedType === t
                          ? setSelectedType("")
                          : setSelectedType(t)
                      }
                      className={`px-3 py-1 border rounded-lg ${
                        selectedType === t
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {t.slice(0, 1).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
              </div>

              <div className="flex flex-col gap-2 bg-red-500">
                {filterBy === "category" &&
                  categoriesLabel.map((c) => (
                    <button
                      key={c}
                      onClick={() =>
                        selectedCategory === c
                          ? setSelectedCategory("")
                          : setSelectedCategory(c)
                      }
                      className={`px-3 py-1 border rounded-lg ${
                        selectedCategory === c
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="action-box flex gap-4">
            <button
              className="px-3 py-1 border shadow-md rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              onClick={() => applyFilter({selectedYear, selectedMonth, selectedType, selectedCategory})}
            >
              Apply
            </button>
            <button className="px-3 py-1 border shadow-md rounded-lg"
            onClick={() => resetFilter()}>
              Reset
            </button>
          </div>
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
