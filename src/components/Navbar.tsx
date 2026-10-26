"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { LoaderCircle, LocateFixed, Search } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useWeatherHook } from "@/context/WeatherContext";
import { API_CONFIG } from "@/api/config";

type CityListType = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state?: string;
};

const iconButton =
  "glass relative grid size-11 shrink-0 place-items-center rounded-full transition hover:bg-ink/5 active:scale-95 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [cityList, setCityList] = useState<CityListType[]>([]);
  const [locating, setLocating] = useState(false);
  const { setCity, getLocationData } = useWeatherHook();

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setCityList([]);
      return;
    }
    const id = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_CONFIG.GEO}/direct?q=${encodeURIComponent(q)}&limit=5&appid=${API_CONFIG.API_KEY}`
        ).then((r) => r.json());
        setCityList(Array.isArray(res) ? res : []);
      } catch (error) {
        console.log(error);
      }
    }, 250);
    return () => clearTimeout(id);
  }, [query]);

  const choose = (city: string) => {
    setCity(city);
    setQuery("");
    setCityList([]);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const first = cityList[0];
    if (first) choose(`${first.name},${first.country}`);
    else if (query.trim()) choose(query.trim());
  };

  const locate = async () => {
    setLocating(true);
    await getLocationData();
    setLocating(false);
  };

  return (
    <header className="relative z-10 flex flex-wrap items-center gap-3 py-6 sm:flex-nowrap sm:gap-4">
      <div className="order-1 flex items-center">
        <Image
          src="/icons/02d.svg"
          alt=""
          width={48}
          height={48}
          className="-ml-2 size-12"
        />
        <p className="font-Montserrat text-xl leading-none">
          <b className="font-Montserrat tracking-widest">Frost</b>
          <br />
          <i className="font-Montserrat text-sm">Weather</i>
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="relative order-3 basis-full sm:order-2 sm:mx-auto sm:max-w-md sm:flex-1 sm:basis-auto"
        onKeyDown={(e) => e.key === "Escape" && setCityList([])}
      >
        <Search
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-ink/50"
        />
        <input
          type="search"
          aria-label="Search city"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="glass h-11 w-full rounded-full pl-11 pr-4 outline-none placeholder:text-ink/45 focus-visible:ring-2 focus-visible:ring-ink/20"
        />
        {cityList.length > 0 && (
          <ul className="glass absolute inset-x-0 top-14 overflow-hidden rounded-2xl p-1">
            {cityList.map((c) => (
              <li key={`${c.lat},${c.lon}`}>
                <button
                  type="button"
                  onClick={() => choose(`${c.name},${c.country}`)}
                  className="flex w-full items-baseline justify-between gap-4 rounded-xl px-4 py-2.5 text-left hover:bg-ink/10 focus-visible:bg-ink/10 focus-visible:outline-none"
                >
                  <span className="truncate">
                    {c.name}
                    {c.state && <span className="text-ink/50">, {c.state}</span>}
                  </span>
                  <span className="text-xs font-semibold text-ink/50">
                    {c.country}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>

      <div className="order-2 ml-auto flex gap-2 sm:order-3 sm:ml-0">
        <button
          onClick={locate}
          disabled={locating}
          aria-label="Use my location"
          className={iconButton}
        >
          {locating ? (
            <LoaderCircle className="size-[18px] animate-spin" />
          ) : (
            <LocateFixed className="size-[18px]" />
          )}
        </button>
        <ModeToggle className={iconButton} />
      </div>
    </header>
  );
};

export default Navbar;
