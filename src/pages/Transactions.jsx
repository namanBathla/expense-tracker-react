import React, { useContext, useEffect, useState } from "react";
import Transaction from "../components/Transaction";
import { TransactionContext } from "../context/TransactionsProvider.jsx";

const Transactions = () => {
  const { transactions, getTransactions } = useContext(TransactionContext);
  const [displayedTransactions, setDisplayedTransactions] = useState([]);
  const [filterBy, setFilterBy] = useState("");
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

  const applyFilter = ({
    selectedYear,
    selectedMonth,
    selectedType,
    selectedCategory,
  }) => {
    console.log("Applying");
    console.log("selectedYear: ", selectedYear);
    console.log("selectedMonth: ", selectedMonth);
    console.log("selectedType: ", selectedType);
    console.log("selectedCategory: ", selectedCategory);
    let filtered = transactions;
    if (selectedYear != "")
      filtered = filtered.filter(
        (txn) => txn.date.getFullYear() === parseInt(selectedYear)
      );
    if (selectedMonth != "")
      filtered = filtered.filter(
        (txn) => txn.date.getMonth() === parseInt(selectedMonth)
      );
    if (selectedType != "")
      filtered = filtered.filter((txn) => txn.type === selectedType);
    if (selectedCategory != "")
      filtered = filtered.filter((txn) => txn.category === selectedCategory);

    setDisplayedTransactions(filtered);
  };

  const resetFilter = () => setDisplayedTransactions(transactions);

  const monthsIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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

  const filterByOptions = ["year", "month", "type", "category"];
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
                  monthsIndices.map((m) => (
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
              onClick={() => {
                console.log({
                  selectedYear,
                  selectedMonth,
                  selectedType,
                  selectedCategory,
                });
                applyFilter({
                  selectedYear,
                  selectedMonth,
                  selectedType,
                  selectedCategory,
                });
              }}
            >
              Apply
            </button>
            <button
              className="px-3 py-1 border shadow-md rounded-lg"
              onClick={() => resetFilter()}
            >
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
