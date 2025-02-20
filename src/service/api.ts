import { Coordinate, WeatherResponseInfo, WeatherResponseData, CoordMaps} from "../types/weather";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const WEATHER_API_BASE_URL = "https://api.openweathermap.org"
const GEO_API_BASE_URL = "https://api.openweathermap.org/geo"


async function translateToCoords(location: string){
    try {
        const geoResponse = await fetch(`${GEO_API_BASE_URL}/1.0/direct?q=${location}&appid=${API_KEY}`)
        
        if(!geoResponse.ok) {
            if (geoResponse.status === 401) throw new Error("Invalid API Key.");
            if (geoResponse.status === 404) throw new Error("Location not found.");
            throw new Error("Error fetching coordinates.");
        }
        const coord: Coordinate = await geoResponse.json()
        if(!coord || coord.length === 0){
            throw new Error("No coordinates found for this city. Try a different location.")
        }
        return coord;
    } catch (error: any) {
        console.error("Coordinate API Error:", error.message);
        return { error: error.message };
}
}

async function getForecastData(location: CoordMaps, unit: string){
    try{
        const searchUnit = unit === "°C" ? "metric" : "imperial";
        const weatherResponse = await fetch(`${WEATHER_API_BASE_URL}/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&appid=${API_KEY}&units=${searchUnit}`)
        
        if (!weatherResponse.ok) {
            if (weatherResponse.status === 401) throw new Error("Invalid API Key.");
            if (weatherResponse.status === 404) throw new Error("Forecast data not found.");
            if (weatherResponse.status === 429) throw new Error("Too many requests. Please wait and try again.");
            if (weatherResponse.status >= 500) throw new Error("OpenWeather server error. Please try again later.");
            throw new Error("Unknown error while fetching weather forecast.");
        }
        
        const weatherInfo: WeatherResponseInfo = await weatherResponse.json()
        return weatherInfo
    } catch(error: any) {
        console.error("Weather Forecast API Error:", error.message);
        return { error: error.message };

    }

}

async function getWeatherData(location: CoordMaps, unit: string){
    try{
        const searchUnit = unit === "°C" ? "metric" : "imperial";
        const weatherResponse = await fetch(`${WEATHER_API_BASE_URL}/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${API_KEY}&units=${searchUnit}`)
        
        if (!weatherResponse.ok) {
            if (weatherResponse.status === 401) throw new Error("Invalid API Key.");
            if (weatherResponse.status === 404) throw new Error("Weather data not found.");
            if (weatherResponse.status === 429) throw new Error("Too many requests. Please wait and try again.");
            if (weatherResponse.status >= 500) throw new Error("OpenWeather server error. Please try again later.");
            throw new Error("Unknown error while fetching weather forecast.");
        }
        const weatherData: WeatherResponseData = await weatherResponse.json()
        return weatherData
    } catch(error: any) {
        console.error("Current weather API Error:", error.message);
        return { error: error.message };

    }
}

export default getForecastData
export {getWeatherData, translateToCoords}