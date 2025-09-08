import React from 'react'

const Expense = () => {
  return (
    <div className='grid grid-cols-5 p-2 text-center'>
      <div>05 Aug 2025</div>
      <div>1000</div>
      <div>Rent for the month of August</div>
      <div>Fixed Expense</div>
      <div className='text-red-600 cursor-pointer'>Delete</div>
    </div>
  )
}

export default Expense