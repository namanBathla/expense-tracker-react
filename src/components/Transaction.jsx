import React from 'react'

const Transaction = ({dateTime, amount, description, category, type, onClickFunc}) => {

  const bgColor = type === "credit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
  return (
    <div className={`grid grid-cols-5 w-full p-2 text-center ${bgColor}`}>
      <div>{dateTime}</div>
      <div>{amount}</div>
      <div>{description}</div>
      <div>{category}</div>
      {/* <div className='text-red-600 cursor-pointer'>Delete</div> */}
      <button className='text-white bg-red-600 p-1 w-1/2 rounded-lg' onClick={onClickFunc}>Delete</button>
    </div>
  )
}

export default Transaction