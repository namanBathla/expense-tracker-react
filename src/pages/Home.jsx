import React, { useContext } from 'react'
import {TransactionContext} from '../context/TransactionsProvider'
import Transaction from '../components/Transaction';
import Expense from '../components/Expense';
import LineChart from '../components/LineChart';

const Home = () => {
  const {transactions, previousFiveDates} = useContext(TransactionContext);

  const getdailyExpenseByDate = () => {
    const dailyExpenseByDate = {};

    const endDate = new Date();
    console.log("endDate:", endDate.toISOString().split("T")[0]);
    endDate.setUTCHours(23,59,59,999);   // end of endDate, using UTC fixes the issue of date

    const startDate = new Date();
    startDate.setUTCDate(endDate.getUTCDate() - 4);   // subtract 4 for last 5 days
    startDate.setUTCHours(0,0,0,0);    // start of that day
    console.log("Five Days ago: ", startDate.toISOString().split("T")[0]);

    let i = new Date(startDate);    // clone the five days ago date
    while(i <= endDate) {
      dailyExpenseByDate[i.toISOString().split("T")[0]] = 0;
      i.setDate(i.getDate() + 1);
    }

    const expensesInDateRange = transactions.filter((t) => {
      const tDate = t.date.toDate();
      return tDate >= startDate && tDate <= endDate && t.type === "debit";
    })
    expensesInDateRange.sort((a, b) => a.date.toDate() - b.date.toDate());
  
    // creating an object to store date and the total expense on that day
    // toDate() is used because date is stored as Timestamp in firestore
    expensesInDateRange.forEach((e) => {
      const dateKey = e.date.toDate().toISOString().split("T")[0];
      const amountToAdd = parseInt(e.amount) || 0;
      dailyExpenseByDate[dateKey] = (dailyExpenseByDate[dateKey] || 0) + amountToAdd;
    })
    console.log(dailyExpenseByDate);
    return dailyExpenseByDate;
  }

  const getTotalMonthlyExpense = () => {
    getdailyExpenseByDate();
      let total = 0;
      transactions.forEach((transaction) => {
        // console.log("Check: ", new Date(transaction.date.toDate()));
        if(transaction.type === "debit" && (new Date(transaction.date.toDate()).getMonth()) === (new Date().getMonth())) {
          total += transaction.amount;
        }
      });
      return total;
    }


    const totalMonthlyExpense = getTotalMonthlyExpense();
    const lastFiveTransactions = transactions.slice(0,5);
    const dailyExpenseByDate = getdailyExpenseByDate();

  return (
    <div className='grid grid-cols-6  grid-rows-5 gap-2 w-screen'>
      <div className='col-span-1 row-span-2 bg-gray-500 rounded-lg'>
        Total expense for current Month: {totalMonthlyExpense}
      </div>
      <div className='col-span-5 row-span-2 bg-gray-500 rounded-lg'>
        <h3>Last 5 transactions</h3>
        {lastFiveTransactions.map((t) => <Expense key={t.id} {...t} showDelete={false} />)}
        </div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg'>+ Add expense +</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg'>+ Add transaction +</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg'>Some Feature</div>
      <div className='col-span-3 row-span-2  rounded-lg'>
        <LineChart data={dailyExpenseByDate}/>
      </div>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>Monthly expense of last 5 months</div>
    </div>
  )
}

export default Home                         