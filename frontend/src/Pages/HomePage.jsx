import React from 'react'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
    const navigator = useNavigate();
  return (
    <div className='group flex flex-col h-screen flex-wrap text-center bg-color-gradient ring-slate-300 rounded-md justify-center items-center shadow-lg p-5 gap-5 text-wrap'>
      <h1 className='text-4xl lg:text-8xl text-white font-bold group-hover:animate-bounce'>Welcome to the Quiz<span>!</span></h1>
      <button onClick={() => {navigator('/teamname')}} className='px-20 py-3 rounded-full text-[#fff] bg-gradient-to-br shadow-lg from-[#5EFCE8] to-[#736EFE] hover:translate-y-2 transition active:scale-[0.97] active:opacity-90 font-semibold text-xl'>Start</button>
    </div>
  )
}

export default HomePage
