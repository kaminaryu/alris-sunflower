"use client";

import { useEffect, useState } from "react";

export default function Pomodoro() {
    const [startTime, setStartTime] = useState(0);
    const [duration, setDuration] = useState(0);


    useEffect(() => {
        const currentTime: number = Math.floor(Date.now() / 1000);

        localStorage.setItem("startTime", String(currentTime));

        const raw = localStorage.getItem("startTime");
        const startTime = raw ? Number(raw) : null;

        localStorage.removeItem("startTime");
    }, [])


    const getHour = () => {
        const durationInSeconds = Math.floor(duration / 1000);
        const durationInMinutes = Math.floor(duration / 60);
        const durationInHours = Math.floor(duration / 60);

        return durationInHours;
    }

    const addTime = (timeInMinute: number) => {
        const timeInMilliseconds = timeInMinute * 1000 * 60;
        setDuration((d) => d + timeInMilliseconds);
    }


    return (
        <main className="flex flex-col justify-center items-center h-screen w-full gap-8">
            <div className="flex justify-between gap-4">
                <button className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer" onClick={() => addTime(-5)}> -5 </button>

                <p className="text-5xl"> 
                    {`${duration}`}:00<span className="text-xl">.00</span>
                </p>

                <button className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer" onClick={() => addTime(5)}> +5 </button>
            </div>

            <div className="flex justify-between gap-4">
                <button className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer" onClick={() => console.log("asiudhuasdhu")}> Play </button>
                <button className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer"> Pause </button>
                <button className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer"> Reset </button>
            </div>
        </main>
    )
}
