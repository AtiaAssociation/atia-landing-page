"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"
import { Mail, Phone, MapPin, Facebook, Linkedin } from "lucide-react"
import Image from "next/image"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-orange-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos Contact
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <SlideIn direction="left" className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contactez-nous
              </h3>
              
              <StaggerContainer className="space-y-6">
                <StaggerItem>
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Adresse</h4>
                      <p className="text-gray-600">
                        ENIS, Campus Universitaire de la Manouba, CP 2010,<br />
                        La Manouba - Tunis
                      </p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Téléphone</h4>
                      <p className="text-gray-600">(+216) 25 80 61 90</p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">contact@atia.org.tn</p>
                    </div>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Facebook className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Facebook</h4>
                      <p className="text-gray-600">
                        Association Tunisienne pour l'Intelligence Artificielle
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>

              <div className="mt-8 flex space-x-4">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
                <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-lg">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>
          </SlideIn>

          {/* Contact Cards and Visual */}
          <SlideIn direction="right" className="space-y-8">
            {/* Business Cards Display */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  {/* ATIA Card */}
                  <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-6 rounded-xl text-white transform rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="text-sm font-semibold mb-2">ATIA</div>
                    <div className="text-xs opacity-90">
                      Association Tunisienne pour<br />
                      l'Intelligence Artificielle
                    </div>
                    <div className="mt-4 text-xs">
                      contact@atia.org.tn<br />
                      (+216) 25 80 61 90
                    </div>
                  </div>

                  {/* IEEE Card */}
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-xl text-white transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                    <div className="text-sm font-semibold mb-2">IEEE</div>
                    <div className="text-xs opacity-90">
                      Institute of Electrical and<br />
                      Electronics Engineers
                    </div>
                    <div className="mt-4 text-xs">
                      Partnership Program<br />
                      International Standards
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Scannez pour nous contacter
              </h4>
              <div className="bg-gray-100 p-6 rounded-xl inline-block">
                <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
                  {/* QR Code Placeholder */}
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-1 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Accès rapide à nos informations de contact
              </p>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}