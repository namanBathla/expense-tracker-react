import React from 'react'

const Transaction = ({dateTime, amount, description, category, type}) => {

  const colorClass = type === "credit" ? "text-green-600" : "text-red-600";
  return (
    <div className={`grid grid-cols-5 p-2 text-center ${colorClass}`}>
      <div>{dateTime}</div>
      <div>{amount}</div>
      <div>{description}</div>
      <div>{category}</div>
      <div className='text-red-600 cursor-pointer'>Delete</div>
    </div>
  )
}

export default Transaction