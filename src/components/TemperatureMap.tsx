import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { CoordMaps, TemperatureMapProps } from "../types/weather";

const mapContainerStyle = {
  width: "80%",
  minWidth: "300px",
  height: "100%",
  minHeight: "300px",
  borderRadius: "20px",
};


function TemperatureMap(props: TemperatureMapProps) {

    const [center, setMapCenter] = useState<CoordMaps>({lat: 0, lng:0})
    const [map, setMap] = useState<google.maps.Map | null>(null);

    useEffect(() => {
        setMapCenter({lat: props.cityInfo.coord.lat, lng:props.cityInfo.coord.lon})
    }, [props.cityInfo])

    useEffect(() => {
      if (map) {
        const openWeatherLayer = new google.maps.ImageMapType({
          getTileUrl: function (coord, zoom) {
            const x = coord.x;
            const y = coord.y;
            const z = zoom;
            return `https://tile.openweathermap.org/map/temp_new/${z}/${x}/${y}.png?appid=1dfa222c493b8e999282202df8fdfe4d`;
          },
          tileSize: new google.maps.Size(256, 256),
          opacity: 0.7,
        });
  
        map.overlayMapTypes.push(openWeatherLayer);
      }
    }, [map]);

    

    return (
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            onLoad={(loadedMap) => {
              setMap(loadedMap);
            }
            }
          >
            {props.currentDayInfo && (
              <Marker
                position={center}
                label={{
                  text: props.currentDayInfo.main.temp ? `${Math.floor(props.currentDayInfo.main.temp)}${props.unit}` : "",
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "white",
                }}
              />
            )}
          </GoogleMap>
      );
}

export default TemperatureMap;
