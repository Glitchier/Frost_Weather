import { useWeatherHook } from "@/context/WeatherContext";
import Loader from "../ui/Loader";
import { useEffect, useState } from "react";
import { TbSunrise, TbSunset } from "react-icons/tb";

const SunriseSunset = () => {
  const { currentData } = useWeatherHook();
  const [sunriseTime, setSunriseTime] = useState<string | null>(null);
  const [sunsetTime, setSunsetTime] = useState<string | null>(null);

  useEffect(() => {
    if (currentData?.sys) {
      const sunriseDate = new Date(currentData.sys.sunrise * 1000);
      const formattedSunriseTime = sunriseDate.toLocaleTimeString("en-UK", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setSunriseTime(formattedSunriseTime);

      const sunsetDate = new Date(currentData.sys.sunset * 1000);
      const formattedSunsetTime = sunsetDate.toLocaleTimeString("en-UK", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setSunsetTime(formattedSunsetTime);
    }
  }, [currentData]);

  return (
    <div className="w-full h-full bg-glassBgColor flex flex-col gap-4 border border-glassBorderColor rounded-3xl py-4 px-6">
      {currentData !== undefined ? (
        <>
          <p className="opacity-70 text-sm font-semibold">Sunrise & Sunset</p>
          <div className="w-full h-full flex flex-col xl:flex-row justify-center gap-4 xl:gap-12">
            <div className="flex justify-center items-center gap-8 xl:gap-4">
              <TbSunrise size={"2.5rem"} />
              <div className="flex flex-col justify-center gap-1">
                <p className="text-nowrap opacity-70">Sunrise</p>
                <p className="text-nowrap text-xl font-semibold">
                  {sunriseTime}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-8 xl:gap-4">
              <TbSunset size={"2.5rem"} />
              <div className="flex flex-col justify-center gap-1">
                <p className="text-nowrap opacity-70">Sunset</p>
                <p className="text-nowrap text-xl font-semibold">
                  {sunsetTime}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default SunriseSunset;
