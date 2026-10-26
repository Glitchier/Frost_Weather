import Image from "next/image";
import { Clock } from "lucide-react";
import { useWeatherHook } from "@/context/WeatherContext";
import { Skeleton } from "./ui/skeleton";
import Panel from "./Panel";
import { cityTime } from "@/lib/utils";

const HourlyData = () => {
  const { hrsData, currentData } = useWeatherHook();

  const hours =
    hrsData && currentData
      ? [
          {
            label: "Now",
            icon: currentData.weather[0].icon,
            temp: currentData.main.temp,
            pop: 0,
          },
          ...hrsData.list.slice(0, 8).map((h) => ({
            label: cityTime(h.dt, currentData.timezone, {
              hour: "2-digit",
              minute: "2-digit",
            }),
            icon: h.weather[0].icon,
            temp: h.main.temp,
            pop: h.pop,
          })),
        ]
      : undefined;

  return (
    <Panel title="Today" icon={Clock}>
      <ol className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5">
        {hours
          ? hours.map((h, i) => (
              <li
                key={i}
                className={`flex min-w-[4.5rem] flex-1 flex-col items-center gap-1 rounded-2xl py-3 ${i === 0 ? "glass-inset" : ""}`}
              >
                <span
                  className={`text-xs tabular-nums ${i === 0 ? "font-bold" : "text-ink/60"}`}
                >
                  {h.label}
                </span>
                <Image
                  src={`/icons/${h.icon}.svg`}
                  alt=""
                  width={52}
                  height={52}
                  className="size-[52px]"
                />
                <span className="text-lg font-bold tabular-nums">
                  {Math.round(h.temp)}°
                </span>
                <span className="h-4 text-[11px] font-bold tabular-nums text-sky-600 dark:text-sky-300">
                  {h.pop >= 0.2 && `${Math.round(h.pop * 100)}%`}
                </span>
              </li>
            ))
          : Array.from({ length: 9 }, (_, i) => (
              <li key={i} className="min-w-[4.5rem] flex-1">
                <Skeleton className="h-32 rounded-2xl bg-ink/10" />
              </li>
            ))}
      </ol>
    </Panel>
  );
};

export default HourlyData;
