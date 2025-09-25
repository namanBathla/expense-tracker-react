import React, { useContext } from 'react'
import {TransactionContext} from '../context/TransactionsProvider'
import Transaction from '../components/Transaction';
import Expense from '../components/Expense';

const Home = () => {
  const {transactions} = useContext(TransactionContext);

  const getTotalMonthlyExpense = () => {
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

  return (
    <div className='grid grid-cols-6  grid-rows-5 gap-2 w-screen'>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>
        Total expense for current Month: {totalMonthlyExpense}
      </div>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>
        <h3>Last 5 transactions</h3>
        {lastFiveTransactions.map((t) => <Expense key={t.id} {...t} showDelete={false} />)}
        </div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg'>+ Add expense +</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg'>+ Add transaction +</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg'>Some Feature</div>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>Daily expense of last 5 days</div>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>Monthly expense of last 5 months</div>
    </div>
  )
}

export default Home