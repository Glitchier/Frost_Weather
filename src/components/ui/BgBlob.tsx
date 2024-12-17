"use client";

import React from "react";

const BgBlob = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 right-0 bg-cover bg-center pointer-events-none">
      <div className="bg-blobColor1 animate-blob h-[90vh] w-[90vh] rounded-full absolute mix-blend-multiply filter blur-3xl -bottom-1/3 left-[30%]"></div>
      <div className="bg-blobColor2 animate-blob h-[90vh] w-[90vh] rounded-full absolute mix-blend-multiply filter blur-3xl top-[5%] left-[1%] animation-delay-2000"></div>
      <div className="bg-blobColor3 animate-blob h-[90vh] w-[90vh] rounded-full absolute mix-blend-multiply filter blur-3xl -top-[5%] right-[5%] animation-delay-4000"></div>
    </div>
  );
};

export default BgBlob;
