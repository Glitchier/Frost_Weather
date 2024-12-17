"use client";

import { useWeatherHook } from "@/context/WeatherContext";
import Image from "next/image";
import { FaRegCalendar } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import Loader from "./ui/Loader";
import { CiGps } from "react-icons/ci";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const CurrentWeather = () => {
  const { currentData, curLoading, getLocationData } = useWeatherHook();
  const [buttonLoading, setButtonLoading] = useState(false);

  const currentDateFun = () => {
    if (currentData !== undefined) {
      const timestampInSeconds = currentData.dt;
      const date = new Date(timestampInSeconds * 1000);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
    return "";
  };

  const handleLocationClick = async () => {
    setButtonLoading(true);
    try {
      await getLocationData();
    } catch (error) {
      console.error("Failed to fetch location:", error);
      toast({
        title: "Failed to fetch location",
        description: "Unable to fetch your current location. Please try again.",
      });
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <section className="bg-glassBgColor border border-glassBorderColor backdrop-blur-3xl rounded-3xl p-8 w-full h-full">
      {!curLoading && currentData !== undefined ? (
        <div className="flex-col flex justify-center items-start gap-4 w-full h-full">
          <p className="text-lg">Now</p>
          <div className="flex justify-center items-center gap-4 lg:gap-8 mx-auto">
            <p className="text-6xl w-full">
              {Math.round(currentData.main.temp)}
              <span className="align-super text-2xl font-semibold ml-1">
                &deg;C
              </span>
            </p>
            <Image
              src={`/icons/${currentData.weather[0].icon}.svg`}
              width={0}
              height={0}
              alt="icon"
              className="w-auto min-h-[150px] tablet:min-h-[120px] max-h-[150px] h-full"
              priority={false}
            />
          </div>
          <p className="font-semibold text-2xl tracking-widest mx-auto">
            {currentData.weather[0].main}
          </p>
          <div className="w-full h-[2px] bg-glassBgColor"></div>
          <div className="flex justify-center items-center gap-3 mt-2">
            <FaRegCalendar />
            <p>{currentDateFun()}</p>
          </div>
          <div className="flex justify-center items-center gap-3">
            <SlLocationPin />
            <p>
              {currentData.name}, {currentData.sys.country}
            </p>
          </div>
          <button
            onClick={handleLocationClick}
            disabled={buttonLoading}
            className={`rounded-full active:scale-[0.98] group bg-glassBgColor backdrop-blur-3xl px-5 py-3 flex justify-center items-center gap-2 mx-auto mt-4 ${
              buttonLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <CiGps size={"1.5rem"} className="group-hover:animate-pulse" />
            <p className="text-sm tracking-wider font-semibold pr-1">
              {buttonLoading ? "Fetching Location..." : "Current Location"}
            </p>
          </button>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default CurrentWeather;
