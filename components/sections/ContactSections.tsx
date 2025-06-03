"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"
import { Mail, Phone, MapPin, Facebook, Linkedin, Globe, Users } from "lucide-react"
import contactImg from "@/public/images/contactImg.png"
import Image from "next/image"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-orange-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-400 rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nos Contact
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-600 to-blue-600 mx-auto "></div>

        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-end ">
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

          {/* Creative Cards Display */}
          <SlideIn direction="right" className="space-y-8 flex justify-center lg:justify-end">
            {/* Floating Cards Container */}
            <div className="relative ">
              <Image src={contactImg} alt="contact image" width={500} height={500}/>
              {/* Large Orange Circle Background */}
              {/* <div className="absolute top-4 right-8 w-72 h-72 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full opacity-90"></div> */}
              
              {/* Facebook Card */}
              {/* <div className="absolute top-8 left-4 bg-white rounded-xl shadow-lg p-4 w-64 transform rotate-3 hover:rotate-0 transition-all duration-300 hover:shadow-xl z-20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">Facebook</span>
                </div>
                <h4 className="font-bold text-sm text-gray-900 mb-2">
                  ATIA TUNISIE
                </h4>
                <p className="text-xs text-gray-600 mb-3">
                  L'ASSOCIATION TUNISIENNE POUR L'INTELLIGENCE ARTIFICIELLE EST UNE ORGANISATION À BUT NON LUCRATIF...
                </p>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-purple-400 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-xs text-gray-500">+847 followers</span>
                </div>
              </div> */}

              {/* ATIA Card */}
              {/* <div className="absolute top-32 right-4 bg-white rounded-xl shadow-lg p-6 w-56 transform -rotate-2 hover:rotate-0 transition-all duration-300 hover:shadow-xl z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">ATIA</h4>
                    <p className="text-xs text-gray-600">Tunisia AI Association</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3 h-3" />
                    <span>contact@atia.org.tn</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3 h-3" />
                    <span>(+216) 25 80 61 90</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3" />
                    <span>ENIS, La Manouba</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              </div>

              
              <div className="absolute bottom-8 left-12 bg-blue-600 text-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300 z-30">
                <Linkedin className="w-6 h-6" />
              </div>


              <div className="absolute top-16 right-16 w-4 h-4 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-16 left-8 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
              <div className="absolute top-24 left-16 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div> */}
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}