import AboutUs from "@/components/AboutUs";
import AstrophotographySection from "@/components/AstrophotographySection";
import HeroComponent from "@/components/HeroComponent";
import MagazineSection from "@/components/MagazineSection";
import OurMisson from "@/components/OurMisson";

export default function Home() {
  return (
    <>
    <div className="h-[350px] w-[150px] bg-[url('/images/astriod.png')]  bg-cover absolute top-[200vh] right-0 z-50 -translate-y-1/2" />
      <HeroComponent />
      <AboutUs />
      <OurMisson />
      <AstrophotographySection />
      <MagazineSection />
    </>
  );
}
