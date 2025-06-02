"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Présentation de l'ATIA
              </h2>
            </FadeIn>

            <SlideIn delay={0.2}>
              <p className="text-xl text-blue-100 leading-relaxed mb-6">
                L'Association Tunisienne pour l'Intelligence Artificielle (ATIA) est une organisation à but non lucratif, 
                fondée en 2009 par le Professeur Khaled Ghedira. Elle a pour mission de promouvoir la recherche, 
                le développement et l'innovation dans le domaine de l'intelligence artificielle.
              </p>
            </SlideIn>

            <SlideIn delay={0.4}>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-blue-100">
                    Promouvoir la recherche et le développement dans le domaine de l'IA
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-blue-100">
                    Organiser des événements scientifiques et des conférences internationales
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-blue-100">
                    Faciliter les collaborations entre chercheurs et industriels
                  </p>
                </div>
              </div>
            </SlideIn>

            <SlideIn delay={0.6}>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg">
                Voir Plus
              </Button>
            </SlideIn>
          </div>

          {/* Right content - Profile card */}
          <div className="flex justify-center">
            <FadeIn delay={0.8}>
              <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">KG</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Pr. Khaled Ghedira</h3>
                  <p className="text-blue-200 mb-4">Fondateur de l'ATIA & Président d'honneur</p>
                  <p className="text-sm text-blue-100">
                    Professeur émérite et pionnier dans le domaine de l'intelligence artificielle en Tunisie
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}