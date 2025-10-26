import { FC } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SocialLink {
  href: string;
  icon: string;
  alt: string;
}

const socialLinks: SocialLink[] = [
  {
    href: "https://www.instagram.com/djsnova",
    icon: "/logo/instagram.svg",
    alt: "Instagram",
  },
  {
    href: "https://www.linkedin.com/company/djsnova",
    icon: "/logo/linkedin.svg",
    alt: "LinkedIn",
  },
  {
    href: "https://twitter.com/djsnova",
    icon: "/logo/twitter.svg",
    alt: "X",
  },
];

const Footer: FC = () => {
  return (
    <footer className="relative  text-gray-300 py-4 px-4 md:px-20 overflow-hidden tracking-[2.5px]">
      {/* Subtle star background */}
      <div className="absolute inset-0 bg-[url('/bg/stars.png')] bg-cover opacity-30 pointer-events-none"></div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 z-10">
        {/* --- Left Section --- */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo/nova_logo.png"
              alt="DJS NOVA Logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <h2 className="text-2xl font-semibold text-white tracking-wide">
              DJS NOVA
            </h2>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            The official astronomy and astrophysics club of the college.
          </p>

          <div className="flex items-center space-x-4 pt-2">
            {socialLinks.map((link) => (
              <Link
                key={link.alt}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={link.icon}
                  alt={link.alt}
                  width={28}
                  height={28}
                  className="hover:scale-110 transition-transform"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* --- Middle Section --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Discover</h3>
          <ul className="space-y-2">
            {["Team", "Event", "Gallery", "Blog"].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Right Section --- */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Get in touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gray-400 mt-[2px]" />
              <span>
                Dwarkadas J. Sanghvi College of Engineering,
                <br />
                Vile Parle West, Mumbai – 400056
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <Link
                href="mailto:djsnova09@gmail.com"
                className="hover:text-white"
              >
                djsnova09@gmail.com
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>Revati Singh: +91 82916 53370</span>
            </li>
          </ul>
        </div>
      </div>

      {/* --- Footer Bottom --- */}
      <div className="relative z-10 mt-12 text-center text-sm text-gray-500  pt-2">
        <p>Copyright © 2025 DJS NOVA</p>
      </div>
    </footer>
  );
};

export default Footer;
