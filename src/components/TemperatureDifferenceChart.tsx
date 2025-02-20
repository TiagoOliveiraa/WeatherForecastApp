import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { ChartData, TemperatureDifferenceChartProps } from "../types/weather";

function TemperatureDifferenceChart(props: TemperatureDifferenceChartProps) {
  
    const chartData: ChartData = {}
    let maxTemp = 0

    if(props.forecastInfo){
        let count = 0
        props.forecastInfo.forEach(item => {
            const dateKey = item.dt_txt.split(" ")[0]
            const dayDate = new Date(dateKey);
            const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(dayDate);
            
    
            if(!chartData[dateKey] && count < 5){
                chartData[dateKey] = {
                    temp: 0,
                    max: item.main.temp_max,
                    min: item.main.temp_min,
                    weekDay: dayOfWeek,
                }
                maxTemp = Math.max(maxTemp, chartData[dateKey].max)
                count += 1
            }else if(chartData[dateKey]){
                chartData[dateKey].max = Math.max(chartData[dateKey].max, item.main.temp_max);
                chartData[dateKey].min = Math.min(chartData[dateKey].min, item.main.temp_min);
                maxTemp = Math.max(maxTemp, chartData[dateKey].max)
            }
        })           
      }

      Object.keys(chartData).forEach((date) => {
        chartData[date].temp = Math.floor((chartData[date].max + chartData[date].min) / 2);
      }); 

      const chartDataArray = Object.keys(chartData).map((date) => ({
        date,
        ...chartData[date],
      }));


    return (
        <ResponsiveContainer width="95%" height={window.innerWidth < 768 ? 150: 200}>
            <LineChart
            width={500}
            height={300}
            data={chartDataArray}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <YAxis domain={['auto', 'auto']} padding={{ top: 40, bottom: 40 }} hide={true}/>
            <XAxis dataKey="weekDay" />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#8884d8">
                <LabelList dataKey="temp" position="top" />
            </Line>
            </LineChart>
        </ResponsiveContainer>
    );
}

export default TemperatureDifferenceChart
