import AQI from "./highlightsComponents/AQI";
import States from "./highlightsComponents/States";
import SunriseSunset from "./highlightsComponents/SunriseSunset";

const Highlights = () => {
  return (
    <section className="bg-glassBgColor flex flex-col justify-center items-start border border-glassBorderColor backdrop-blur-3xl rounded-3xl p-8 h-full w-full space-y-4">
      <h1 className="text-lg">Highlights</h1>
      <div className="grid grid-cols-full md:grid-cols-2 items-center gap-4 h-full w-full">
        <AQI />
        <SunriseSunset />
        <States />
      </div>
    </section>
  );
};

export default Highlights;
