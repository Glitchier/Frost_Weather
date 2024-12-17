export interface CurrentWeatherDataType {
    coord: {
      lon: number;
      lat: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level?: number;
      grnd_level?: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  }

  export interface FiveDaysWeatherListDataType{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }
  

  export interface FiveDaysWeatherDataType {
    cod: string;
    message: number;
    cnt: number;
    list: FiveDaysWeatherListDataType[];
  }
  
  export interface LatLonType {
    lat:number;
    lon:number;
  }

  export type GeoLocationNameType = [
    {
      country: string;
      lat: number;
      lon: number;
      name: string;
      state: string;
      local_name: object;
    }
  ];

  export type AirPolDataListType = {
    components:{
      co: number,
      no: number,
      no2: number,
      o3: number,
      so2: number,
      pm2_5: number,
      pm10: number,
      nh3: number,
  }
  dt:number;
  main:{
    aqi:number
  }
  }

  export type AirPolDataType = {
    coord:{
      lat:number;
      lon:number;
    }
    list:AirPolDataListType[]
  }