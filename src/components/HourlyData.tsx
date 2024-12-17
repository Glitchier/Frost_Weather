import { Card, CardContent } from "@/components/ui/card";
import { useWeatherHook } from "@/context/WeatherContext";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

import Loader from "./ui/Loader";

const HourlyData = () => {
  const { hrsData } = useWeatherHook();

  return (
    <section className="bg-glassBgColor font-Nunito border flex flex-col justify-center items-start border-glassBorderColor backdrop-blur-3xl rounded-3xl p-8 w-full h-full space-y-4">
      {hrsData !== undefined ? (
        <>
          <h1 className="text-lg">Today&apos;s Temprature</h1>
          <Card className="w-full h-full bg-glassBgColor border-glassBorderColor">
            <CardContent className="h-full w-full pt-6 pl-0">
              <div className="w-full min-h-[200px] h-full">
                <ResponsiveContainer
                  width={"100%"}
                  height={"100%"}
                  minHeight={240}
                >
                  <LineChart
                    data={hrsData.list.slice(0, 8).map((item) => ({
                      time: format(new Date(item.dt * 1000), "ha"),
                      temp: Math.round(item.main.temp),
                      feels_like: Math.round(item.main.feels_like),
                    }))}
                    margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                  >
                    <XAxis
                      dataKey="time"
                      stroke="#888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}°`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg flex flex-col gap-2 bg-glassBgColor border-glassBgColor shadow-md backdrop-blur-3xl border p-4">
                              <div className="flex justify-between items-center gap-2">
                                <span>Temp</span>
                                <span>{payload[0].value}°</span>
                              </div>
                              <div className="flex justify-between items-center gap-2">
                                <span>Feels Like</span>
                                <span>{payload[1].value}°</span>
                              </div>
                            </div>
                          );
                        }
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="temp"
                      stroke="#146cc9"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="feels_like"
                      stroke="#74b1f1"
                      strokeWidth={2}
                      dot={false}
                      strokeDasharray={"5 5"}
                    />
                    <CartesianGrid
                      stroke="#888"
                      strokeDasharray="5 5"
                      className="opacity-30"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default HourlyData;
