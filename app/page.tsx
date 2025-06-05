import { HeroSection } from "@/components/sections/HeroSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { StatsSection } from "@/components/sections/StatusSection";
import { AboutSection } from "@/components/sections/AboutSection";
import TeamSection from "@/components/sections/TeamSection";
import { EventsSection } from "@/components/sections/EventsSection";

import { ScrollToTop } from "@/components/ui/scroll-to-top";
import bgHeroSection from "@/public/images/bgHeroSection.png";
import { ContactSection } from "@/components/sections/ContactSection";


export default function Home() {
  return (
    <div className="">
      {/* bg image for this section using bgHeroSection image */}
      <section
        className="bg-cover bg-center bg-no-repeat z-10"
        style={{ backgroundImage: `url(${bgHeroSection.src})` }}
      >
        <HeroSection />
        <PartnersSection />
      </section>
      <AboutSection />
      <StatsSection />
      <EventsSection />
      <TeamSection />
      <ContactSection />
      <ScrollToTop />
    </div>
  );
}
