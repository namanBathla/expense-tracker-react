import React from 'react'

const Transaction = ({dateTime, amount, description, category, type, onClickFunc}) => {

  const colorClass = type === "credit" ? "text-green-600" : "text-red-600";
  return (
    <div className={`grid grid-cols-5 p-2 text-center ${colorClass}`}>
      <div>{dateTime}</div>
      <div>{amount}</div>
      <div>{description}</div>
      <div>{category}</div>
      {/* <div className='text-red-600 cursor-pointer'>Delete</div> */}
      <button className='text-white bg-red-600 p-1 rounded-lg' onClick={onClickFunc}>Delete</button>
    </div>
  )
}

export default Transaction