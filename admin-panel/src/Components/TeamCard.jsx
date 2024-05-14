import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TiDelete } from "react-icons/ti";
import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const TeamCard = ({teamName,matched,onClick,flag,toggle}) => {
    const navigator = useNavigate(); 
    const deleteTeam = async () => {
      try {
        const res = await axios.delete(`${BASE_URL}/teams/${teamName}`);
        if (res.status === 200) {
            // Team deleted successfully, you may want to perform additional actions here
            console.log("Team deleted successfully");
            toggle(!flag);
        } else {
            console.log("Failed to delete team");
        }
    } catch (error) {
        console.error("Error deleting team:", error.message);
    }
    }

  return (
    <div className='w-full flex flex-row justify-center items-center gap-3'>
      <div onClick={() => {navigator(`/${teamName}`)}} className='flex flex-row p-5 items-center justify-between w-5/6 bg-white shadow-lg rounded-lg hover:opacity-90 hover:scale-[1.01] transition active:scale-[0.99]'>
        <p className='font-bold text-black'>{teamName}</p>
        <p className='font-bold text-black'>Total Correct: {matched}</p>
      </div>
      <div>
        <button onClick={deleteTeam} className='bg-red-500 font-semibold p-2 rounded-full active:scale-95 transition'><TiDelete size={30} /></button>
      </div>
      
    </div>
  )
}

export default TeamCard
