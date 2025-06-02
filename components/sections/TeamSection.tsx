"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggerContainer } from "@/components/animations/stagger-container"
import { StaggerItem } from "@/components/animations/stagger-item"
import { motion } from "framer-motion"
import { Linkedin, Mail } from "lucide-react"
import { FaLinkedinIn } from "react-icons/fa";


export function TeamSection() {
  const teamMembers = [
    {
      name: "Dr. Adel ALIMI",
      role: "Président de l'ATIA",
      description: "Spécialiste en intelligence artificielle",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Dr. Amel BORGI",
      role: "Présidente ATIA",
      description: "Experte Géoscience 2025 Société",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Dr. Jihen MALEK",
      role: "Secrétaire générale",
      description: "Spécialiste en analyse et applications d'intelligence artificielle",
      image: "/api/placeholder/150/150"
    },
    {
      name: "Dr. Farouk BOUALI",
      role: "Trésorier",
      description: "Expert Géoscience 2025 Société",
      image: "/api/placeholder/150/150"
    }
  ]

  return (
    <section id="team" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bureau Exécutif
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-blue-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Notre équipe dirigeante composée d'experts reconnus dans le domaine de l'intelligence artificielle
            </p>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{member.name}</h3>
                    <p className="text-orange-400 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-300 text-sm mb-4">{member.description}</p>
                    
                    <div className="flex justify-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                      >
                        <FaLinkedinIn size={14} className="text-white" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
                      >
                        <Mail size={14} className="text-white" />
                      </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.5}>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-orange-600/20 to-blue-600/20 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4">Rejoignez Notre Équipe</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Nous recherchons constamment des experts passionnés pour contribuer au développement 
                de l'intelligence artificielle en Tunisie.
              </p>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                Postuler Maintenant
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}