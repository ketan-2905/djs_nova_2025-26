"use client"; // Required if using Next.js 13+ app directory

import { useEffect, useState } from "react";

const IntroOverlay = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Total time = typing duration + pause before fade
    const timer = setTimeout(() => setShow(false), 3500); // 3.5s typing + extra pause
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="overlay">
      <div className="typewriter">
        <h1>Chaos in calm....</h1>
      </div>
    </div>
  );
};

export default IntroOverlay;
