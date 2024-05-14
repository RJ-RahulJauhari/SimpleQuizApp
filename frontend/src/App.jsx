import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import TeamPage from './Pages/TeamPage'
import PinPage from './Pages/PinPage'
import QuizPage from './Pages/QuizPage'
import { TeamContextProvider } from './Context/TeamContext'
import FinishedPage from './Pages/FinishedPage'
import toast, { Toaster } from 'react-hot-toast';


function App() {
  return (
      <TeamContextProvider>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/teamname' element={<TeamPage></TeamPage>}></Route>
          <Route path='/pin' element={<PinPage></PinPage>}></Route>
          <Route path='/quiz/:id' element={<QuizPage></QuizPage>}></Route>
          <Route path='/finished' element={<FinishedPage></FinishedPage>}></Route>
        </Routes>
      </TeamContextProvider>
  )
}

export default App
