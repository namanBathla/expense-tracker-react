import React, { useContext, useEffect } from 'react'
import Expense from '../components/Expense.jsx';
import { TransactionContext } from '../context/TransactionsProvider.jsx';
import Transaction from '../components/Transaction.jsx';

const Expenses = () => {

  const {transactions, getTransactions} = useContext(TransactionContext);

  useEffect(() => {getTransactions()}, []);

  return (
    <div className='flex flex-col gap-4 px-6 py-8 bg-slate-50 min-h-screen'>
      <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center sm:text-left">
        All Expenses
      </h2>
      <div className='hidden font-semibold sm:grid grid-cols-5 w-full p-3 text-center bg-blue-50 text-slate-700 rounded-t-xl'>
        <div>Date</div>
        <div>Amount</div>
        <div>Description</div>
        <div>Category</div>
        <div></div>
      </div>
      <div className='flex flex-col gap-3'>
        {transactions.map((transaction => {
          if(transaction.type === "debit") {
            return <Transaction key={transaction.id} {...transaction} blackText={true}/>
          }
      }))}
      </div>      
    </div>
  )
}

export default Expenses