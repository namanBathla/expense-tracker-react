import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionsProvider';

const Expense = ({dateTime, amount, description, category, id}) => {
  const {deleteTransaction} = useContext(TransactionContext);

  return (
    <div className="grid grid-cols-5 w-full p-2 text-center">
      <div>{dateTime}</div>
      <div>{`₹${amount}`}</div>
      <div>{description}</div>
      <div>{category}</div>
      <button className='text-white bg-red-600 p-1 w-1/2 rounded-lg' onClick={() => deleteTransaction(id)}>Delete</button>
    </div>
  )
}

export default Expense