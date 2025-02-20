import React from "react";
import { WeatherForecastRowProps, DailyTemps } from "../types/weather";
import DataCard from "./DataCard";
import { DataCardWeekContainer } from "../styles/containers";

function WeatherForecastRow(props: WeatherForecastRowProps){

    const dailyTemps: DailyTemps = {}
    const today = new Date().toISOString().split('T')[0];


    if(props.forecastInfo){
        let count = 0
        props.forecastInfo.forEach(item => {
            const dateKey = item.dt_txt.split(" ")[0]
            const dayDate = new Date(dateKey);
            const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(dayDate);
            
    
            if (dateKey !== today){
                if(!dailyTemps[dateKey] && count < 4){
                    dailyTemps[dateKey] = {
                        day: dateKey,
                        max: item.main.temp_max,
                        min: item.main.temp_min,
                        weekday: dayOfWeek,
                        icon: item.weather[0].icon,
                    }
                    count += 1
                }else if(dailyTemps[dateKey]){
                    dailyTemps[dateKey].max = Math.max(dailyTemps[dateKey].max, item.main.temp_max);
                    dailyTemps[dateKey].min = Math.min(dailyTemps[dateKey].min, item.main.temp_min);
                }
            }
        })
            
      }

      return (
        <DataCardWeekContainer>
            {props.forecastInfo && Object.values(dailyTemps).map(( day, index) => {
                return(
                    <DataCard key={index} weekday={day.weekday} tempMax={day.max} tempMin={day.min} unit={props.unit} icon={day.icon}/>
            )}
            )}
        </DataCardWeekContainer>
      );

}

export default WeatherForecastRow