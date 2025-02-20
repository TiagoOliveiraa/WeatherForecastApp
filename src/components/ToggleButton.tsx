import React, { useState } from "react";
import { styled } from "styled-components";
import { TogleButtonProps } from "../types/weather";

const ButtonGroup = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 40px;
  width: 102px;
  height:53px;
  box-shadow: 0px 4px 10px rgb(0,0,0,0.05);
  justify-content: center;
  align-items: center;

  @media (min-width: 769px) {
  position: absolute;
  right: 20px;
  margin-top: 10px;}

  @media (max-width: 768px) {
  position: relative;
  margin-top: 10px;}
  
`;

const Button = styled.label<{$active: boolean}>`
  display: flex;
  width:50px;
  height:50px;
  padding: 20px;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? "#6c757d" : "#f8f9fa")};
  color: ${( {$active} ) => ($active ? '#fff' : '#6c757d')};
  border: none;
  border-radius: 50%;
  text-align: center;
  transition: background-color 0.3s, color 0.3s;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 10px rgb(0,0,0,0.05)
`;

function ToggleButton(props: TogleButtonProps){

    const [option, setActiveOption] = useState(props.option1)

    function handleClick(option: string){
        props.clicked(option)
        setActiveOption(option)
    }

    return (
        <ButtonGroup>
            <Button
            $active={option === props.option1}
            onClick={() => handleClick(props.option1)}
            >{props.option1}</Button>
            <Button
            $active={option === props.option2}
            onClick={() => handleClick(props.option2)}
            >{props.option2}</Button>
        </ButtonGroup>
    );

}

export default ToggleButton