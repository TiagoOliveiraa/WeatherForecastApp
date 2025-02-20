import React, { useEffect, useState } from 'react';
import './App.css';
import getForecastData, { getWeatherData, translateToCoords } from './service/api';
import { ForecastInfoCity, ForecastInfoList, WeatherResponseData } from './types/weather';
import InputArea from './components/InputArea';
import CurrentDayCard from './components/CurrentDayCard';
import WeatherForecastRow from './components/WeatherForecastRow';
import TemperatureDifferenceChart from './components/TemperatureDifferenceChart';
import TemperatureMap from './components/TemperatureMap';
import { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import WeekHour from './components/WeekHour';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { AppContainer, ChartContainer, CurrentDayContainer, DataCardContainer, DataContainer, MapContainer } from './styles/containers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Libraries, LoadScript } from "@react-google-maps/api";

const libraries: Libraries = ["visualization"];


function App() {

  const [location, setLocation] = useState<string>("")
  const [lastValidLocation, setLastValidLocation] = useState<string>("")
  const [forecastInfo, setForecastInfo] = useState<ForecastInfoList[]>([])
  const [currentDayInfo, setCurrentDayInfo] = useState<WeatherResponseData | null>(null)
  const [cityInfo, setCityInfo] = useState<ForecastInfoCity>()
  const [unit, setUnit] = useState<string>("°C")
  const [loading, setLoading] = useState<boolean>(false);



  function updateForecastInfo(data: ForecastInfoList[]){
    setForecastInfo(data)
  }
  function updateCityInfo(data: ForecastInfoCity){
    setCityInfo(data)
  }
  function updateLocation(location: string){
    setLocation(location)
  }
  function updateLastLocation(location: string) {
    setLastValidLocation(location)
  }
  function updateCurrentDay(data: WeatherResponseData){
    setCurrentDayInfo(data);
  }
  function changeUnit(unit: string){
    setUnit(unit)
  }

  async function fetchFromApi(location: string, unit: string){
    setLoading(true);

    const coordinates = await translateToCoords(location)
    if("error" in coordinates) {
      toast.error(coordinates.error);
      setLoading(false);
      if(lastValidLocation != ""){
        updateLocation(lastValidLocation)
      }else{
        return;
      }
    }

    if (!Array.isArray(coordinates) || coordinates.length === 0) {
      setLoading(false);
      return;
    }
    

    const weatherInfo = await getForecastData({lat: coordinates[0].lat, lng: coordinates[0].lon}, unit)
    if ("error" in weatherInfo) {
      toast.error(weatherInfo.error);
      setLoading(false);
      return;
    }

    const currentDay = await getWeatherData({lat: coordinates[0].lat, lng: coordinates[0].lon}, unit)
    if ("error" in currentDay) {
      toast.error(currentDay.error);
      setLoading(false);
      return;
    }

    updateForecastInfo(weatherInfo.list)
    updateCityInfo(weatherInfo.city)
    updateCurrentDay(currentDay)
    updateLastLocation(location)
    setLoading(false)
  }

  useEffect(() => {
    location && fetchFromApi(location, unit);
  }, [location, unit])

  return (
    <ThemeProvider theme={theme}>
      <>
      <ToastContainer position='top-right' autoClose={3000}/>
      <GlobalStyle/>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""} libraries={libraries}></LoadScript>
        <Header clicked={changeUnit}/>
        <AppContainer>
          <CurrentDayContainer>
          <InputArea clicked={updateLocation}/>
          <WeekHour weatherInfo={currentDayInfo}/>
            {!loading && currentDayInfo? <CurrentDayCard weatherInfo = {currentDayInfo} unit={unit}/> : null}
          </CurrentDayContainer>
          <DataContainer>
            {!loading && (
              <>
              <DataCardContainer>
                {forecastInfo && <WeatherForecastRow forecastInfo={forecastInfo} unit={unit}/>}
              </DataCardContainer>
              <ChartContainer>
                {forecastInfo && <TemperatureDifferenceChart forecastInfo={forecastInfo} unit={unit}/>}
              </ChartContainer>
              <MapContainer>
                {(currentDayInfo && cityInfo) && <TemperatureMap cityInfo={cityInfo} currentDayInfo={currentDayInfo} unit={unit}/>}
              </MapContainer>
              </>
            )}
          </DataContainer>
          </AppContainer>
      </>
    </ThemeProvider>
  );
}



export default App;
