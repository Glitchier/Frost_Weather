import { useWeatherHook } from "@/context/WeatherContext";
import { Loader } from "lucide-react";
import { LuWind } from "react-icons/lu";

const AQI = () => {
  const { airPolData } = useWeatherHook();

  const AQI_Name = [
    "Good",
    "Fair",
    "Moderate",
    "Unhealthy",
    "Very unhealthy",
    "Hazardous",
  ];
  const AQI_Color = [
    "border-AQI_Green/70",
    "border-AQI_Yellow/70",
    "border-AQI_Orange/70",
    "border-AQI_Red/70",
    "border-AQI_Purple/70",
    "border-AQI_Maron/70",
  ];

  return (
    <div className="w-full h-full bg-glassBgColor border border-glassBorderColor rounded-3xl py-4 px-6 flex flex-col items-center gap-8">
      {airPolData !== undefined ? (
        <>
          <div className="w-full flex justify-between items-center gap-4">
            <p className="opacity-70 text-sm font-semibold">
              Air Quality Index
            </p>
            <p
              className={`${
                AQI_Color[
                  airPolData.list[0].components.pm10 <= 50
                    ? 0
                    : airPolData.list[0].components.pm10 <= 100
                    ? 1
                    : airPolData.list[0].components.pm10 <= 150
                    ? 2
                    : airPolData.list[0].components.pm10 <= 200
                    ? 3
                    : airPolData.list[0].components.pm10 <= 300
                    ? 4
                    : 5
                ]
              } px-4 py-1 border-2 rounded-full text-sm tracking-wider font-semibold`}
            >
              {AQI_Name[
                airPolData.list[0].components.pm10 <= 50
                  ? 0
                  : airPolData.list[0].components.pm10 <= 100
                  ? 1
                  : airPolData.list[0].components.pm10 <= 150
                  ? 2
                  : airPolData.list[0].components.pm10 <= 200
                  ? 3
                  : airPolData.list[0].components.pm10 <= 300
                  ? 4
                  : 5
              ] ?? 0}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_2fr] tablet:grid-cols-[1fr_4fr] justify-center items-center gap-4 w-full">
            <div className="flex justify-center items-center">
              <LuWind size={"3rem"} />
            </div>
            <div className="grid grid-cols-2 mb-4 xl:mb-0 xl:grid-cols-4 items-center gap-4 w-full h-full">
              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-xs font-semibold opacity-70">PM2.5</p>
                <p className="text-xl font-semibold">
                  {airPolData?.list[0].components.pm2_5.toFixed(1)}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-xs font-semibold opacity-70">SO2</p>
                <p className="text-xl font-semibold">
                  {airPolData?.list[0].components.so2.toFixed(1)}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-xs font-semibold opacity-70">NO2</p>
                <p className="text-xl font-semibold">
                  {airPolData?.list[0].components.no2.toFixed(1)}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <p className="text-xs font-semibold opacity-70">O3</p>
                <p className="text-xl font-semibold">
                  {airPolData?.list[0].components.o3.toFixed(1)}
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

export default AQI;
