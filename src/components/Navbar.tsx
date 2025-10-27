// import { url } from "inspector";
// import { headers } from "next/headers";
// import React from "react";

// const Navbar = () => {
//   const routes = [
//     { name: "Gallery", url: "/gallery" },
//     { name: "Team", url: "/team" },
//     { name: "Event", url: "/event" },
//     { name: "Blog", url: "/blog" },
//   ];

//   return (
//     <header className="flex justify-between items-center px-8 py-4 h-20 ">
//       <div className="flex items-center justify-between text-2xl tracking-[0.3em]">
//         <img src="logo/nova_logo.png" alt="NOVA_LOGO" width={100} />
//         <span>DJS NOVA</span>
//       </div>
//       <nav>
//         <ul className="flex gap-4 justify-between items-center tracking-[0.3em]">
//           {routes.map((route) => (
//             <li
//               key={route.name}
//               className="hover:text-gray-400 transition-colors duration-200 cursor-pointer text-2xl"
//             >
//               <a href={route.url}>{route.name}</a>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

// "use client";

// import React from "react";
// import { usePathname } from "next/navigation";
// import {
//   Camera,
//   Users,
//   CalendarDays,
//   Home,
//   PenTool,
//   Rocket,
// } from "lucide-react";
// import Image from "next/image";

// const Navbar = () => {
//   const pathname = usePathname();

//   const routes = [
//     { name: "Home", url: "/", icon: <Home size={18} /> },
//     {
//       name: "Astrophotography",
//       url: "/astrophotography",
//       icon: <Camera size={18} />,
//     },
//     { name: "Team", url: "/team", icon: <Users size={18} /> },
//     { name: "Event", url: "/event", icon: <CalendarDays size={18} /> },
//   ];

//   return (
//     <header className="fixed top-0 left-0 w-full z-50 ">
//       {/* 🔮 Parent glass + shadow container */}
//       <div
//         className="
//            relative
//           backdrop-blur-xl
//           bg-white/10
//           text-white text-4xl font-light tracking-widest
//           z-10
//           text-center
//           shadow-[0_0_40px_rgba(255,255,255,0.15)]
//         "
//       >
//         <div
//           className="
//             absolute inset-0 
//             bg-gradient-to-b from-white/20 to-transparent
//             blur-3xl
//             opacity-60
//             -z-10
//           "
//         ></div>

//         {/* Soft halo around glass */}
//         <div
//           className="
//             absolute inset-0 
//             shadow-[0_0_100px_40px_rgba(255,255,255,0.08)]
//             pointer-events-none
//             -z-10
//           "
//         ></div>
//         <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-6 h-14 text-white relative z-10">
//           {/* Logo Section */}
//           <div className="flex items-center gap-3 text-xl font-light tracking-[0.25em]">
//             <Image
//               src="/logo/nova_logo.png"
//               alt="NOVA_LOGO"
//               width={60}
//               height={60}
//               className="drop-shadow-lg"
//             />
//             <span className="text-white/90">DJS NOVA</span>
//           </div>

//           {/* Navigation Links */}
//           <nav>
//             <ul className="flex gap-10 text-[16px] tracking-[0.2em]">
//               {routes.map(({ name, url }) => {
//                 const isActive = pathname === url;

//                 return (
//                   <li key={name} className="relative group">
//                     <a
//                       href={url}
//                       className={`
//                         flex items-center gap-2 transition-all duration-300
//                         ${
//                           isActive
//                             ? "text-white"
//                             : "text-gray-400 hover:text-white"
//                         }
//                       `}
//                     >
//                       {name}
//                     </a>

//                     {/* Active underline */}
//                     {isActive && (
//                       <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 to-white rounded-full"></span>
//                     )}

//                     {/* Blog special animation */}
                  
//                   </li>
//                 );
//               })}
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Camera,
  Users,
  CalendarDays,
  Home,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const routes = [
    { name: "Home", url: "/", icon: <Home size={18} /> },
    {
      name: "Astrophotography",
      url: "/astrophotography",
      icon: <Camera size={18} />,
    },
    { name: "Team", url: "/team", icon: <Users size={18} /> },
    { name: "Event", url: "/event", icon: <CalendarDays size={18} /> },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* 🔮 Parent glass + shadow container */}
      <div
        className="
          relative backdrop-blur-xl bg-white/10
          text-white text-4xl font-light tracking-widest
          z-10 text-center shadow-[0_0_40px_rgba(255,255,255,0.15)]
        "
      >
        {/* Decorative background glows */}
        <div
          className="
            absolute inset-0 bg-gradient-to-b from-white/20 to-transparent
            blur-3xl opacity-60 -z-10
          "
        ></div>
        <div
          className="
            absolute inset-0 shadow-[0_0_100px_40px_rgba(255,255,255,0.08)]
            pointer-events-none -z-10
          "
        ></div>

        {/* Actual navbar content */}
        <div className="max-w-7xl mx-auto flex justify-between items-center py-2 px-6 h-14 text-white relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 text-xl font-light tracking-[0.25em]">
            <Image
              src="/logo/nova_logo.png"
              alt="NOVA_LOGO"
              width={50}
              height={50}
              className="drop-shadow-lg"
            />
            <span className="text-white/90 text-base md:text-lg">
              DJS NOVA
            </span>
          </div>

          {/* 🧭 Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex gap-10 text-[15px] tracking-[0.2em]">
              {routes.map(({ name, url }) => {
                const isActive = pathname === url;

                return (
                  <li key={name} className="relative group">
                    <a
                      href={url}
                      className={`flex items-center gap-2 transition-all duration-300 ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {name}
                    </a>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 to-white rounded-full"></span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 🍔 Hamburger Menu (Mobile) */}
          <button
            onClick={toggleMenu}
            className="md:hidden focus:outline-none z-20"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* 📱 Mobile Menu Overlay */}
        <div
          className={`
            fixed top-14 left-0 w-full 
            backdrop-blur-2xl bg-slate-900/90 border-t border-white/10
            transition-all duration-500 ease-in-out overflow-hidden
            ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <ul className="flex flex-col items-center gap-6 py-6 text-base text-white tracking-[0.2em]">
            {routes.map(({ name, url, icon }) => {
              const isActive = pathname === url;
              return (
                <li key={name}>
                  <a
                    href={url}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2 transition-all duration-300 ${
                      isActive
                        ? "text-amber-400"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <span>{name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
