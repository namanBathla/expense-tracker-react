import React, { useContext, useEffect } from 'react'
import Transaction from '../components/Transaction';
import { TransactionContext } from '../context/TransactionsProvider.jsx';

const Transactions = () => {

  const {transactions, getTransactions} = useContext(TransactionContext);

  useEffect(() => {getTransactions()}, []);

  return (
    <div className='main-page-container flex flex-col gap-4 px-6 py-8 bg-slate-50 min-h-screen'>

      <h2 className="text-2xl font-semibold text-blue-700 mb-4 text-center sm:text-left">
        All Transactions
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
        return <Transaction key={transaction.id} {...transaction}/>
      }))}
      </div>      
    </div>
  )
}

export default Transactions