import { useWeatherHook } from "@/context/WeatherContext";
import React from "react";
import { MdOutlineWaterDrop } from "react-icons/md";
import Loader from "../ui/Loader";
import { TbGauge } from "react-icons/tb";
import { MdOutlineVisibility } from "react-icons/md";
import { TbTemperatureSun } from "react-icons/tb";

const States = () => {
  const { currentData } = useWeatherHook();

  return (
    <div className="col-span-full flex pb-2 justify-around gap-4 w-full overflow-x-auto overflow-y-hidden">
      {currentData !== undefined ? (
        <>
          <div className="w-full bg-glassBgColor border border-glassBorderColor flex flex-col gap-4 rounded-3xl py-4 px-6">
            <p className="opacity-70 text-sm font-semibold">Humidity</p>
            <div className="flex mb-3 w-full gap-4 justify-center items-center">
              <MdOutlineWaterDrop size={"3rem"} />
              <p className="text-2xl font-semibold text-nowrap">
                {currentData?.main.humidity} %
              </p>
            </div>
          </div>
          <div className="w-full bg-glassBgColor border border-glassBorderColor flex flex-col gap-4 rounded-3xl py-4 px-6">
            <p className="opacity-70 text-sm font-semibold">Pressure</p>
            <div className="flex mb-3 w-full gap-4 justify-center items-center">
              <TbGauge size={"3rem"} />
              <p className="text-2xl font-semibold text-nowrap">
                {currentData?.main.pressure}{" "}
                <span className="text-sm">hPa</span>
              </p>
            </div>
          </div>
          <div className="w-full bg-glassBgColor border border-glassBorderColor flex flex-col gap-4 rounded-3xl py-4 px-6">
            <p className="opacity-70 text-sm font-semibold">Visibility</p>
            <div className="flex mb-3 w-full gap-4 justify-center items-center">
              <MdOutlineVisibility size={"3rem"} />
              <p className="text-2xl font-semibold text-nowrap">
                {(currentData?.visibility / 1000).toFixed(1)}{" "}
                <span className="text-sm">KM</span>
              </p>
            </div>
          </div>
          <div className="w-full bg-glassBgColor border border-glassBorderColor flex flex-col gap-4 rounded-3xl py-4 px-6">
            <p className="opacity-70 text-sm font-semibold">Feels Like</p>
            <div className="flex mb-3 w-full gap-4 justify-center items-center">
              <TbTemperatureSun size={"3rem"} />
              <p className="text-2xl font-semibold text-nowrap">
                {currentData?.main.feels_like.toFixed(0)} °C
              </p>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default States;
