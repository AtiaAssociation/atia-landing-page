"use client";
import { FadeIn } from "@/components/animations/fade-in";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import bank from "@/public/images/partners/bank.png";
import ccft from "@/public/images/partners/ccft.png";
import giz from "@/public/images/partners/giz.png";
import factory from "@/public/images/partners/factory.png";
import startup from "@/public/images/partners/startup.png";
import uni from "@/public/images/partners/uni.png";
import garage from "@/public/images/partners/garage.png";

export function PartnersSection() {
  const partners = [
    {
      name: "INFACTORY",
      logo: factory,
      url: "https://novationaccelerator.com/ai-factory/",
      description: "Centre d'innovation et de fabrication numérique",
    },
    {
      name: "GARAGE",
      logo: garage,
      url: "https://novationaccelerator.com/ai-garage/",
      description: "Espace de coworking et d'innovation",
    },
    {
      name: "Université de la Manouba",
      logo: uni,
      url: "https://uma.rnu.tn/",
      description: "Université de la Manouba",
    },
    {
      name: "CERT",
      logo: ccft,
      url: "https://cc-ct.ca/",
      description: "Centre d'études et de recherches en télécommunications",
    },
    {
      name: "AttijariBank",
      logo: bank,
      url: "https://www.attijaribank.com.tn/fr",
      description: "AttijariBank",
    },
    {
      name: "GIZ",
      logo: giz,
      url: "https://tunis.diplo.de/tn-fr/deutschland-und-tunesien/05-WirtschaftlicheZusammenarbeitundEntwicklung/-/2345098",
      description: "Coopération allemande pour le développement",
    },
    {
      name: "STARTUP VILLAGE",
      logo: startup,
      url: "https://www.startupvillage.tn/",
      description: "STARTUP VILLAGE",
    },
  ];

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners];

  const [isHovered, setIsHovered] = useState(false);

  const handlePartnerClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="partners" className="   overflow-hidden">
      <div className="">
        <FadeIn>
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Partenaires
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </div>
        </FadeIn>

        {/* Seamless Animated Carousel */}
        <div className=" relative">
          <div
            className="bg-gray-50 py-10 relative overflow-hidden rounded-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div
              animate={{
                x: [`0%`, `-${50}%`],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              }}
              style={{
                animationPlayState: isHovered ? "paused" : "running",
              }}
              className="flex gap-8 sm:gap-20 items-center"
            >
              {duplicatedPartners.map((partner, index) => (
                <motion.div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0  relative"
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div
                    onClick={() => handlePartnerClick(partner.url)}
                    className="flex flex-col items-center justify-center h-full rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      // width={250}
                      // height={120}
                      className="object-contain w-36 sm:w-44"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-20 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
