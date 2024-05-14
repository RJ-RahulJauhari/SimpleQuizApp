import React, { useEffect, useState, useRef } from 'react';
import TeamCard from '../Components/TeamCard';
import axios from 'axios';
import Chart from 'chart.js/auto'; // Import Chart.js library
import { BASE_URL } from '../constants/constants';

const Home = () => {
    const [teams, setTeams] = useState([]);

    // Reference to the barchart div
    const chartRef = useRef(null);

    useEffect(() => {
        const getTeams = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/matchAnswers`);
                if (res.data) {
                    console.log(res.data);
                    setTeams(res.data);
                    // Call function to create chart after data is fetched
                    createChart(res.data);
                } else {
                    console.log("Something went wrong!");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getTeams();
    }, []);

    // Function to create the bar chart
    const createChart = (data) => {
        const teamNames = data.map(item => item.teamName);
        const matchedCounts = data.map(item => item.matchedCount);

        const ctx = chartRef.current.getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: teamNames,
                datasets: [{
                    label: 'Matched Count',
                    data: matchedCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    return (
        <div className='w-screen min-h-screen max-h-full bg-color-gradient flex flex-col p-4 items-center'>
            <h1 className='text-4xl lg:text-6xl text-white font-bold'>Admin Panel</h1>
            <div className='flex flex-row justify-center w-5/6 mt-8 '>
                <canvas ref={chartRef}></canvas> {/* Canvas element for Chart.js */}
            </div>
            <div className='flex flex-col justify-center items-center w-full gap-2 mt-4'>
                {teams.map((item, index) => (
                    <TeamCard key={index} teamName={item.teamName} matched={item.matchedCount} />
                ))}
            </div>
        </div>
    );
};

export default Home;