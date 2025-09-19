import React, { useContext, useEffect } from 'react'
import Transaction from '../components/Transaction';
import { TransactionContext } from '../context/TransactionsProvider.jsx';

const Transactions = () => {

  const {transactions, getTransactions} = useContext(TransactionContext);

  useEffect(() => {getTransactions()}, []);

  return (
    <div className='w-full'>
      <div className='grid grid-cols-5 w-full p-2 text-center bg-gray-300'>
        <div>Date</div>
        <div>Amount</div>
        <div>Description</div>
        <div>Category</div>
        <div></div>
      </div>
      <div className='gap-2'>
        {transactions.map((transaction => {
        return <Transaction key={transaction.id} {...transaction}/>
      }))}
      </div>      
    </div>
  )
}

export default Transactions