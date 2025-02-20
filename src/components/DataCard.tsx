import React from "react";
import { DataCardProps } from "../types/weather";
import styled from "styled-components";
import { SpaceBetweenContainer } from "../styles/containers";
import { MaxTemperature, MinTemperature } from "../styles/texts";

const Icon = styled.img`
max-height: 100px;
max-width: 100px;`

const DataCardStyle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 45px;
    border-radius: 30px;
    background-color: white;
    box-shadow: 2px 4px 15px rgb(0,0,0,0.2);
    align-items: center;
    justify-content: space-around;
    min-width: 150px;
    max-width: 200px;
    width: 22%;
    min-height: 200px;
    gap: 15px;
    flex: 1;

    @media (max-width: 1024px) {
        width: 30%;
    }

    @media (max-width: 768px) { /* Mobile */
        min-width: 180px;
        max-width: 220px;
        scroll-snap-align: center;
    }

    @media (max-width: 480px) {
        width: 80%;
    }
`;



function DataCard(props: DataCardProps){
    return (
        <DataCardStyle>
            <h2>{props.weekday}</h2>
            <Icon src={`ForecastIcons/${props.icon}.svg`}/>
            <SpaceBetweenContainer>
            <MaxTemperature>{Math.floor(props.tempMax)}{props.unit}</MaxTemperature>
            <MinTemperature>{Math.floor(props.tempMin)}{props.unit}</MinTemperature>
            </SpaceBetweenContainer>
        </DataCardStyle>
    );
}

export default DataCard