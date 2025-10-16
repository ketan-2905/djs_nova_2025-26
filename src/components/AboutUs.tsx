import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
   <div className="h-screen flex items-center justify-center text-white relative">
  {/* Astronaut Image Section */}
  <div className="group relative">
    <Image
      src="/bg/astronaut.png"
      alt="Astronaut"
      width={500}
      height={500}
      className="
        object-contain select-none pointer-events-none
        transition-transform duration-500 ease-in-out
        group-hover:scale-125 group-hover:-rotate-12
      "
    />

    {/* On hover, overlay layer */}
    <div
      className="
        absolute inset-0 hidden group-hover:flex
        justify-center items-center
        z-50 pointer-events-none
      "
    >
      <Image
        src="/bg/astronaut.png"
        alt="Astronaut Floating"
        width={500}
        height={500}
        className="
          object-contain select-none
          transition-transform duration-500 ease-in-out
          scale-125 -rotate-12
        "
      />
    </div>
  </div>

  {/* Text Section */}
  <div className="w-1/2 px-10 flex flex-col justify-center space-y-4 ml-[200px]">
    <div className="relative tracking-[0.25em] flex flex-col items-start space-y-2 mb-4">
      <p className="text-gray-400 tracking-widest uppercase text-lg">About Us</p>
      <h2 className="w-3/4 text-3xl font-semibold leading-snug">
        Exploring the Universe <br /> One Star at a Time
      </h2>
    </div>
    <div className="w-3/4 tracking-[0.12em]">
      <p className="text-gray-300 leading-relaxed">
        DJS Nova, the official Astronomy and Astrophysics Club of D. J.
        Sanghvi College of Engineering, brings together students with a shared
        passion for the cosmos. The club hosts stargazing events, workshops,
        and expert talks, fostering a collaborative learning environment.
      </p>
      <p className="text-gray-300 leading-relaxed">
        The club also participates in international competitions like NASA
        Space Apps and IAAC, allowing members to apply their knowledge to
        real-world challenges and represent their college globally.
      </p>
    </div>
  </div>
</div>

  );
};

export default AboutUs;
