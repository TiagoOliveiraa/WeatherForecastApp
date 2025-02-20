//API RESPONSE INTERFACES
//COORDINATES API

export interface Coordinate {
    name: string;
    lat: number;
    lon: number;
    country: string;
    [key: string]: any;
  };


export interface CoordMaps {
    lat: number,
    lng: number,
};

export interface Coord {
    lat: number;
    lon: number;
}

//CURRENT WEATHER API

export interface WeatherResponseData {
    coord: Coord;
    main: WeatherMain;
    weather: ForecastInfoWeather[];
    name: string;
    timezone: number;
}

export interface WeatherMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}

//FORECAST API

export interface WeatherResponseInfo {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastInfoList[];
    city: ForecastInfoCity;
}


export interface ForecastInfoMain {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    sea_level: number,
    grnd_level: number,
    humidity: number,
    temp_kf: number,
}

export interface ForecastInfoWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface ForecastInfoList {
    dt: number;
    main: ForecastInfoMain;
    weather: ForecastInfoWeather[];
    clouds: object;
    wind: object;
    visibility: number;
    pop: number;
    sys: object;
    dt_txt: string;
}

export interface ForecastInfoCity {
    id: number;
    name: string;
    coord: Coord;
    country: string
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

//FUNCTION PROPS

export interface WeekHourProps {
    weatherInfo: WeatherResponseData | null;
}

export interface TemperatureMapProps {
    cityInfo: ForecastInfoCity;
    currentDayInfo: WeatherResponseData | null;
    unit: string;
}

export interface HeaderProps {
    clicked: (unit: string) => void;
}

export interface InputAreaProps {
    clicked: (location: string) => void | promise<void>;
}

export interface TemperatureDifferenceChartProps {
    forecastInfo: ForecastInfoList[];
    unit: string;
}

export interface DataCardProps {
    weekday: string;
    tempMax: number;
    tempMin: number;
    unit: string;
    icon: string;
}

export interface CurrentDayCardProps {
    weatherInfo: WeatherResponseData;
    unit: string;
}

export interface WeatherForecastRowProps {
    forecastInfo: ForecastInfoList[],
    unit: string;
}

export interface TogleButtonProps {
    option1: string;
    option2: string;
    clicked: (unit: string) => void;
}

//TEMPERATURE CHART FILES

export interface ChartData {
    [date: string]: {
    weekDay: string;
    temp: number;
    min: number;
    max: number
    }
}

export interface DailyTemps {
    [date: string]: {
    day: string;
    max: number;
    min: number;
    weekday: string;
    icon: string;
    }
}
