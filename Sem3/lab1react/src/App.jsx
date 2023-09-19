import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Clubs from './pages/Clubs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
