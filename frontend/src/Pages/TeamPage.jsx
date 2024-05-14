import React, { useContext, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { TeamContext } from '../Context/TeamContext';
import { BASE_URL } from '../../constants/url';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TeamPage = () => {

    const {teamName,setTeamName} = useContext(TeamContext)
    const navigator = useNavigate();
    const failed = (message) => {
      toast.error(message);
    }
    
    const validateTeam = async (name) => {
      try {
        const response = await axios.post(`${BASE_URL}/doesTeamExist`, { teamName: name });
        if (response.status === 200) {
          console.log(response.data.message); // Log the message returned from the server
          if(response.data.message === "Team already exists"){
            failed('Team already exists')
          }else{
            setTeamName(name);
            console.log(teamName);
            navigator('/pin')
          }
        }
      } catch (error) {

        console.error(error); // Log any errors that occur during the request
      }
    }


  return (
    <div className='flex flex-col justify-center items-center gap-7 bg-color-gradient h-screen'>
      <h1 className='text-4xl lg:text-8xl text-white font-bold'>Enter Team Name</h1>
        <input onChange={(e) => {setTeamName(e.target.value); console.log(teamName)}} className='w-1/3 p-3 rounded-lg w-1/2 sm:w-4/5 lg:w-1/3' placeholder='Team Name' type="text"/>
      <div className='flex flex-row justify-center w-1/2 sm:w-4/5 lg:w-1/3 gap-2'>
        <button onClick={() => {navigator('/')}} className='px-20 py-3 rounded-full text-[#fff] bg-gradient-to-br shadow-lg from-[#5EFCE8] to-[#736EFE] hover:-translate-x-2 transition active:scale-[0.97] active:opacity-90 font-semibold text-xl'><FaArrowLeft /></button>
        <button onClick={() => {validateTeam(teamName)}} className='px-20 py-3 rounded-full text-[#fff] bg-gradient-to-br shadow-lg from-[#5EFCE8] to-[#736EFE] hover:translate-x-2 transition active:scale-[0.97] active:opacity-90 font-semibold text-xl'><FaArrowRight/></button>
      </div>
      <ToastContainer/>
    </div>
    
  )
}

export default TeamPage
