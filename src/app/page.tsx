import AboutUs from "@/components/AboutUs";
import AstroPhotography from "@/components/AstroPhotography";
import HeroComponent from "@/components/HeroComponent";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroComponent />
      <AboutUs />
      <AstroPhotography />
    </>
  );
}
