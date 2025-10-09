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

"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Camera, Users, CalendarDays, Home, PenTool } from "lucide-react"; // icons
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname();

  const routes = [
    { name: "Home", url: "/", icon: <Home size={18} /> },
    { name: "Astrophotography", url: "/astrophotography", icon: <Camera size={18} /> },
    { name: "Team", url: "/team", icon: <Users size={18} /> },
    { name: "Event", url: "/event", icon: <CalendarDays size={18} /> },
    { name: "Blog", url: "/blog", icon: <PenTool size={18} />, special: true },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4 h-20 text-white">
        {/* Logo Section */}
        <div className="flex items-center gap-3 text-2xl font-light tracking-[0.25em]">
          <Image src="/logo/nova_logo.png" alt="NOVA_LOGO" width={60} height={60} />
          <span className="text-white/90">DJS NOVA</span>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex gap-10 text-lg tracking-[0.2em]">
            {routes.map(({ name, url, special }) => {
              const isActive = pathname === url;

              return (
                <li key={name} className="relative group">
                  <a
                    href={url}
                    className={`
                      flex items-center gap-2 transition-all duration-300 
                      ${isActive ? "text-white" : "text-gray-400 hover:text-white"}
                      ${special ? "text-amber-400 font-semibold" : ""}
                    `}
                  >
                    {name}
                  </a>

                  {/* Active indicator underline */}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 to-white rounded-full"></span>
                  )}

                  {/* Blog special animation */}
                  {special && (
                    <span className="absolute inset-0 animate-pulse blur-[1px] text-amber-400 opacity-50 pointer-events-none">
                      {name}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
