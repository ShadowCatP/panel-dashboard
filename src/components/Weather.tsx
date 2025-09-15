// TODO Weather widget. Background matching current conditions.

import { useQuery } from "@tanstack/react-query";
import { wmoWeatherCodes } from "../types";
import { parseDate } from "../lib/utils";

const getWeather = async () => {
  const data = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=51.1&longitude=17.0333&current=temperature_2m,weather_code,wind_speed_10m",
  );
  const res = await data.json();
  return res;
};

export const Weather = () => {
  const { data } = useQuery({ queryKey: ["weather"], queryFn: getWeather });

  const weatherDescription =
    data?.current.weather_code !== undefined
      ? wmoWeatherCodes[data.current.weather_code] || "Unknown"
      : "";

  return (
    <div className="flex flex-col items-center gap-2 rounded-lg bg-neutral-600 px-8 py-2 text-white">
      <span className="text-2xl font-semibold">
        {data?.current.temperature_2m}
        {data?.current_units.temperature_2m}
      </span>
      <div>{weatherDescription}</div>
      <div>
        {data?.current.wind_speed_10m}
        {data?.current_units.wind_speed_10m}
      </div>
      <div>Last Refresh - {parseDate(new Date(data?.current.time), true)}</div>
    </div>
  );
};
