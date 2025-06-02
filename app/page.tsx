import { HeroSection } from "@/components/sections/HeroSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { StatsSection } from "@/components/sections/StatusSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ContactSection } from "@/components/sections/ContactSections";

export default function Home() {
  return (
    <div className="text-black">
      <HeroSection />
      <PartnersSection />
      <AboutSection />
      <StatsSection />
      <EventsSection />
      <TeamSection />
      <ContactSection />
    </div>
  );
}
