import React from 'react'

const Home = () => {
  return (
    <div className='grid grid-cols-6  grid-rows-5 gap-2 w-screen'>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>Total expense of Month</div>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>Last 5 transactions</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg'>+ Add expense +</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg'>+ Add transaction +</div>
      <div className='col-span-2 row-span-1 bg-blue-300 rounded-lg'>Some Feature</div>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>Daily expense of last 5 days</div>
      <div className='col-span-3 row-span-2 bg-gray-500 rounded-lg'>Monthly expense of last 5 months</div>
    </div>
  )
}

export default Home