"use client";

import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";
import Highlights from "@/components/Highlights";
import HourlyData from "@/components/HourlyData";
import MainWrapper from "@/components/MainWrapper";
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
      <div className="min-w-[360px]">
        <BgBlob />
        <WeatherProvider>
          <Navbar />
          <MainWrapper>
            <CurrentWeather />
            <Highlights />
            <Forecast />
            <HourlyData />
          </MainWrapper>
        </WeatherProvider>
      </div>
    </ThemeProvider>
  );
};

export default Home;
