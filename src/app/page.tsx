"use client";

import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";
import Highlights from "@/components/Highlights";
import HourlyData from "@/components/HourlyData";
import Navbar from "@/components/Navbar";
import { WeatherProvider } from "@/context/WeatherContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import BgBlob from "@/components/ui/BgBlob";
import { useState, useEffect } from "react";

const Home = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BgBlob />
      <WeatherProvider>
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <Navbar />
          <main className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="flex flex-col gap-4 lg:col-span-4">
              <CurrentWeather />
              <Forecast />
            </div>
            <div className="flex flex-col gap-4 lg:col-span-8">
              <HourlyData />
              <Highlights />
            </div>
          </main>
        </div>
      </WeatherProvider>
    </ThemeProvider>
  );
};

export default Home;
