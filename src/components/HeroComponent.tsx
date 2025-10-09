import React from "react";
import EarthMoonScene from "./ThreeDComponent";

const HeroComponent = () => {
  return (
    <div className="mt-20 min-h-[calc(100vh-80px)] flex tracking-[0.25em]">
      <div className="w-1/2 flex justify-center px-16 flex-col">
        <h1 className="text-6xl">DJS NOVA</h1>
        <div className="text-2xl flex flex-col">
          <span>The official</span>
          <span>Astronomy</span>
          <span>and Astrophysics</span>
          <span>club of DJSCE.</span>
        </div>
      </div>
      <div className="w-1/2 h-[calc(100vh-80px)] relative">
        {/* <EarthMoonScene /> */}
      </div>
    </div>
  );
};

export default HeroComponent;