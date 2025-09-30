import React, { useContext } from 'react'
import { TransactionContext } from '../context/TransactionsProvider';

const Expense = ({date, amount, description, category, id, showDelete = true}) => {
  const {deleteTransaction} = useContext(TransactionContext);
  const gridClass = showDelete ? "grid grid-cols-5 w-full p-2 text-center" :
  "grid grid-cols-4 w-full p-2 text-center"
  return (
    <div className={gridClass}>
      <div>{date.toLocaleDateString()}</div>
      <div>{`₹${amount}`}</div>
      <div>{description}</div>
      <div>{category}</div>
      {showDelete && <button className='text-white bg-red-600 p-1 w-1/2 rounded-lg' onClick={() => deleteTransaction(id)}>Delete</button>}
    </div>
  )
}

export default Expense