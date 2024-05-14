import React from 'react'
import { useNavigate } from 'react-router-dom'
const TeamCard = ({teamName,matched,onClick}) => {
    const navigator = useNavigate(); 
  return (
    <div onClick={() => {navigator(`/${teamName}`)}} className='flex flex-row p-5 justify-between w-5/6 bg-white shadow-lg rounded-lg hover:opacity-90 hover:scale-[1.01] transition active:scale-[0.99]'>
        <p className='font-bold text-black'>{teamName}</p>
        <p className='font-bold text-black'>Total Correct: {matched}</p>
    </div>
  )
}

export default TeamCard
