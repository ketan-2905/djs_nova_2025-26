import React from "react";
import RotatableSphere from "./RotatingSphere";

const OurMisson = () => {
  return (
    <div className=" flex min-h-[400px] justify-between items-center gap-10">
      <div className="w-1/4 h-[400px] relative flex justify-between items-center">
          {/* <RotatableSphere
            textureUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg"
            bumpMapUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg"
            specularMapUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg"
            width={350}
            height={350}
          /> */}
      </div>
      <div className="w-3/4 ">
        <h3 className="text-4xl font-bold tracking-wide mb-3">Our Misson</h3>
        <p className="text-[20px] w-[800px]">
          The mission of DJS NOVA, the official Astronomy and Astrophysics Club
          of DJSCE, is to promote scientific curiosity and awareness in the
          field of space science. We endeavor to provide students with
          opportunities to learn, observe, and research various aspects of
          astronomy and astrophysics. By organizing talks, observations, and
          educational initiatives, we aim to inspire the next generation of
          thinkers and innovators to look beyond the horizon and reach for the
          stars.
        </p>
      </div>
    </div>
  );
};

export default OurMisson;
