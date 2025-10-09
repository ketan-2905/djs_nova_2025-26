import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Image Section */}
      {/* <div className="w-1/2 flex justify-center items-center overflow-hidden">
        
      </div> */}
      <div className="transition-transform duration-500 ease-in-out hover:scale-110">
        <Image
          src="/bg/astronaut.png"
          alt="Astronaut"
          width={420}
          height={420}
          className="object-contain select-none pointer-events-none"
        />
      </div>

      {/* Text Section */}
      <div className="w-1/2 px-10 flex flex-col justify-center space-y-4">
        <div className="relative tracking-[0.25em] flex flex-row-reverse">
          <Image
            src="/images/sun.jpg"
            alt="Sun"
            className="rounded-sm"
            width={500}
            height={350}
          />
          <p className="text-gray-400 tracking-widest uppercase text-lg absolute top-1/2 left-[28%] transform -translate-x-1/2 -translate-y-1/2">
            About Us
          </p>
          <h2 className="w-3/4 text-3xl font-semibold leading-snug absolute top-[75%] left-[54%] transform -translate-x-1/2 -translate-y-1/2">
            Exploring the Universe <br /> One Star at a Time
          </h2>
        </div>
        <div className="w-3/4 tracking-[0.12em] ">
          <p className="text-gray-300 leading-relaxed">
            DJS Nova, the official Astronomy and Astrophysics Club of D. J.
            Sanghvi College of Engineering, brings together students with a
            shared passion for the cosmos. The club hosts stargazing events,
            workshops, and expert talks, fostering a collaborative learning
            environment.
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
