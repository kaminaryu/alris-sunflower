"use client";

import React, { MouseEventHandler, useEffect, useState } from "react";
import TimerDisplay from "./components/timer_display";
import { Play } from "next/font/google";

enum TimerMode {
    STUDYING,
    RESTING
}

export default function Pomodoro() {
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [studyDuration, setStudyDuration] = useState(25 * 1000 * 60);
    const [restDuration, setRestDuration] = useState(5 * 1000 * 60);

    const [isRunning, setIsRunning] = useState(false);
    const [timerMode, setTimerMode] = useState(TimerMode.STUDYING);

    // on init
    useEffect(() => {
        initTimer();
    }, [])

    // on endTime set
    useEffect(() => {
        if (!isRunning) return;

        const countdownTimerId = setInterval(() => {
            setStudyDuration(Math.max(0, endTime - Date.now()));

            if (Date.now() > endTime) setIsRunning(false);
        }, 500)

        return () => clearInterval(countdownTimerId);
    }, [isRunning])


    const initTimer = (): void => {
        const storedEndTime = localStorage.getItem("endTime");
        const storedIsRunning = localStorage.getItem("isRunning") ?? "false";

        setIsRunning(storedIsRunning == "true");

        if (isRunning) {
            
        }

        if (storedEndTime != null) {
            if (Date.now() > Number(storedEndTime)) return;

            setEndTime(Number(storedEndTime));
            //setTimerTime(Math.max(0, Number(storedEndTime) - Date.now()));
            setIsRunning(storedIsRunning == "true");
        }
    }

    const startTimer = (): void => {
        const calculatedEndTime = Date.now() + studyDuration;
        setStartTime(Date.now());
        setEndTime(calculatedEndTime);
        setIsRunning(true);

        localStorage.setItem("startTime", startTime.toString());
        localStorage.setItem("endTime", calculatedEndTime.toString());
        localStorage.setItem("isRunning", "true");
    }

    const pauseTimer = (): void => {
        setIsRunning(r => r = !r);
    }

    const resetTimer = (): void => {
        setIsRunning(false);
    }


    const updateDuration = (timeInMinute: number) => {
        const timeInMilliseconds = timeInMinute * 1000 * 60;

        if (timerMode == TimerMode.STUDYING) {
            setStudyDuration((d) => Math.max(0, d + timeInMilliseconds));
        }
        else {
            setRestDuration((d) => Math.max(0, d + timeInMilliseconds));
        }
    }


    return (
        <main className="flex flex-col justify-center items-center h-screen w-full gap-8">
            <p> { isRunning ? "isRunning" : "isNotRunning" } </p>

            <div className="flex justify-between gap-4">
                <TimerAdjustmentButton onClick={(t) => updateDuration(t)} timeInMinute={-10}/>
                <TimerAdjustmentButton onClick={(t) => updateDuration(t)} timeInMinute={-5}/>
                <TimerAdjustmentButton onClick={(t) => updateDuration(t)} timeInMinute={-1}/>
                    <TimerDisplay  time={timerMode == TimerMode.STUDYING ? studyDuration : restDuration} />
                <TimerAdjustmentButton onClick={(t) => updateDuration(t)} timeInMinute={1}/>
                <TimerAdjustmentButton onClick={(t) => updateDuration(t)} timeInMinute={5}/>
                <TimerAdjustmentButton onClick={(t) => updateDuration(t)} timeInMinute={10}/>
            </div>

            <TimerDisplay time={5 * 60 * 1000}/>

            <div className="flex justify-between gap-4">
                <button className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer" onClick={startTimer}> Play </button>
                <button className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer" onClick={pauseTimer}> 
                    {
                        isRunning
                            ? "Pause"
                            : "Resume"
                    }
                </button>
                <button className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer" onClick={resetTimer}> Reset </button>
            </div>


            <div className="flex gap-8 bg-gray-500 rounded-xl px-4 py-1">
                <button 
                    className={`w-24 py-1 rounded-xl cursor-pointer ${timerMode == TimerMode.STUDYING ? 'bg-gray-300' : 'bg-gray-400'}`}
                    onClick={() => {setTimerMode(TimerMode.STUDYING)}}
                >
                    Study 
                </button>
                <button 
                    className={`w-24 py-1 rounded-xl cursor-pointer ${timerMode == TimerMode.RESTING ? 'bg-gray-300' : 'bg-gray-400'}`}
                    onClick={() => {setTimerMode(TimerMode.RESTING)}}
                >
                    Rest 
                </button>
            </div>
        </main>
    )
}


type TimerAdjustmentButtonProp = {
    onClick: (timeInMinute: number) => void,
    timeInMinute: number
}

function TimerAdjustmentButton({onClick, timeInMinute}: TimerAdjustmentButtonProp) {
    return (
        <button 
            className="bg-gray-300 px-4 py-2 rounded-xl cursor-pointer"
            onClick={() => onClick(timeInMinute)}
        >
            {timeInMinute < 0
                ? timeInMinute
                : `+${timeInMinute}`}
        </button>
    )
}
