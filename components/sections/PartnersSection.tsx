"use client"
import { FadeIn } from "@/components/animations/fade-in"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import bank from "@/public/images/partners/bank.png"
import ccft from "@/public/images/partners/ccft.png"
import giz from "@/public/images/partners/giz.png"
import factory from "@/public/images/partners/factory.png"
import startup from "@/public/images/partners/startup.png"
import uni from "@/public/images/partners/uni.png"
import garage from "@/public/images/partners/garage.png"

export function PartnersSection() {
  const partners = [
    { name: "INFACTORY", logo: factory },
    { name: "GARAGE", logo: garage },
    { name: "Université de Carthage", logo: uni },
    { name: "CERT", logo: ccft },
    { name: "Bank", logo: bank },
    { name: "GIZ", logo: giz },
    { name: "STARTUP", logo: startup }
  ]

  // Duplicate partners for seamless loop
  const duplicatedPartners = [...partners, ...partners]
  
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section id="partners" className="py-5 pb-20 overflow-hidden">
      <div className="">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Partenaires
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-blue-600 mx-auto"></div>
          </div>
        </FadeIn>

        {/* Seamless Animated Carousel */}
        <div className="relative">
          <div 
            className="bg-gray-50 py-12 relative overflow-hidden rounded-xl"
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
                repeatType: "loop"
              }}
              style={{
                animationPlayState: isHovered ? 'paused' : 'running'
              }}
              className="flex gap-20 items-center"
            >
              {duplicatedPartners.map((partner, index) => (
                <motion.div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0  relative"
                  whileHover={{ 
                    scale: 1.1,
                    y: -5
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex flex-col items-center justify-center h-full rounded-lg transition-all duration-300">
                    <Image 
                      src={partner.logo} 
                      alt={partner.name}
                      width={300}
                      height={120}
                      className="object-contain"
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
  )
}