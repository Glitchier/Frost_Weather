import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  AirPolDataType,
  CurrentWeatherDataType,
  FiveDaysWeatherDataType,
  FiveDaysWeatherListDataType,
} from "@/app/types";
import { API_CONFIG } from "@/api/config";
import { toast } from "@/hooks/use-toast";

export interface WeatherContextType {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  currentData?: CurrentWeatherDataType;
  fetchCurData: () => Promise<void>;
  curLoading: boolean;
  FiveDaysLoading: boolean;
  timezone: string;
  fiveDaysData?: FiveDaysWeatherListDataType[];
  hrsData?: FiveDaysWeatherDataType;
  getLocationData: () => Promise<void>;
  airPolData?: AirPolDataType;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [city, setCity] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("city") ?? "Delhi";
    }
    return "Delhi"; // Default city when SSR
  });

  const [currentData, setCurrentData] = useState<CurrentWeatherDataType>();
  const [airPolData, setAirPolData] = useState<AirPolDataType | undefined>(
    undefined
  );
  const [fiveDaysData, setFiveDaysData] =
    useState<FiveDaysWeatherListDataType[]>();
  const [hrsData, setHrsData] = useState<FiveDaysWeatherDataType>();
  const [curLoading, setCurLoading] = useState<boolean>(true);
  const [FiveDaysLoading, setFiveDaysLoading] = useState<boolean>(true);

  const timezone = new Intl.DateTimeFormat().resolvedOptions().timeZone;

  const fetchCurData = async () => {
    setFiveDaysLoading(true);
    setCurLoading(true); // Start loading
    try {
      const curRes = await fetch(
        `${API_CONFIG.BASE_URL}/weather?q=${city}&units=${API_CONFIG.DEFAULT_PARAMS.units}&appid=${API_CONFIG.API_KEY}`
      ).then((res) => res.json());
      const fiveDaysRes: FiveDaysWeatherDataType = await fetch(
        `${API_CONFIG.BASE_URL}/forecast?q=${city}&units=${API_CONFIG.DEFAULT_PARAMS.units}&appid=${API_CONFIG.API_KEY}`
      ).then((res) => res.json());

      if (curRes && curRes.weather.length > 0) {
        setCurrentData(curRes);
        setHrsData(fiveDaysRes);
        setFiveDaysData(
          fiveDaysRes.list
            .filter(
              (_entry: FiveDaysWeatherListDataType, index: number) =>
                index % 8 === 7
            )
            .slice(0, 5)
        );
        localStorage.setItem("city", city);
      }
    } catch (error) {
      toast({ title: "Data not found" });
      console.log("Failed to fetch weather data:", error);
    } finally {
      setCurLoading(false);
      setFiveDaysLoading(false);
    }
  };

  async function fetchLocation(): Promise<{
    latitude: number;
    longitude: number;
  }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser."));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }

  const getLocationData = async () => {
    try {
      const fetchedLocation = await fetchLocation(); // Fetches coordinates
      await geoLocationName(fetchedLocation);
    } catch (error) {
      console.error("Error fetching location:", (error as Error).message);
      toast({
        title: "Unable to fetch your current location. Please try again.",
      });
    }
  };

  const geoLocationName = async (location: {
    latitude: number;
    longitude: number;
  }) => {
    setFiveDaysLoading(true);
    setCurLoading(true);
    try {
      const response = await fetch(
        `${API_CONFIG.GEO}/reverse?lat=${location.latitude}&lon=${location.longitude}&appid=${API_CONFIG.API_KEY}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setCity(data[0].name);
      } else {
        toast({
          title: "City name not found in the response.",
        });
        console.log("City name not found in the response.");
      }
    } catch (error) {
      toast({ title: "Error fetching city name ", description: `${error}` });
      console.error("Error fetching city name:", error);
    } finally {
      setCurLoading(false);
      setFiveDaysLoading(false);
    }
  };

  const fetchAirPollution = async () => {
    setFiveDaysLoading(true);
    try {
      const geoRes: [{ lat: number; lon: number }] = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_CONFIG.API_KEY}`
      ).then((res) => res.json());

      if (geoRes.length > 0) {
        const { lat, lon } = geoRes[0];
        const airRes = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_CONFIG.API_KEY}`
        ).then((res) => res.json());

        setAirPolData(airRes);
      } else {
        toast({ title: "City not found for air pollution data." });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: `Error fetching air pollution index data: ${error.message}`,
      });
      console.error("Error fetching air pollution data:", error);
    } finally {
      setFiveDaysLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("city", city);
      fetchCurData();
      fetchAirPollution();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCity,
        currentData,
        fetchCurData,
        curLoading,
        FiveDaysLoading,
        timezone,
        fiveDaysData,
        getLocationData,
        airPolData,
        hrsData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherHook = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
