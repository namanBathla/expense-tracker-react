import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div onClick={() => setCount(c => c + 1)}>{count}</div>
    </>
  )
}

export default App
