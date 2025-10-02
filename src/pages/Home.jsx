import React, { useContext, useMemo } from 'react'
import {TransactionContext} from '../context/TransactionsProvider'
import Expense from '../components/Expense';
import LineChart from '../components/LineChart';

const Home = () => {
  const {transactions} = useContext(TransactionContext);

  // ---------------------- Functions ------------------------------------------------
  const isExpense = (t) => t.type === "debit";
  
  // function to get total expense of last 5 days
  const getDailyExpenses = () => {
    const dailyExpenses = {};

    const endDate = new Date();
    // console.log("endDate:", endDate.toISOString().split("T")[0]);
    endDate.setUTCHours(23,59,59,999);   // end of endDate, using UTC fixes the issue of date

    const startDate = new Date();
    startDate.setUTCDate(endDate.getUTCDate() - 4);   // subtract 4 for last 5 days
    startDate.setUTCHours(0,0,0,0);    // start of that day
    // console.log("Five Days ago: ", startDate.toISOString().split("T")[0]);

    let i = new Date(startDate);    // clone the five days ago date
    while(i <= endDate) {
      dailyExpenses[i.toISOString().split("T")[0]] = 0;
      i.setDate(i.getDate() + 1);
    }

    const expensesInDateRange = transactions.filter((t) => {
      const tDate = t.date;
      return tDate >= startDate && tDate <= endDate && isExpense(t);
    })
    expensesInDateRange.sort((a, b) => a.date - b.date);
  
    // creating an object to store date and the total expense on that day
    expensesInDateRange.forEach((e) => {
      const dateKey = e.date.toISOString().split("T")[0];
      const amountToAdd = parseInt(e.amount) || 0;
      dailyExpenses[dateKey] = (dailyExpenses[dateKey] || 0) + amountToAdd;
    })
    // console.log(dailyExpenses);
    return dailyExpenses;
  }


  // function to get total expense by Month
  const getMonthlyExpenses = () => {
      const monthlyExpenses = {};
      const now = new Date();

      // End: end of current month
      const endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, -1, 23, 59, 59, 999));

      // Start: beginning of 5 months ago
      const startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 4, 1, 0, 0, 0, 0));

      let i = startDate.getMonth();
      while(i <= endDate.getMonth()) {
        monthlyExpenses[i] = 0;
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
        monthlyExpenses[monthKey] += amountToAdd;
      });
      // console.log(monthlyExpenses);
      return monthlyExpenses;
  }

  const getCurrentMonthTotal = () => {
    getDailyExpenses();
    getMonthlyExpenses();
      let total = 0;
      transactions.forEach((t) => {
        // console.log("Check: ", new Date(transaction.date));
        console.log(t.date);
        if(isExpense(t) && (new Date(t.date).getMonth()) === (new Date().getMonth())) {
          total += t.amount;
        }
      });
      return total;
    }


    // ----------------------------------------------------------------------------------------------

    // update the current month total only when transactions changes
    const currentMonthTotal = useMemo(() => getCurrentMonthTotal(), [transactions]);
    const recentTransactions = transactions.slice(0,5);   // most recent five transactions
    const dayWiseExpenses = useMemo(() => getDailyExpenses(), [transactions]);
    const monthWiseExpenses = useMemo(() => getMonthlyExpenses(), [transactions]);


  return (
    <div className='grid grid-cols-6  grid-rows-5 gap-2 w-screen'>
      <div className='col-span-1 row-span-2 bg-gray-500 rounded-lg p-2'>
        Total expense for current Month: {currentMonthTotal}
      </div>
      <div className='col-span-5 row-span-2 bg-gray-500 rounded-lg p-2'>
        <h3>Last 5 transactions</h3>
        {recentTransactions.map((t) => <Expense key={t.id} {...t} showDelete={false} />)}
        </div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg p-2'>+ Add expense +</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg p-2'>+ Add transaction +</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg p-2'>Some Feature</div>
      <div className='col-span-3 row-span-2  rounded-lg'>
        <LineChart className="" data={dayWiseExpenses} title="Expenses over last 5 days"/>
      </div>
      <div className='col-span-3 row-span-2 rounded-lg p-2'>
        <LineChart data={monthWiseExpenses} title="Expenses over last 5 months"/>
      </div>
    </div>
  )
}

export default Home                         