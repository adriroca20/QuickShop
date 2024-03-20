import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main className='flex justify-center items-center h-screen bg-fuchsia-300'>
        <h1>Hola mundo</h1>
      </main>
    </>
  )
}

export default App
