"use client";

import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { useWeatherHook } from "@/context/WeatherContext";
import { Skeleton } from "./ui/skeleton";
import { cityTime } from "@/lib/utils";

const CurrentWeather = () => {
  const { currentData, curLoading } = useWeatherHook();

  if (!currentData) {
    return (
      <section className="glass flex min-h-[340px] flex-col gap-4 rounded-3xl p-6">
        {curLoading ? (
          <>
            <Skeleton className="h-4 w-12 bg-ink/10" />
            <Skeleton className="h-24 w-40 bg-ink/10" />
            <Skeleton className="h-5 w-32 bg-ink/10" />
            <Skeleton className="mt-auto h-12 w-full bg-ink/10" />
          </>
        ) : (
          <p className="m-auto text-ink/60">Couldn&apos;t load the weather.</p>
        )}
      </section>
    );
  }

  const { main, weather, name, sys, dt, timezone } = currentData;

  return (
    <section
      aria-live="polite"
      className={`glass flex flex-col rounded-3xl p-6 transition-opacity ${curLoading ? "opacity-60" : ""}`}
    >
      <p className="text-xs font-bold uppercase tracking-wider text-ink/55">Now</p>

      <div className="flex items-center justify-between gap-2">
        <p className="text-[5.5rem] font-light leading-none tracking-tight tabular-nums">
          {Math.round(main.temp)}
          <span className="align-top text-4xl font-normal text-ink/50">°C</span>
        </p>
        <Image
          src={`/icons/${weather[0].icon}.svg`}
          alt=""
          width={140}
          height={140}
          priority
          className="-mr-4 size-36"
        />
      </div>

      <p className="text-xl font-bold capitalize">{weather[0].description}</p>
      <p className="mt-1 text-sm text-ink/60 tabular-nums">
        H {Math.round(main.temp_max)}° · L {Math.round(main.temp_min)}° · Feels{" "}
        {Math.round(main.feels_like)}°
      </p>

      <div className="mt-6 flex flex-col gap-2.5 border-t border-ink/10 pt-5 text-sm">
        <p className="flex items-center gap-2.5">
          <CalendarDays className="size-4 text-ink/50" />
          {cityTime(dt, timezone, { weekday: "long", day: "numeric", month: "short" })}
        </p>
        <p className="flex items-center gap-2.5">
          <MapPin className="size-4 text-ink/50" />
          {name}, {sys.country}
        </p>
      </div>
    </section>
  );
};

export default CurrentWeather;
