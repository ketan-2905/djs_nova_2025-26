import React from 'react'

const EatSleepRave = () => {
  return (
    <div className="flex justify-center items-center min-h-screen overflow-hidden">
      <div className="relative animate-spin3d">
        {[...Array(16)].map((_, i) => (
          <span
            key={i}
            style={{ "--i": i + 1 }}
            className="absolute text-white text-[3.5em] font-bold uppercase whitespace-nowrap leading-[0.76em] px-2 text-shadow-lg transform-gpu rotate-x-[calc(var(--i)*22.5deg)] translate-z-[109px] bg-gradient-to-r from-black/10 via-black/50 to-transparent"
          >
            <i className="not-italic text-[#5c5fc4]">EAT</i> SLEEP{" "}
            <i className="not-italic text-[#c4c15c]">RAVE</i>
          </span>
        ))}
      </div>
    </div>
  )
}

export default EatSleepRave
