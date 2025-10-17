import React, { useContext, useMemo } from 'react'
import {TransactionContext} from '../context/TransactionsProvider'
import Expense from '../components/Expense';
import LineChart from '../components/LineChart';

const Home = () => {
  const {transactions} = useContext(TransactionContext);

  const isExpense = (t) => t.type === "debit";
  // ---------------------- Functions ------------------------------------------------

  
    
    


  return (
    <div className='grid grid-cols-6  grid-rows-5 gap-2 w-screen'>
      
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg p-2'>+ Add expense +</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg p-2'>+ Add transaction +</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg p-2'>Some Feature</div>
      
    </div>
  )
}

export default Home                         