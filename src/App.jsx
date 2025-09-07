import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='flex justify-center items-center h-screen flex-col gap-3 bg-blue-200'>
      <div className="flex justify-center items-center text-6xl">{count}</div>
      <button className='outline-none rounded-lg bg-blue-500 w-40 text-white p-2 text-xl'
      onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </>
  )
}

export default App
