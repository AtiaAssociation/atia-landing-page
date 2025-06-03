import React, { useState, useEffect, ReactNode } from "react";
import {
  ChevronRight,
  Sparkles,
  Users,
  Shield,
  Target,
  Slice,
} from "lucide-react";
import statusImg from "@/public/images/statusImg.png";
import Image from "next/image";
import { SlideIn } from "../animations/slide-in";
import { StaggerContainer } from "../animations/stagger-container";
import { delay } from "framer-motion";

interface Props {
  children: ReactNode;
  delay?: number;
}

const FadeIn = ({ children, delay = 0 }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-1000 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {children}
    </div>
  );
};

const FloatingElement = ({ children, delay = 0 }: Props) => {
  return (
    <div
      className="animate-pulse"
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: "3s",
        animationIterationCount: "infinite",
      }}
    >
      {children}
    </div>
  );
};

export default function EngagementSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Shield,
      title: "Éthique",
      description: "Développement responsable",
      delay: 0.6,
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Solutions collectives",
      delay: 0.7,
    },
    {
      icon: Target,
      title: "Impact",
      description: "Résultats durables",
      delay: 0.8,
    },
  ];

  return (
    <div className="relative z-10 ">
      <FadeIn delay={500}>
        <div className="pt-32 pb-20  container  ">
          <div className="grid lg:grid-cols-2 gap-16  items-center ">
            {/* Left Side – Enhanced Text Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                {/* <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200/50 shadow-sm">
                    <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">
                      Intelligence Artificielle
                    </span>
                  </div> */}

                <FadeIn delay={0.4}>
                  <h2 className="text-4xl lg:text-5xl font-black leading-tight">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-b from-orange-600 vi to-blue-600">
                      Engagement pour une IA Responsable
                    </span>
                  </h2>
                </FadeIn>

                <SlideIn delay={0.6}>
                  <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                    Au-delà de la recherche, l'ATIA joue un rôle moteur dans
                    l'appropriation éthique et stratégique de l'intelligence
                    artificielle. Elle veille à aligner ses actions sur les
                    avancées technologiques et les défis socio-économiques
                    actuels, en proposant des solutions pertinentes et durables.
                  </p>
                </SlideIn>
              </div>

              {/* Interactive Features Grid */}
              <div className="grid grid-cols-3 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <SlideIn key={index} delay={feature.delay}>
                      <div
                        key={index}
                        className={`h-full p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 flex flex-col ${
                          hoveredFeature === index
                            ? "ring-2 ring-blue-500/50 bg-white/80"
                            : ""
                        }`}
                        onMouseEnter={() => setHoveredFeature(index)}
                        onMouseLeave={() => setHoveredFeature(null)}
                      >
                        <div className="flex-none">
                          <Icon
                            className={`w-8 h-8 mb-3 transition-colors duration-300 ${
                              hoveredFeature === index
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                          />
                          <h4 className="font-bold text-gray-900 mb-1">
                            {feature.title}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 flex-grow">
                          {feature.description}
                        </p>
                      </div>
                    </SlideIn>
                  );
                })}
              </div>

              {/* Call-to-Action */}
              {/* <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                    <span>Découvrir nos actions</span>
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <button className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold rounded-2xl border border-gray-200/50 hover:bg-white hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                    En savoir plus
                  </button>
                </div> */}
            </div>

            {/* Right Side – Enhanced Visual */}
            <SlideIn delay={0.9} className="overflow-hidden">
              <div className="relative flex justify-center lg:justify-end lg:pr-10 ">
                <div className="relative">
                  {/* Animated Rings */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-[400px] h-[400px] border-2 border-blue-300/30 rounded-full animate-spin"
                      style={{ animationDuration: "20s" }}
                    ></div>
                    <div
                      className="absolute w-[380px] h-[380px] border-2 border-purple-300/30 rounded-full animate-spin"
                      style={{
                        animationDuration: "15s",
                        animationDirection: "reverse",
                      }}
                    ></div>
                    <div
                      className="absolute w-[350px] h-[350px] border-2 border-cyan-300/30 rounded-full animate-spin"
                      style={{ animationDuration: "25s" }}
                    ></div>
                  </div>

                  <Image
                    src={statusImg}
                    alt="engagement image"
                    width={300}
                    height={300}
                  />

                  {/* Floating Tech Icons */}
                  <div
                    className="absolute top-8 -right-5 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div
                    className="absolute -bottom-5 -left-5 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center animate-bounce"
                    style={{ animationDelay: "1s" }}
                  >
                    <span className="text-2xl">🧠</span>
                  </div>
                  <div
                    className="absolute top-1/2 -left-12 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center animate-bounce"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <span className="text-lg">💡</span>
                  </div>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
