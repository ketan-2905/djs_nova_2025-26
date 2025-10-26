import React from "react";
import EarthMoonScene from "./ThreeDComponent";
import TiltedSolarSystem from "./ThreeDSolarSystem";
import SolarSystem from "./ThreeDSolarSystem";

// const HeroComponent = () => {
//   return (
//     <div className="mt-20 min-h-[calc(100vh-80px)] flex tracking-[0.25em]">
//       <div className="w-1/2 flex justify-center px-16 flex-col">
//         <h1 className="text-6xl">DJS NOVA</h1>
//         <div className="text-2xl flex flex-col">
//           <span>The official</span>
//           <span>Astronomy</span>
//           <span>and Astrophysics</span>
//           <span>club of DJSCE.</span>
//         </div>
//       </div>
//       <div className="w-1/2 h-[calc(100vh-80px)] relative">
//         {/* <EarthMoonScene /> */}
//         {/* <TiltedSolarSystem /> */}
//         {/* <SolarSystem /> */}
//       </div>
//     </div>
//   );
// };

const HeroComponent = () => {
  return (
<div className="relative h-screen flex tracking-[0.25em] bg-[url('/bg/earth_bg.png')] bg-cover bg-center flex-col items-center justify-center">
  {/* Text content */}
  <h1 className="text-8xl text-white">DJS NOVA</h1>
  <h3 className="text-4xl mb-[250px] text-white">
    The Official Astronomy & Astrophysics Club, DJSCE
  </h3>

  {/* Bottom blending overlay */}
  <div className="absolute -bottom-10 left-0 w-full h-[200px] bg-gradient-to-t from-black/80 via-black/60 to-transparent blur-md"></div>
</div>

  );
};

export default HeroComponent;
