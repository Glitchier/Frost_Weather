import { useWeatherHook } from "@/context/WeatherContext";
import Image from "next/image";
import Loader from "./ui/Loader";

const Forecast = () => {
  const { fiveDaysData, FiveDaysLoading } = useWeatherHook();

  const fiveDateFun = (i: number) => {
    if (fiveDaysData !== undefined) {
      const timestampInSeconds = fiveDaysData[i].dt;
      const timestampInMilliseconds = timestampInSeconds * 1000;
      const date = new Date(timestampInMilliseconds);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      return formattedDate;
    }
    return "";
  };
  const fiveDayFun = (i: number) => {
    if (fiveDaysData !== undefined) {
      const timestampInSeconds = fiveDaysData[i].dt;
      const timestampInMilliseconds = timestampInSeconds * 1000;
      const date = new Date(timestampInMilliseconds);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
      });
      return formattedDate;
    }
    return "";
  };

  return (
    <section className="bg-glassBgColor border border-glassBorderColor backdrop-blur-3xl rounded-3xl p-4 pt-6 h-full w-full flex flex-col items-start justify-center gap-8">
      {!FiveDaysLoading && fiveDaysData !== undefined ? (
        <>
          <p className="ml-4 text-lg">5 Days Forecast</p>
          <div className="flex flex-col justify-center items-stretch w-full divide-y divide-glassBgColor pb-2">
            {/* mapping 5 day forecast */}

            {fiveDaysData.map((data, i) => (
              <div
                className="grid grid-cols-[1fr_1fr_2fr] justify-center items-center gap-4 pt-2"
                key={i}
              >
                <Image
                  src={`/icons/${data.weather[0].icon}.svg`}
                  alt="img"
                  height={0}
                  width={0}
                  priority={false}
                  className="h-full w-auto max-h-[56px] ml-2"
                />
                <p className="text-center">{fiveDateFun(i)}</p>
                <p className="pr-4  text-end">
                  {i === 0 ? "Tomorrow" : fiveDayFun(i)}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Forecast;
