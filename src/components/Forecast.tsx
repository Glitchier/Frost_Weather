import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { useWeatherHook } from "@/context/WeatherContext";
import { FiveDaysWeatherListDataType } from "@/app/types";
import { Skeleton } from "./ui/skeleton";
import Panel from "./Panel";
import { cityTime } from "@/lib/utils";

type Day = {
  dt: number;
  min: number;
  max: number;
  pop: number;
  icon: string;
  middayGap: number;
};

// Collapse 3-hourly entries into per-day lows/highs, in the city's local time.
const toDays = (list: FiveDaysWeatherListDataType[], tz: number) => {
  const days = new Map<string, Day>();
  for (const e of list) {
    const local = new Date((e.dt + tz) * 1000);
    const key = local.toISOString().slice(0, 10);
    const middayGap = Math.abs(local.getUTCHours() - 12);
    const d = days.get(key);
    if (!d) {
      days.set(key, {
        dt: e.dt,
        min: e.main.temp_min,
        max: e.main.temp_max,
        pop: e.pop,
        icon: e.weather[0].icon,
        middayGap,
      });
      continue;
    }
    d.min = Math.min(d.min, e.main.temp_min);
    d.max = Math.max(d.max, e.main.temp_max);
    d.pop = Math.max(d.pop, e.pop);
    if (middayGap < d.middayGap) {
      d.icon = e.weather[0].icon;
      d.middayGap = middayGap;
    }
  }
  return [...days.values()];
};

const Forecast = () => {
  const { hrsData, currentData } = useWeatherHook();

  if (!hrsData || !currentData) {
    return (
      <Panel title="Forecast" icon={CalendarDays}>
        <div className="mt-4 flex flex-col gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-9 bg-ink/10" />
          ))}
        </div>
      </Panel>
    );
  }

  const tz = currentData.timezone;
  const now = currentData.main.temp;
  const days = toDays(hrsData.list, tz).slice(0, 6);
  days[0].min = Math.min(days[0].min, now);
  days[0].max = Math.max(days[0].max, now);
  const lo = Math.min(...days.map((d) => d.min));
  const span = Math.max(...days.map((d) => d.max)) - lo || 1;
  const pct = (t: number) => ((t - lo) / span) * 100;

  return (
    <Panel title={`${days.length}-day forecast`} icon={CalendarDays} className="flex-1">
      <ul className="mt-2 flex flex-1 flex-col justify-around divide-y divide-ink/10">
        {days.map((d, i) => (
          <li
            key={d.dt}
            className="grid grid-cols-[3.5rem_2.75rem_2rem_1fr_2rem] items-center gap-2 py-2 font-semibold"
          >
            <span>{i === 0 ? "Today" : cityTime(d.dt, tz, { weekday: "short" })}</span>
            <span className="relative flex justify-center">
              <Image
                src={`/icons/${d.icon.replace("n", "d")}.svg`}
                alt=""
                width={44}
                height={44}
                className="size-11"
              />
              {d.pop >= 0.2 && (
                <span className="absolute -bottom-1 text-[10px] font-bold text-sky-600 dark:text-sky-300">
                  {Math.round(d.pop * 100)}%
                </span>
              )}
            </span>
            <span className="text-right tabular-nums text-ink/50">
              {Math.round(d.min)}°
            </span>
            <span className="relative h-1.5 rounded-full bg-ink/10">
              {/* full-width scale, clipped to this day's range so colours stay absolute */}
              <span
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#7286D3] via-[#7ED7C1] to-[#CB80AB]"
                style={{
                  clipPath: `inset(0 ${100 - pct(d.max)}% 0 ${pct(d.min)}% round 999px)`,
                }}
              />
              {i === 0 && (
                <span
                  className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink/20 bg-white shadow"
                  style={{ left: `${pct(now)}%` }}
                />
              )}
            </span>
            <span className="tabular-nums">{Math.round(d.max)}°</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
};

export default Forecast;
