import AboutUs from "@/components/AboutUs";
import AstroPhotography from "@/components/AstroPhotography";
import HeroComponent from "@/components/HeroComponent";
import RevolvingCarousel from "@/components/RevolvingCarousel";
import Image from "next/image";

interface ImageData {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
  url: string;
}

const images: ImageData[] = [
  {
    id: 1,
    src: "/astro1.png",
    alt: "Galaxy Nebula",
    title: "GALAXY NEBULA",
    description:
      "A stunning view of distant galaxy formations and cosmic dust clouds in the deep space.",
    url: "#",
  },
  {
    id: 2,
    src: "/astro2.png",
    alt: "The Sunset",
    title: "THE SUNSET",
    description:
      "Beautiful sunset with cosmic alignment showing the perfect blend of earthly and celestial beauty.",
    url: "#",
  },
  {
    id: 3,
    src: "/astro3.png",
    alt: "Milky Way",
    title: "MILKY WAY",
    description:
      "The core of our home galaxy captured with long exposure techniques from a dark sky location.",
    url: "#",
  },
  {
    id: 4,
    src: "/astro4.png",
    alt: "Northern Lights",
    title: "AURORA BOREALIS",
    description:
      "Colorful aurora dancing in the polar skies with stars visible in the background.",
    url: "#",
  },
  {
    id: 5,
    src: "/astro5.png",
    alt: "Lunar Eclipse",
    title: "LUNAR ECLIPSE",
    description:
      "The blood moon during total lunar eclipse with detailed crater visibility.",
    url: "#",
  },
  {
    id: 6,
    src: "/astro6.png",
    alt: "Star Cluster",
    title: "STAR CLUSTER",
    description:
      "Dense collection of stars in a globular cluster millions of light years away.",
    url: "#",
  },
  {
    id: 7,
    src: "/astro7.jpg",
    alt: "Solar Flare",
    title: "SOLAR FLARE",
    description: "Massive solar flare eruption from the surface of our sun.",
    url: "#",
  },
];

export default function Home() {
  return (
    <>
      <HeroComponent />
      <AboutUs />
      <AstroPhotography />
      <div className=" text-white min-h-screen flex items-center justify-center">
        <RevolvingCarousel images={images} />
      </div>
    </>
  );
}
