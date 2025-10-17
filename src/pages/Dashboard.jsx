import React, { useContext, useMemo } from 'react'
import { TransactionContext } from '../context/TransactionsProvider'
import LineChart from '../components/LineChart'
import Expense from '../components/Expense'

const Dashboard = () => {
  const {transactions} = useContext(TransactionContext);
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
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyExpenses = {};
        const now = new Date();
  
        // End: end of current month
        const endDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, -1, 23, 59, 59, 999));
  
        // Start: beginning of 5 months ago
        const startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 4, 1, 0, 0, 0, 0));
  
        let i = startDate.getMonth();
        while(i <= endDate.getMonth()) {
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
    }

    const getCurrentMonthTotal = () => {
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
    const dayWiseExpenses = useMemo(() => getDailyExpenses(), [transactions]);
    const monthWiseExpenses = useMemo(() => getMonthlyExpenses(), [transactions]);
    

  return (
  <>
  <div className='w-screen'>
    <div className="grid grid-cols-5">
      <div className='col-span-1 justify-self-center self-center'>Current month total: {currentMonthTotal}</div>
    </div>


    <div className='flex'>
      <div className='rounded-lg w-1/2'>
        <LineChart className="" data={dayWiseExpenses} title="Expenses over last 5 days"/>
      </div>
      <div className='rounded-lg p-2 w-1/2'>
        <LineChart data={monthWiseExpenses} title="Expenses over last 5 months"/>
      </div>
    </div>
  </div>
  </>)
}

export default Dashboard