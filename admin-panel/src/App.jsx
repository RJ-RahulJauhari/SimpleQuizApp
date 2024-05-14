
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import TeamInfo from './Pages/TeamInfo'

function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/:teamName' element={<TeamInfo></TeamInfo>}></Route>
      </Routes>
    </div>
  )
}

export default App
