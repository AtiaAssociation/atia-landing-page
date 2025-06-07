// components/sections/hero.tsx
"use client";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { SlideIn } from "@/components/animations/slide-in";
import { motion } from "framer-motion";
import heroSection from "@/public/images/heroSectionImg.png";
import Image from "next/image";
import { CounterAnimation } from "../animations/counter-animation";
import { MdOutlineMail } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

export function HeroSection() {
  return (
    <section  className="relative overflow-hidden ">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div> */}
        {/* <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div> */}
        {/* <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div> */}
      </div>

      <div className=" container py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <FadeIn delay={0.2}>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                L'Association Tunisienne
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary  to-secondary">
                  pour l'Intelligence Artificielle
                </span>
              </h1>
            </FadeIn>

            <SlideIn delay={0.4}>
              <p className=" text-[17px] text-gray-600 leading-relaxed max-w-lg">
                <span className="font-bold">ATIA</span> est une association à
                but non lucratif, fondée en{" "}
                <span className="font-bold">2005</span> par le Prof.
                <span className="font-bold">Khaled GHEDIRA</span>. Elle a pour
                mission de promouvoir la recherche et le développement de
                l'intelligence artificielle.
              </p>
            </SlideIn>

            <SlideIn delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative border py-2 px-3 rounded-md border-gray-300 sm:w-[30vw] ">
                  <MdOutlineMail
                    size={20}
                    className="absolute left-2 top-1/2 tranform -translate-y-1/2 top-0"
                  />
                  <input
                    type="text"
                    placeholder="Entrez votre email"
                    className="pl-7   outline-none  px-5 w-full"
                  />
                </div>
                <Button
                  variant="outline"
                  className=" bg-primary  hover:bg-orange-450 px-8 py-5 text-md text-white hover:text-white flex items-center gap-4 cursor-pointer"
                >
                  Rejoindre la communauté
                  <FaArrowRight size={15} />
                </Button>
              </div>
            </SlideIn>

            <SlideIn delay={0.8}>
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {" "}
                    <CounterAnimation value={300} />+
                  </div>
                  <div className="text-sm text-gray-600">
                    Thèses de doctorat
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">
                    {" "}
                    <CounterAnimation value={1500} />+
                  </div>
                  <div className="text-sm text-gray-600">
                    Articles scientifiques
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {" "}
                    <CounterAnimation value={15} />+
                  </div>
                  <div className="text-sm text-gray-600">
                    Années d'expérience
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>

          {/* Right content - Animated Image Only */}
          <div className="relative">
            <FadeIn delay={1.0}>
              <div className="relative w-full h-96 lg:h-[500px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ 
                      scale: 0.8, 
                      opacity: 0,
                      rotateY: -15,
                      y: 50
                    }}
                    animate={{
                      y: [0, -10, 0],
                      scale: 1,
                      opacity: 1,
                      rotateY: 0
                    }}
                    transition={{
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      y: -10,
                      transition: { duration: 0.4, ease: "easeOut" }
                    }}
                  >
                    <Image 
                      src={heroSection} 
                      alt="ATIA Tunisia Map" 
                      className="drop-shadow-2xl filter brightness-105 contrast-105"
                    />
                  </motion.div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      {/* <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div> */}
    </section>
  );
}