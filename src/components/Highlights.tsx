import { ReactNode } from "react";
import {
  Droplets,
  Eye,
  Gauge,
  Leaf,
  LucideIcon,
  Sparkles,
  Sunrise,
  Thermometer,
  Wind,
} from "lucide-react";
import { useWeatherHook } from "@/context/WeatherContext";
import { Skeleton } from "./ui/skeleton";
import Panel from "./Panel";
import { cityTime } from "@/lib/utils";

const AQI_NAMES = ["Good", "Fair", "Moderate", "Poor", "Very poor"];

const Tile = ({
  title,
  icon: Icon,
  className = "",
  children,
}: {
  title: string;
  icon: LucideIcon;
  className?: string;
  children: ReactNode;
}) => (
  <div className={`glass-inset flex min-h-40 flex-col rounded-2xl p-4 ${className}`}>
    <p className="flex items-center gap-1.5 text-xs font-semibold text-ink/55">
      <Icon aria-hidden className="size-3.5" />
      {title}
    </p>
    {children}
  </div>
);

const Big = ({ children, unit }: { children: ReactNode; unit?: string }) => (
  <p className="mt-2 text-3xl font-bold leading-none tabular-nums">
    {children}
    {unit && <span className="ml-1 text-base font-semibold text-ink/50">{unit}</span>}
  </p>
);

const Note = ({ children }: { children: ReactNode }) => (
  <p className="mt-auto pt-3 text-xs leading-snug text-ink/60">{children}</p>
);

// Ring of ticks on a 100x100 viewBox; partial sweeps get a closing tick.
const Ticks = ({ from = 0, sweep = 360, step = 10 }) => (
  <>
    {Array.from({ length: Math.floor(sweep / step) + (sweep < 360 ? 1 : 0) }, (_, i) => (
      <line
        key={i}
        x1="50"
        y1="4"
        x2="50"
        y2={i % 3 === 0 ? 11 : 8}
        stroke="currentColor"
        strokeOpacity={i % 3 === 0 ? 0.5 : 0.2}
        strokeWidth="1.2"
        transform={`rotate(${from + i * step} 50 50)`}
      />
    ))}
  </>
);

const Compass = ({ deg, speed }: { deg: number; speed: number }) => (
  <svg viewBox="0 0 100 100" className="mx-auto mt-1 w-full max-w-32">
    <Ticks />
    {["N", "E", "S", "W"].map((d, i) => (
      <text
        key={d}
        x={[50, 82, 50, 18][i]}
        y={[24, 53.5, 83, 53.5][i]}
        textAnchor="middle"
        fontSize="9"
        fontWeight="700"
        fill="currentColor"
        fillOpacity="0.5"
      >
        {d}
      </text>
    ))}
    {/* wind.deg is where it blows from; arrow points where it goes */}
    <g transform={`rotate(${deg + 180} 50 50)`} className="text-[#7286D3]">
      <line x1="50" y1="20" x2="50" y2="34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="66" x2="50" y2="84" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 12 L55.5 22 L44.5 22 Z" fill="currentColor" />
      <circle cx="50" cy="84" r="3" fill="currentColor" />
    </g>
    <text x="50" y="52" textAnchor="middle" fontSize="15" fontWeight="800" fill="currentColor">
      {speed}
    </text>
    <text x="50" y="61" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor" fillOpacity="0.55">
      km/h
    </text>
  </svg>
);

const PressureGauge = ({ hpa }: { hpa: number }) => {
  const t = Math.min(Math.max((hpa - 960) / 80, 0), 1);
  return (
    <svg viewBox="0 0 100 100" className="mx-auto mt-1 w-full max-w-32">
      <Ticks from={-130} sweep={260} />
      <line
        x1="50"
        y1="2"
        x2="50"
        y2="15"
        stroke="#CB80AB"
        strokeWidth="3.5"
        strokeLinecap="round"
        transform={`rotate(${-130 + t * 260} 50 50)`}
      />
      <text x="50" y="54" textAnchor="middle" fontSize="16" fontWeight="800" fill="currentColor">
        {hpa}
      </text>
      <text x="50" y="64" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor" fillOpacity="0.55">
        hPa
      </text>
    </svg>
  );
};

// Sun's position on a sine arc between sunrise and sunset.
const SunArc = ({ progress }: { progress: number | null }) => {
  const curve = (p: number) => 40 - 32 * Math.sin(Math.PI * p);
  return (
    <svg viewBox="0 0 100 44" className="mt-3 w-full" aria-hidden>
      <path
        d={Array.from({ length: 21 }, (_, i) => `${i ? "L" : "M"}${i * 5} ${curve(i / 20)}`).join(" ")}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
      <line x1="0" y1="40" x2="100" y2="40" stroke="currentColor" strokeOpacity="0.2" />
      {progress !== null && (
        <circle cx={100 * progress} cy={curve(progress)} r="4.5" fill="#f5b041" />
      )}
    </svg>
  );
};

const Highlights = () => {
  const { currentData, airPolData } = useWeatherHook();

  if (!currentData) {
    return (
      <Panel title="Highlights" icon={Sparkles}>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
          {Array.from({ length: 7 }, (_, i) => (
            <Skeleton
              key={i}
              className={`h-40 rounded-2xl bg-ink/10 ${i === 0 ? "col-span-2 md:col-span-3" : ""}`}
            />
          ))}
        </div>
      </Panel>
    );
  }

  const { main, wind, visibility, sys, timezone } = currentData;
  const air = airPolData?.list[0];
  const clock = (t: number) =>
    cityTime(t, timezone, { hour: "2-digit", minute: "2-digit" });

  const now = Date.now() / 1000;
  const isDay = now >= sys.sunrise && now < sys.sunset;
  const progress = isDay ? (now - sys.sunrise) / (sys.sunset - sys.sunrise) : null;

  // Magnus approximation
  const g = Math.log(main.humidity / 100) + (17.62 * main.temp) / (243.12 + main.temp);
  const dewPoint = (243.12 * g) / (17.62 - g);

  const feelsDiff = main.feels_like - main.temp;
  const km = visibility / 1000;

  return (
    <Panel title="Highlights" icon={Sparkles}>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        <Tile title="Air quality" icon={Leaf} className="col-span-2 min-h-0 md:col-span-3">
          {air ? (
            <div className="mt-2 grid items-center gap-x-8 gap-y-3 sm:grid-cols-[auto_1fr]">
              <Big>
                {AQI_NAMES[air.main.aqi - 1]}
                <span className="ml-2 text-base font-semibold text-ink/50">
                  {air.main.aqi}/5
                </span>
              </Big>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm tabular-nums sm:justify-end">
                {(
                  [
                    ["PM2.5", air.components.pm2_5],
                    ["PM10", air.components.pm10],
                    ["NO₂", air.components.no2],
                    ["O₃", air.components.o3],
                  ] as const
                ).map(([k, v]) => (
                  <span key={k}>
                    <span className="text-ink/50">{k}</span> <b>{v.toFixed(0)}</b>
                  </span>
                ))}
              </div>
              <span className="relative h-1.5 rounded-full bg-gradient-to-r from-[#7ED7C1] via-[#f5d76e] via-40% to-[#CB80AB] sm:col-span-2">
                <span
                  className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink/20 bg-white shadow"
                  style={{ left: `${((air.main.aqi - 1) / 4) * 100}%` }}
                />
              </span>
            </div>
          ) : (
            <Skeleton className="mt-3 h-14 bg-ink/10" />
          )}
        </Tile>

        <Tile title="Wind" icon={Wind}>
          <Compass deg={wind.deg} speed={Math.round(wind.speed * 3.6)} />
        </Tile>

        <Tile title={isDay ? "Sunset" : "Sunrise"} icon={Sunrise}>
          <Big>{clock(isDay ? sys.sunset : sys.sunrise)}</Big>
          <SunArc progress={progress} />
          <Note>
            {isDay ? "Sunrise" : "Sunset"} {clock(isDay ? sys.sunrise : sys.sunset)}
          </Note>
        </Tile>

        <Tile title="Pressure" icon={Gauge}>
          <PressureGauge hpa={main.pressure} />
        </Tile>

        <Tile title="Humidity" icon={Droplets}>
          <Big unit="%">{main.humidity}</Big>
          <Note>Dew point {Math.round(dewPoint)}°</Note>
        </Tile>

        <Tile title="Feels like" icon={Thermometer}>
          <Big>{Math.round(main.feels_like)}°</Big>
          <Note>
            {Math.abs(feelsDiff) < 2
              ? "Close to the actual temperature"
              : feelsDiff < 0
                ? "Wind makes it feel cooler"
                : "Humidity makes it feel warmer"}
          </Note>
        </Tile>

        <Tile title="Visibility" icon={Eye}>
          <Big unit="km">{km >= 10 ? Math.round(km) : km.toFixed(1)}</Big>
          <Note>{km >= 10 ? "Clear view" : "Reduced by haze"}</Note>
        </Tile>
      </div>
    </Panel>
  );
};

export default Highlights;
