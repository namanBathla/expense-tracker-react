import React, { useContext, useMemo } from "react";
import { TransactionContext } from "../context/TransactionsProvider";
import LineChart from "../components/LineChart";
import { FaWallet } from "react-icons/fa";

const Dashboard = () => {
  const { transactions } = useContext(TransactionContext);
  const isExpense = (t) => t.type === "debit";

  // function to get total expense of last {days} days
  const getDailyExpenses = (days) => {
    // days is the no. of days to get the transaction of, e.g. last 5 days, last 30 days
    const dailyExpenses = {};

    const endDate = new Date();
    endDate.setUTCHours(23, 59, 59, 999); // end of endDate, using UTC fixes the issue of date

    const startDate = new Date();
    startDate.setUTCDate(endDate.getUTCDate() - days - 1); // subtract 4 for last 5 days
    startDate.setUTCHours(0, 0, 0, 0); // start of that day
    // console.log("Five Days ago: ", startDate.toISOString().split("T")[0]);

    let i = new Date(startDate); // clone the five days ago date
    while (i <= endDate) {
      dailyExpenses[i.toISOString().split("T")[0]] = 0;
      i.setDate(i.getDate() + 1);
    }

    const expensesInDateRange = transactions.filter((t) => {
      const tDate = t.date;
      return tDate >= startDate && tDate <= endDate && isExpense(t);
    });
    expensesInDateRange.sort((a, b) => a.date - b.date);

    // creating an object to store date and the total expense on that day
    expensesInDateRange.forEach((e) => {
      const dateKey = e.date.toISOString().split("T")[0];
      const amountToAdd = parseInt(e.amount) || 0;
      dailyExpenses[dateKey] = (dailyExpenses[dateKey] || 0) + amountToAdd;
    });
    // console.log(dailyExpenses);
    return dailyExpenses;
  };

  // function to get total expense by Month
  const getMonthlyExpenses = () => {
    const months = [
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
    const monthlyExpenses = {};
    const now = new Date();

    // End: end of current month
    const endDate = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, -1, 23, 59, 59, 999)
    );

    // Start: beginning of 5 months ago
    const startDate = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 4, 1, 0, 0, 0, 0)
    );

    let i = startDate.getMonth();
    while (i <= endDate.getMonth()) {
      monthlyExpenses[months[i]] = 0;
      console.log(i);
      i++;
    }
    // console.log("Start Month:", startDate);
    // console.log("End Month:", endDate);

    const expensesInMonthRange = transactions.filter((t) => {
      const tDate = t.date;
      return startDate <= tDate && tDate <= endDate && isExpense(t);
    });

    expensesInMonthRange.forEach((e) => {
      const monthKey = e.date.getMonth();
      const amountToAdd = e.amount;
      monthlyExpenses[months[monthKey]] += amountToAdd;
    });
    // console.log(monthlyExpenses);
    return monthlyExpenses;
  };

  const getCurrentMonthTotal = () => {
    let total = 0;
    transactions.forEach((t) => {
      // console.log("Check: ", new Date(transaction.date));
      console.log(t.date);
      if (
        isExpense(t) &&
        new Date(t.date).getMonth() === new Date().getMonth()
      ) {
        total += t.amount;
      }
    });
    return total;
  };

  // ----------------------------------------------------------------------------------------------

  // update the current month total only when transactions changes
  const currentMonthTotal = useMemo(
    () => getCurrentMonthTotal(),
    [transactions]
  );
  const dayWiseExpenses = useMemo(() => getDailyExpenses(5), [transactions]);
  const dayWiseExpenseoOfLastMonth = useMemo(
    () => getDailyExpenses(30),
    [transactions]
  );
  const monthWiseExpenses = useMemo(() => getMonthlyExpenses(), [transactions]);

  return (
    <>
      <div className="main-page-container flex flex-col gap-10 px-6 py-8 bg-slate-50 min-h-screen">
        <div className="heading flex flex-col mb-4">
          <h2 className="text-2xl font-semibold text-blue-700 text-center sm:text-left">
            Dashboard
          </h2>
          <p className="text-slate-600">Your spending overview at a glance.</p>
        </div>

        <div className="flex justify-center">
          <div className="border bg-white border-slate-200 px-6 py-4 shadow-md rounded-lg flex gap-4 max-w-md w-full">
            <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
              <FaWallet className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-slate-600 max-w-md w-full text-sm">
                Current Month Total
              </h3>
              <p className="text-2xl font-semibold text-blue-700">
                ₹{currentMonthTotal}
              </p>
            </div>
          </div>
        </div>

        {/* Chart 1 */}
        <div className="chart-container py-4 px-6 bg-white shadow-md border border-slate-200 rounded-lg">
          <h3 className="flex justify-center w-full font-semibold text-slate-600">Expenses over last 5 Days</h3>
          <LineChart
            className=""
            data={dayWiseExpenses}
          />
        </div>

        {/* Chart 2 */}
        <div className="chart-container py-4 px-6 bg-white shadow-md border border-slate-200 rounded-lg">
          <h3 className="flex justify-center w-full font-semibold text-slate-600">Expenses over last 5 Months</h3>
          <LineChart
            data={monthWiseExpenses}
          />
        </div>

        {/* Chart 3 */}
        <div className="chart-container py-4 px-6 bg-white shadow-md border border-slate-200 rounded-lg">
          <h3 className="flex justify-center w-full font-semibold text-slate-600">Expenses over last 30 days</h3>
          <LineChart
            data={dayWiseExpenseoOfLastMonth}
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
