import React, { useEffect, useState } from 'react'
import PinInput from 'react-pin-input';
import { useNavigate } from 'react-router-dom';
import { pin_val } from '../../constants/images';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PinPage = () => {

    const navigator = useNavigate();
    const [pin,setPin] = useState();

    useEffect(() => {
        console.log(pin)
    },[pin])

    const success = () => {
        toast.success("Valid PIN... You can begin the quiz now!");
    }

    const failed = () => {
        toast.error('Incorrect PIN, try again!!!');
    }

    const validatePin = () => {
        if(pin == pin_val){
            success()
            navigator('/quiz/1');
        }else{
            failed()
        }
    }

  return (
    <div className='bg-color-gradient page'>
        <h1 className='text-4xl lg:text-8xl text-white font-bold'> Enter PIN</h1>
        <PinInput 
            length={6} 
            initialValue=""
            secretDelay={200} 
            onChange={(value, index) => {setPin(value)}} 
            type="numeric" 
            inputMode="number"
            style={{paddingTop: '10px'}}  
            inputStyle={{ backgroundColor:"white", borderColor: 'white', borderWidth:"3px", borderRadius:"5px"}}
            inputFocusStyle={{borderColor: '#0093E9'}}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}/>
        <button onClick={() => {validatePin()}} className='px-20 py-3 rounded-full text-[#fff] bg-gradient-to-br shadow-lg from-[#5EFCE8] to-[#736EFE] hover:translate-y-2 transition active:scale-[0.97] active:opacity-90 font-semibold text-xl'>Submit</button>
        <ToastContainer/>
    </div>
  )
}

export default PinPage
