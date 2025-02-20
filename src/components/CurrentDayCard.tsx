import React from "react";
import styled from "styled-components";
import { CurrentDayCardProps } from "../types/weather";
import { SpaceBetweenContainer } from "../styles/containers";
import { MaxTemperature, MinTemperature } from "../styles/texts";

const TemperatureTitle = styled.h1`
  font-size: 48px;
  font-weight: 400;
  margin: 10px 0;
`;

const Icon = styled.img`
width: 100%;
height: 100%;`

function CurrentDayCard(props: CurrentDayCardProps){

    return (
      <div>
        <h2>{props.weatherInfo.name}</h2>
        <Icon src={`ForecastIcons/${props.weatherInfo.weather[0].icon}.svg`}/>
        <TemperatureTitle>{Math.floor(props.weatherInfo.main.temp)}{props.unit}</TemperatureTitle>
        <h2>{props.weatherInfo.weather[0].description}</h2>
        <SpaceBetweenContainer>
        <MaxTemperature>{Math.floor(props.weatherInfo.main.temp_max)}{props.unit}</MaxTemperature>
        <MinTemperature>{Math.floor(props.weatherInfo.main.temp_min)}{props.unit}</MinTemperature>
        </SpaceBetweenContainer>
        </div>
    );


}

export default CurrentDayCard