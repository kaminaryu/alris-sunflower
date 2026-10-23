"use client";

import React, { useEffect, useState } from "react";

export default function Pomodoro() {
    const [endTime, setEndTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    // on init
    useEffect(() => {
        initTimer();
    }, [])

    // on endTime set
    useEffect(() => {
        if (!isRunning) return;

        const countdownTimerId = setInterval(() => {
            setDuration(Math.max(0, endTime - Date.now()));

            if (Date.now() > endTime) setIsRunning(false);
        }, 500)

        return () => clearInterval(countdownTimerId);
    }, [endTime, isRunning])


    function TimerText() {
        const paddedHours: String   = getHours().toString().padStart(2, "0");
        const paddedMinutes: String = getMinutes().toString().padStart(2, "0");
        const paddedSeconds: String = getSeconds().toString().padStart(2, "0");

        return (
            <p className="text-5xl">
                {paddedHours}:{paddedMinutes}<span className="text-3xl">.{paddedSeconds}</span>
            </p>
        )
    }


    const initTimer = (): void => {
        const storedEndTime = localStorage.getItem("endTime");

        if (storedEndTime != null) {
            if (Date.now() > Number(storedEndTime)) return;

            setEndTime(Number(storedEndTime));
            setIsRunning(true);
        }
    }

    const startTimer = (): void => {
        const calculatedEndTime = Date.now() + duration;
        localStorage.setItem("endTime", calculatedEndTime.toString());

        setEndTime(calculatedEndTime);
        setIsRunning(true);
    }


    const getHours = (): number => {
        const durationInSeconds = Math.floor(duration / 1000);
        const durationInMinutes = Math.floor(durationInSeconds / 60);
        const durationInHours = Math.floor(durationInMinutes / 60);

        return durationInHours;
    }
    const getMinutes = (): number => {
        const durationInSeconds = Math.floor(duration / 1000);
        const durationInMinutes = Math.floor(durationInSeconds / 60);
        const durationInMinutesClamped = durationInMinutes % 60;

        return durationInMinutesClamped;
    }
    const getSeconds = (): number => {
        const durationInSeconds = Math.floor(duration / 1000);
        const durationInSecondsClamped = durationInSeconds % 60;

        return durationInSecondsClamped;
    }

    return (
        <main className="flex flex-col justify-center items-center h-screen w-full gap-8">
            <p> { isRunning ? "isRunning" : "isNotRunning" } </p>
            <div className="flex justify-between gap-4">
                <TimerAdjustmentButton setDuration={setDuration} timeInMinute={-10}/>
                <TimerAdjustmentButton setDuration={setDuration} timeInMinute={-5}/>
                <TimerAdjustmentButton setDuration={setDuration} timeInMinute={-1}/>
                                        <TimerText />
                <TimerAdjustmentButton setDuration={setDuration} timeInMinute={1}/>
                <TimerAdjustmentButton setDuration={setDuration} timeInMinute={5}/>
                <TimerAdjustmentButton setDuration={setDuration} timeInMinute={10}/>
            </div>

            <div className="flex justify-between gap-4">
                <button className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer" onClick={() => startTimer()}> Play </button>
                <button className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer"> Pause </button>
                <button className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer"> Reset </button>
            </div>
        </main>
    )
}


type TimerAdjustmentButtonProp = {
    setDuration: React.Dispatch<React.SetStateAction<number>>,
    timeInMinute: number
}


function TimerAdjustmentButton({setDuration, timeInMinute}: TimerAdjustmentButtonProp) {
    const addTime = (timeInMinute: number) => {
        const timeInMilliseconds = timeInMinute * 1000 * 60;
        setDuration((d) => Math.max(0, d + timeInMilliseconds));
    }

    return (
        <button 
            className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer"
            onClick={() => addTime(timeInMinute)}
        >
            {timeInMinute < 0
                ? timeInMinute
                : `+${timeInMinute}`}
        </button>
    )
}
