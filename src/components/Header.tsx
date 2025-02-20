import React from "react";
import styled from "styled-components";
import { HeaderProps } from "../types/weather";
import ToggleButton from "./ToggleButton";
import { HeaderContainer } from "../styles/containers";

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 800;
  color:${({ theme }) => theme.colors.text};
  text-align: center;
  letter-spacing: 1.5px;
  text-transform: uppercase;

  position: absolute;
  left: calc(400px + 50% - 200px);
  transform: translateX(-50%);

  @media (max-width: 1500px) {
  font-size: 2rem}

    @media (max-width: 1300px) {
  font-size: 1.5rem}

  @media (max-width: 1024px) {
  left: 50%;}
  
  @media (max-width: 768px) {
  position: relative;
  width: 100%;
  text-align: center;
  height: 50%;
  font-size: 1.5rem;}

  
    
  ;
`;

function Header(props: HeaderProps){

    return (
        <header>
            <HeaderContainer>
                <Title>Weather Forecast App</Title>
                <ToggleButton option1="°C" option2="°F" clicked={props.clicked}/>
            </HeaderContainer>
        </header>
    );


}

export default Header