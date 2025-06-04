"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"
import { Mail, Phone, MapPin, Facebook, Linkedin, Globe, Users, ArrowRight } from "lucide-react"
import contactImg from "@/public/images/contactImg.png"
import Image from "next/image"

export function ContactSection() {
  return (
    <section id="contact" className="py-20  bg-gradient-to-br from-orange-50/30 via-white to-blue-50/30 relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary to-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
        backgroundSize: '24px 24px'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-orange-400 rounded-2xl mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
            Nos Contacts
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Rejoignez-nous dans notre mission de développer l'intelligence artificielle en Tunisie
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Information - Redesigned without card separation */}
          <SlideIn direction="left" className="space-y-8">
            <div className="relative">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-orange-50/50 rounded-3xl blur-xl"></div>
              
              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="flex items-center mb-8">
                  <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Contactez-nous
                  </h3>
                </div>
                
                <StaggerContainer className="space-y-3">
                  <StaggerItem>
                    <div className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300">
                      <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Adresse</h4>
                        <p className="text-gray-600 leading-relaxed">
                          ENIS, Campus Universitaire de la Manouba, CP 2010,<br />
                          La Manouba - Tunis
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Téléphone</h4>
                        <p className="text-gray-600 font-mono">(+216) 25 80 61 90</p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300">
                      <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                        <p className="text-gray-600 font-mono">contact@atia.org.tn</p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300">
                      <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Facebook className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Facebook</h4>
                        <p className="text-gray-600">
                          Association Tunisienne pour l'Intelligence Artificielle
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>

                {/* Enhanced Social Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Facebook className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Suivez-nous
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="group border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-orange-400 hover:text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <Linkedin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    LinkedIn
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </SlideIn>

          {/* Enhanced Image Section */}
          <SlideIn direction="right" className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Image container with enhanced styling */}
              <div className="relative">
                {/* Glow effect behind image */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-3xl blur-2xl scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                
                {/* Main image with improved styling */}
                {/* <div className="relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-3xl p-6 border border-white/30"> */}
                  <Image 
                    src={contactImg} 
                    alt="Contact ATIA" 
                    width={500} 
                    height={500}
                    className="rounded-2xl  group-hover:scale-105 transition-transform duration-500"
                  />
                {/* </div> */}
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce shadow-lg" style={{animationDelay: '0.5s'}}></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute top-8 -left-2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-ping shadow-lg"></div>
                
                {/* Floating contact badge */}
                {/* <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">En ligne</span>
                  </div>
                </div> */}
              </div>
            </div>
          </SlideIn>
        </div>

        {/* Additional CTA Section */}
        <FadeIn className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à rejoindre notre communauté IA ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Découvrez les opportunités passionnantes dans le domaine de l'intelligence artificielle en Tunisie
            </p>
            <Button className="bg-gradient-to-r from-primary to-orange-400 hover:from-orange-500 hover:to-primary text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              Contactez-nous maintenant
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}