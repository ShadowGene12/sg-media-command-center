import React, { useState } from "react";

export const SGLogo = () => {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return (
      <div className="flex items-center gap-2">
        <div className="bg-violet-600 text-white p-1 rounded-md">
          <span className="font-black tracking-tighter text-sm">SG</span>
        </div>
        <span className="text-white text-xl font-bold tracking-tight">MEDIA</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <img 
        src="/logo.png" 
        alt="SG Media Logo" 
        className="h-8 w-auto object-contain drop-shadow-[0_0_15px_rgba(109,74,230,0.3)]"
        onError={() => setImgFailed(true)}
      />
    </div>
  );
};
