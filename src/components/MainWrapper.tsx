import React from "react";

interface MainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper: React.FC<MainWrapperProps> = ({ children }) => {
  return (
    <div className="mt-4">
      <div className="tablet:grid tablet:grid-cols-[1fr_2fr] tablet:grid-cols-full flex flex-col items-center gap-4 w-full px-4 sm:px-8 md:px-[4vw] lg:px-[6vw] mb-14 h-fit">
        {children}
      </div>
    </div>
  );
};

export default MainWrapper;
