import React, { useContext, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { TeamContext } from '../Context/TeamContext';
import { pictureCount } from '../../constants/images';
import axios from 'axios';
import { BASE_URL } from '../../constants/url';

const QuizPage = () => {
    const navigator = useNavigate();
    const { id } = useParams();
    const questionId = id ? Number(id) : 1;

    const { answers, setAnswers, teamName } = useContext(TeamContext);
    const [cur, setCur] = useState(questionId);
    const [inp, setInp] = useState('');

    const addValueToAnswer = (id, value) => {
        const temp = [...answers];
        const index = temp.findIndex(o => o.id === id);
        if (index !== -1) {
            temp[index] = { id: id, value: value };
        } else {
            temp.push({ id: id, value: value });
        }
        setAnswers(temp);
    };

    const moveToPrev = () => {
        addValueToAnswer(cur, inp);
        const newCur = cur - 1;
        setCur(newCur);
        navigator(`/quiz/${newCur}`);
        const alreadyExists = answers.find(o => o.id === newCur);
        setInp(alreadyExists ? alreadyExists.value : '');
        console.log(answers)
    };

    const moveToNext = () => {
        addValueToAnswer(cur, inp);
        const newCur = cur + 1;
        setCur(newCur);
        navigator(`/quiz/${newCur}`);
        const alreadyExists = answers.find(o => o.id === newCur);
        setInp(alreadyExists ? alreadyExists.value : '');
        console.log(answers)

    };

    const submitResult = async () => {
        // Extracting only the values from the answers array
        addValueToAnswer(cur, inp);
        const valuesArray = answers.map(answer => answer.value);
        console.log(teamName,valuesArray);
        try {
            // Send the values array to the server
            const res = await axios.put(`${BASE_URL}/submitAnswers`, { teamName: teamName, answers: valuesArray });
            console.log(res.data); // Log the response data
            navigator('/finished');
        } catch (error) {
            console.error(error); // Log any errors that occur during the request
        }
    };

    return (
        <div className='page bg-color-gradient py-5 w-full'>
            <div className='h-5/6 w-5/6 flex flex-col gap-2 justify-center items-center'>
                <h1 className='p-3 text-xl rounded-full text-white font-bold'>Question {cur}</h1>
                <img className='w-full rounded-lg max-h-[400px]' src={`../../public/images/${cur}.jpg`} alt="Not Found" />
                <input value={inp} onChange={(e) => setInp(e.target.value.toLowerCase().trim())} type="text" className='w-1/3 p-3 rounded-lg w-full sm:w-4/5 lg:w-1/3' placeholder='Type your answer' />
            </div>
            <div className='flex flex-row flex-wrap justify-center w-1/2 sm:w-4/5 lg:w-1/3 gap-2'>
                <button onClick={moveToPrev} className={`px-20 py-3 rounded-full text-[#fff] bg-gradient-to-br shadow-lg from-[#5EFCE8] to-[#736EFE] hover:-translate-x-2 transition active:scale-[0.97] active:opacity-90 font-semibold text-xl ${cur === 1 ? 'invisible' : ''}`}><FaArrowLeft /></button>
                {cur === pictureCount ? (
                    <button onClick={submitResult} className='px-20 py-3 rounded-full text-[#fff] bg-gradient-to-br shadow-lg from-[#5EFCE8] to-[#736EFE] hover:translate-x-2 transition active:scale-[0.97] active:opacity-90 font-semibold'>Submit</button>
                ) : (
                    <button onClick={moveToNext} className='px-20 py-3 rounded-full text-[#fff] bg-gradient-to-br shadow-lg from-[#5EFCE8] to-[#736EFE] hover:translate-x-2 transition active:scale-[0.97] active:opacity-90 font-semibold text-xl'><FaArrowRight /></button>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
