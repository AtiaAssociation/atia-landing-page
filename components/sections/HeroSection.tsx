// components/sections/hero.tsx
"use client"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                L'Association Tunisienne
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600">
                  pour l'Intelligence Artificielle
                </span>
              </h1>
            </FadeIn>

            <SlideIn delay={0.4}>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                ATIA est une association à but non lucratif, fondée en 2009 par le Pr Khaled GHEDIRA. 
                Elle a pour mission de promouvoir la recherche et le développement de l'intelligence artificielle.
              </p>
            </SlideIn>

            <SlideIn delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg">
                  Découvrir l'ATIA
                </Button>
                <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg">
                  Voir nos événements
                </Button>
              </div>
            </SlideIn>

            <SlideIn delay={0.8}>
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">300+</div>
                  <div className="text-sm text-gray-600">Thèses de doctorat</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">1500+</div>
                  <div className="text-sm text-gray-600">Articles scientifiques</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">15+</div>
                  <div className="text-sm text-gray-600">Années d'expérience</div>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* Right content - Interactive Map/Visual */}
          <div className="relative">
            <FadeIn delay={1.0}>
              <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden">
                {/* Tunisia Map Representation */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="relative w-64 h-80"
                  >
                    {/* Simplified Tunisia shape */}
                    <svg viewBox="0 0 200 300" className="w-full h-full">
                      <path
                        d="M100 50 C120 60, 140 80, 150 120 L160 180 C160 200, 150 220, 140 240 L120 260 C100 270, 80 270, 60 260 L40 240 C30 220, 30 200, 40 180 L50 120 C60 80, 80 60, 100 50 Z"
                        fill="url(#tunisiaGradient)"
                        className="drop-shadow-lg"
                      />
                      <defs>
                        <linearGradient id="tunisiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f97316" />
                          <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Floating AI Icons */}
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          y: [-10, 10, -10],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 3 + i,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                      >
                        <div className="w-4 h-4 bg-gradient-to-br from-orange-400 to-blue-500 rounded-sm"></div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-orange-200 rounded-full"
                  ></motion.div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 bg-blue-200 rounded-full opacity-60"
                  ></motion.div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}