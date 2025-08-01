"use client";
import { CounterAnimation } from "@/components/animations/counter-animation";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerContainer } from "@/components/animations/stagger-container";
import { StaggerItem } from "@/components/animations/stagger-item";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, Globe } from "lucide-react";
import statusImg from "@/public/images/statusImg.png";
import Image from "next/image";
import EngagementSection from "./EngagementSection";

export function StatsSection() {
  const stats = [
    {
      icon: BookOpen,
      value: 300,
      label: "Thèses de doctorat",
      color: "text-primary",
      bgColor: "bg-orange-100",
    },
    {
      icon: Users,
      value: 1500,
      label: "Articles Scientifiques",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: Award,
      value: 15,
      label: "Années d'Excellence",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: Globe,
      value: 50,
      label: "Collaborations Internationales",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <section id="stats" className="py-24 bg-gray-50">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Une Référence Scientifique Nationale
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto ">
              Forte de ses ancrages dans les premières unités de recherches
              tunisiennes et de sa position sur un écosystème académique solide,
              composé de plus d'une centaine de chercheurs et d'industriels.
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StaggerItem key={index}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div
                    className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                    <CounterAnimation value={stat.value} />
                    {stat.value >= 1000 ? "+" : stat.value >= 50 ? "+" : ""}
                  </div>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* <FadeIn delay={0.5}>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Engagement pour une IA Responsable
              </h3>
              <p className="text-lg opacity-90 mb-6">
                Au-delà de la recherche fondamentale, l'ATIA agit en tant que
                leader dans l'organisation éthique et sociétale de l'IA. Elle
                veille à aligner son action sur les avancées technologiques et
                les défis socio-économiques actuels.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  Éthique IA
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  Innovation Responsable
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  Impact Social
                </span>
              </div>
            </div>
          </div>
        </FadeIn> */}
        {/* <FadeIn delay={0.5}>
          <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 container">
            <div className="basis-3/5">
              <h3 className="text-3xl md:text-4xl font-extrabold  mb-4">
                Engagement pour une <br className="hidden md:block" /> IA
                Responsable
              </h3>
              <p className="text-gray-700 text-lg mb-6">
                Au-delà de la recherche, l'ATIA joue un rôle moteur dans
                l'appropriation éthique et stratégique de l'intelligence
                artificielle. Elle veille à aligner ses actions sur les avancées
                technologiques et les défis socio-économiques actuels, en
                proposant des solutions pertinentes et durables, au service de
                l'humain et de l'intérêt collectif.
              </p>
            </div>

            <div className="basis-2/5 flex justify-center  w-full">
              <Image
                src={statusImg.src}
                alt="Robot IA"
                width={300}
                height={300}
                className="rounded-full  z-10"
              />
            </div>
          </div>
        </FadeIn> */}

        <EngagementSection />
      </div>
    </section>
  );
}
