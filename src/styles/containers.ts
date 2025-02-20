import { styled } from "styled-components";

export const HeaderContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 20px;
background-color: white;
width: 100%;
min-height: 80px;
position: fixed;
top: 0;
left: 0;

@media (max-width: 1024px) {
    position: relative;
}

@media (max-width: 768px) {
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
flex-wrap: wrap;
height: auto;
z-index: 10;}

`;

export const SpaceBetweenContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center
text-align: center;
width: 100%;
max-width: 150px;
margin: 0 auto;
gap: 10px;
`

export const WeekAndTimeContainer = styled.div`
margin-top: 20px;
width: 100%;
text-align: center;
font-size: 20px;
font-weight: 500;
color:rgb(107, 107, 107)
`

export const CurrentDayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background:#FFFFFF;
    padding: 20px;
    width: 100%;
    height: 100%;
    max-width: 400px;
    border-bottom-right-radius: 20px;

    @media (max-width: 1024px) {
    max-width: 300px;}

    @media (max-width: 768px) { /* Mobile */
        width: 100%;
        max-width: none;
        height: auto;
        border-radius: 0;
        box-shadow: none;
    }

`;

export const AppContainer = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
    text-align: center;
    overflow: hidden;

    @media (max-width: 768px) {
    flex-direction: column;
    height: auto;}
`;


export const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

export const DataCardContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 100px;
    gap: 30px;

    @media (max-width: 1024px) {
    gap: 20px;}

    @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;}
`;

export const ChartContainer = styled.div`
    display: flex;
    justify-content: center;
    min-width: 60%;
    min-height: 200px;
    height: auto;
    align-items: center;
    padding: 50px;

    @media (max-width: 768px) {
    min-height: 250px;}
`;

export const MapContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 350px;
    height: 100%;
    margin-bottom: 20px;
    flex-grow: 1;
    position: relative;
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: relative;

form {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
`;

export const DataCardWeekContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    width: 100%;
    margin: 10px;

    @media (max-width: 1024px) {
        gap: 20px;
    }

    @media (max-width: 768px) {
        flex-wrap: nowrap;
        overflow-x: auto;
        justify-content: flex-start;
        padding: 10px 20px;
        scroll-snap-type: x mandatory;
        white-space: nowrap;

        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
        display: none;
        }
    }
`