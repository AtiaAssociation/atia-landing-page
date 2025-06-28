"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/animations/fade-in";
import { SlideIn } from "@/components/animations/slide-in";
import { StaggerContainer } from "@/components/animations/stagger-container";
import { StaggerItem } from "@/components/animations/stagger-item";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Linkedin,
  Globe,
  Users,
  ArrowRight,
  Brain,
  Zap,
  Network,
  Target,
  Copy,
  Check,
} from "lucide-react";
import { BiSupport } from "react-icons/bi";
import { useState } from "react";

export function ContactSection() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact@atia.org.tn");
      setEmailCopied(true);

      // Reset the state after 2 seconds
      setTimeout(() => {
        setEmailCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-orange-50/30 via-white to-blue-50/30 relative overflow-hidden"
    >
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-primary to-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      ></div>

      <div className="container  relative z-10">
        <FadeIn className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-orange-400 rounded-2xl mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
            Nos Contacts
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            Rejoignez-nous dans notre mission de développer l'intelligence
            artificielle en Tunisie
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Contact Information */}
          <SlideIn direction="left" className="space-y-8">
            <div className="relative">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-orange-50/50 rounded-3xl blur-xl"></div>

              <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl py-8 border border-white/20">
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
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Adresse
                        </h4>
                        <p className="text-gray-600 leading-relaxed font-mono">
                          ENIS, Campus Universitaire de la Manouba, CP 2010,
                          <br />
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
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Téléphone
                        </h4>
                        <p className="text-gray-600 font-mono">
                          (+216) 25 80 61 90
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300">
                      <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Mail className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Email
                        </h4>
                        <p className="text-gray-600 font-mono">
                          contact@atia.org.tn
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/60 transition-all duration-300">
                      <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <Facebook className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Facebook
                        </h4>
                        <p className="text-gray-600 font-mono">
                          Association Tunisienne pour l'Intelligence
                          Artificielle
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>

                {/* Enhanced Social Buttons with actual links */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <a
                      href="https://www.facebook.com/ATIATunsie"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      Suivez-nous
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="group border-2 border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-orange-400 hover:text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <a
                      href="https://www.linkedin.com/in/atia-tunisie-62b827195/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                      LinkedIn
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </SlideIn>

          <SlideIn
            direction="right"
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              {/* Fixed positioning for floating UI elements - moved behind the card */}
              <div className="absolute top-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl opacity-80 animate-bounce shadow-lg flex items-center justify-center z-0">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="absolute top-12 left-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-70 animate-pulse shadow-lg flex items-center justify-center z-0">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div className="absolute bottom-4 left-0 w-10 h-10 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl opacity-75 animate-float shadow-lg flex items-center justify-center z-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>

              {/* Main contact interface mockup - higher z-index */}
              <div className="relative bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-2xl z-10">
                {/* Mock chat header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200/50">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                        <BiSupport className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold text-gray-900">ATIA Support</h3>
                      <p className="text-sm text-green-600 font-medium">
                        En ligne
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>

                {/* Mock conversation */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3 rounded-2xl rounded-tl-md max-w-xs shadow-lg">
                      <p className="text-sm">
                        Bonjour ! Comment pouvons-nous vous aider ?
                      </p>
                      <p className="text-xs text-blue-100 mt-1">
                        ATIA Team • Maintenant
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-4 py-3 rounded-2xl rounded-tr-md max-w-xs shadow-lg">
                      <p className="text-sm">
                        Je souhaite rejoindre votre communauté IA
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Vous • Maintenant
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-2xl rounded-tl-md max-w-xs shadow-lg">
                      <p className="text-sm">Parfait ! Contactez-nous via :</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Mail className="w-4 h-4" />
                        <Phone className="w-4 h-4" />
                        <Facebook className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick contact buttons with email functionality */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <a href="tel:+21625806190">
                      <Phone className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Appeler
                    </a>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <a href="mailto:contact@atia.org.tn?subject=Demande%20d'information%20ATIA&body=Bonjour%20%C3%A9quipe%20ATIA%2C%0A%0AJe%20souhaite%20obtenir%20plus%20d'informations%20sur%20vos%20activit%C3%A9s%20et%20comment%20rejoindre%20votre%20communaut%C3%A9.%0A%0AMerci%20d'avance%20pour%20votre%20r%C3%A9ponse.%0A%0ACordialement">
                      <Mail className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Email
                    </a>
                  </Button>
                </div>

                {/* Status indicators */}
                <div className="mt-6 flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Réponse rapide
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-1" />
                    24/7 Support
                  </div>
                </div>
              </div>

              {/* Fixed floating notification - positioned properly */}
              <div className="absolute top-1/3 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg animate-pulse z-20">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                  <span className="text-xs font-semibold">Nouveau message</span>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>

        {/* Additional CTA Section with proper email functionality */}
        <FadeIn className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Prêt à rejoindre notre communauté IA ?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Découvrez les opportunités passionnantes dans le domaine de
              l'intelligence artificielle en Tunisie
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-orange-400 hover:from-orange-500 hover:to-primary text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <a href="mailto:contact@atia.org.tn?subject=Demande%20de%20contact%20-%20Rejoindre%20ATIA&body=Bonjour%20%C3%A9quipe%20ATIA%2C%0A%0AJe%20suis%20int%C3%A9ress%C3%A9(e)%20%C3%A0%20rejoindre%20votre%20communaut%C3%A9%20d'intelligence%20artificielle%20en%20Tunisie.%0A%0APourriez-vous%20me%20fournir%20plus%20d'informations%20sur%20%3A%0A-%20Les%20activit%C3%A9s%20de%20l'association%0A-%20Comment%20devenir%20membre%0A-%20Les%20%C3%A9v%C3%A9nements%20%C3%A0%20venir%0A%0AMerci%20d'avance%20pour%20votre%20r%C3%A9ponse.%0A%0ACordialement">
                  Contactez-nous maintenant
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                variant="outline"
                onClick={handleCopyEmail}
                className={`px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer ${
                  emailCopied
                    ? "bg-green-50 border-green-500 text-green-700 hover:bg-green-100"
                    : ""
                }`}
              >
                {emailCopied ? "Email copié !" : "Copier l'email"}
                {emailCopied ? (
                  <Check className="w-4 h-4 ml-2 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 ml-2 group-hover:-translate-x-1 transition-transform" />
                )}
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Custom animation for floating effect */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
