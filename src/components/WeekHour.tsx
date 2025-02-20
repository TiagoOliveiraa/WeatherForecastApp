import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WeekHourProps } from "../types/weather";
import { WeekAndTimeContainer } from "../styles/containers";

function WeekHour(props: WeekHourProps){
    const today = new Date().toISOString().split('T')[0];
    const todayDate = new Date(today);
    const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(todayDate);
    const time = new Date().toLocaleDateString();
    const [currentTime, setTime] = useState(time);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(() => {
                return props.weatherInfo ? getTimeFromTimezone(props.weatherInfo.timezone) : new Date().toLocaleTimeString();
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [props.weatherInfo]);

    function getTimeFromTimezone(offsetInSeconds: number) {
        const now = new Date();
        const utcTime = now.getTime() + now.getTimezoneOffset() * 60000; // Converte para UTC
        const targetTime = new Date(utcTime + offsetInSeconds * 1000); // Aplica o offset
        return targetTime.toLocaleTimeString();
    }
    
    function GetCurrentTime() {
        if(props.weatherInfo){
            const newTime = getTimeFromTimezone(props.weatherInfo.timezone);
            setTime(newTime); 
        }else {
            const newTime = new Date().toLocaleTimeString();
            setTime(newTime);
        }
      }

    


    return (
        <WeekAndTimeContainer>
            <p>{dayOfWeek}, {currentTime}</p>
        </WeekAndTimeContainer>
    );
}

export default WeekHour