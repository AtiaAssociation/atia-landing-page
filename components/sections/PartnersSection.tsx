// components/sections/partners.tsx
"use client"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { motion } from "framer-motion"
import { StaggerItem } from "@/components/animations/stagger-item"

export function PartnersSection() {
  const partners = [
    { name: "INFACTORY", logo: "/api/placeholder/120/60" },
    { name: "GARAGE", logo: "/api/placeholder/120/60" },
    { name: "Université de Carthage", logo: "/api/placeholder/120/60" },
    { name: "CERT", logo: "/api/placeholder/120/60" },
    { name: "Partner 5", logo: "/api/placeholder/120/60" },
  ]

  return (
    <section id="partners" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Partenaires
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-blue-600 mx-auto"></div>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {partners.map((partner, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 min-h-[100px]"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-sm">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{partner.name}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.5}>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Rejoignez notre réseau de partenaires pour développer l'IA en Tunisie
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow duration-300"
            >
              Devenir Partenaire
            </motion.button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}