const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full gap-6">
      <div className="border-glassBgColor border-2 animate-ping rounded-full ease-in h-8 w-8 flex justify-center items-center">
        <div className="border-glassBgColor border-2 animate-ping rounded-full ease-in h-4 w-4 flex justify-center items-center">
          <div className="bg-glassBgColor animate-ping rounded-full ease-in h-1 w-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
