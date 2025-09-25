import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionsProvider';

const Transaction = ({date, amount, description, category, type, id}) => {
  const {deleteTransaction} = useContext(TransactionContext);

  const bgColor = type === "credit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
  return (
    <div className={`grid grid-cols-5 w-full p-2 text-center ${bgColor}`}>
      <div>{date.toDate().toLocaleDateString()}</div>
      <div>{`₹${amount}`}</div>
      <div>{description}</div>
      <div>{category}</div>
      <button className='text-white bg-red-600 p-1 w-1/2 rounded-lg' onClick={() => deleteTransaction(id)}>Delete</button>
    </div>
  )
}

export default Transaction;