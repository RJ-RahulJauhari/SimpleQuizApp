import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';

const TeamInfo = () => {
    const { teamName } = useParams();
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const getTeam = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/teams/${teamName}`);
                if (res.data && res.data.team) {
                    console.log(res.data.team);
                    setTeam(res.data.team);
                } else {
                    console.log("Team not found");
                }
            } catch (error) {
                console.error("Error fetching team:", error);
            }
        };
        getTeam();
    }, [teamName]);

    return (
        <div className="bg-color-gradient flex flex-col min-h-screen w-full items-center p-4">
            <h1 className='text-3xl lg:text-5xl text-white font-bold'>Team {teamName}</h1>
            <div className="flex flex-col gap-1 mt-3 w-full">
                {team && team.answers && team.answers.length > 0 ? (
                    team.answers.map((item, index) => (
                        <div key={index} className=" flex flex-row justify-between p-2 bg-white rounded-md shadow-md w-full">
                            <p className='font-semibold'>{index+1}</p>
                            <p className='font-semibold'>{item}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No answers found for this team.</p>
                )}
            </div>
        </div>
    );
};

export default TeamInfo;