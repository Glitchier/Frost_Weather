"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { ModeToggle } from "./ModeToggle";
import { useWeatherHook } from "@/context/WeatherContext";
import { toast } from "@/hooks/use-toast";
import { RiMenuSearchLine } from "react-icons/ri";
import { API_CONFIG } from "@/api/config";

type CityListType = {
  country: string;
  lat: number;
  local_names: object;
  lon: number;
  name: string;
  state: string;
};

const Navbar = () => {
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const [searchedCity, setSearchedCity] = useState<string>("");
  const [cityList, setCityList] = useState<CityListType[]>([]);
  const { setCity } = useWeatherHook();

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setCity(searchedCity);
      setCityList([]);
    } catch (error) {
      toast({ description: `Data not found` });
      console.log(error);
    }
  };

  useEffect(() => {
    const onChangeHandler = async () => {
      try {
        const response = await fetch(
          `${API_CONFIG.GEO}/direct?q=${searchedCity}&limit=5&appid=${API_CONFIG.API_KEY}`
        ).then((res) => res.json());
        setCityList(response);
      } catch (error) {
        console.log(error);
      }
    };
    onChangeHandler();
  }, [searchedCity]);

  return (
    <div className="px-4 sm:px-8 md:px-[4vw] lg:px-[6vw] mt-8 flex flex-col justify-center gap-4 mx-auto min-w-[360px]">
      <nav className="flex justify-between rounded-3xl items-center backdrop-blur-3xl gap-4 py-4 bg-glassBgColor border border-glassBorderColor px-6 z-[1]">
        <div className="flex justify-start items-center">
          <Image
            src={"/icons/02d.svg"}
            alt="logo"
            width={0}
            height={0}
            priority={false}
            className="w-auto h-[48px]"
          />
          <p className="text-xl font-Montserrat leading-none">
            <b className="font-Montserrat tracking-widest">Frost</b>
            <br />
            <i className="text-sm font-Montserrat leading-0">Weather</i>
          </p>
        </div>
        <form
          onSubmit={onSubmitHandler}
          className="hidden max-w-sm w-full min-w-14 md:flex justify-center items-center gap-2"
        >
          {cityList.length > 0 && (
            <div className="absolute top-[74%] -ml-12 w-[300px] rounded-b-lg max-w-xs bg-background divide-y-2 line-clamp-1">
              {cityList.map((item, i) => (
                <p
                  key={i}
                  className="w-full px-6 py-3 divide-y-2 hover:bg-popover-foreground hover:text-background cursor-pointer line-clamp-1"
                  onClick={() => {
                    setCity(item.name);
                    setCityList([]);
                  }}
                >
                  {item.name}, {item.country}
                </p>
              ))}
            </div>
          )}
          <input
            placeholder="Search city..."
            className="bg-glassBgColor border border-glassBorderColor backdrop-blur-3xl px-5 py-2 rounded-full w-full outline-none"
            onChange={(e) => setSearchedCity(e.target.value)}
            value={searchedCity}
            required
          />
          <button
            type="submit"
            className="rounded-full bg-glassBgColor border border-glassBorderColor outline-none p-2 backdrop-blur-3xl"
          >
            <CiSearch size={"1.4rem"} />
          </button>
        </form>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchVisible(!searchVisible)}
            className="rounded-full bg-glassBgColor border border-glassBorderColor p-2 md:hidden block"
          >
            {searchVisible ? (
              <IoClose size={"1.4rem"} />
            ) : (
              <RiMenuSearchLine size={"1.4rem"} />
            )}
          </button>
          <ModeToggle />
        </div>
      </nav>
      {searchVisible && (
        <div className="w-full md:hidden flex justify-center items-center gap-3 rounded-3xl bg-glassBgColor border border-glassBorderColor backdrop-blur-3xl p-4 z-[1]">
          <form
            onSubmit={onSubmitHandler}
            className="max-w-sm w-full min-w-14 md:hidden flex justify-center items-center gap-2"
          >
            {cityList.length > 0 && (
              <div className="absolute top-[74%] -ml-12 w-[300px] rounded-b-lg max-w-xs bg-background divide-y-2 line-clamp-1">
                {cityList.map((item, i) => (
                  <p
                    key={i}
                    className="w-full px-6 py-3 divide-y-2 hover:bg-popover-foreground hover:text-background cursor-pointer line-clamp-1"
                    onClick={() => {
                      setCity(item.name);
                      setCityList([]);
                    }}
                  >
                    {item.name}, {item.country}
                  </p>
                ))}
              </div>
            )}
            <input
              placeholder="Search city..."
              className="bg-glassBgColor border border-glassBorderColor backdrop-blur-3xl px-5 py-2 rounded-full w-full outline-none"
              onChange={(e) => setSearchedCity(e.target.value)}
              value={searchedCity}
              required
            />
            <button
              type="submit"
              className="rounded-full bg-glassBgColor border border-glassBorderColor outline-none p-2 backdrop-blur-3xl"
            >
              <CiSearch size={"1.4rem"} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
