import React, { useContext } from 'react'
import {TransactionContext} from '../context/TransactionsProvider'

const Home = () => {
  const {transactions} = useContext(TransactionContext);

  const getTotalMonthlyExpense = () => {
      let total = 0;
      transactions.forEach((transaction) => {
        console.log("Check: ", new Date(transaction.dateTime));
        if(transaction.type === "debit" && (new Date(transaction.dateTime)).getMonth() === (new Date().getMonth())) {
          total += parseInt(transaction.amount);
        }
      });
      return total;
    }

    const totalMonthlyExpense = getTotalMonthlyExpense();

  return (
    <div className='grid grid-cols-6  grid-rows-5 gap-2 w-screen'>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>
        {totalMonthlyExpense}
      </div>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>Last 5 transactions</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg'>+ Add expense +</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg'>+ Add transaction +</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg'>Some Feature</div>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>Daily expense of last 5 days</div>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>Monthly expense of last 5 months</div>
    </div>
  )
}

export default Home