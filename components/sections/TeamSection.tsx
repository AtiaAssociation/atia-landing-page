"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import khaled from "@/public/images/bureau/khaled.png"
import amel from "@/public/images/bureau/amel.png"
import bilel from "@/public/images/bureau/bilel.png"
import chaker from "@/public/images/bureau/chaker.png"
import farahKtata from "@/public/images/bureau/farahKtata.png"
import fatma from "@/public/images/bureau/fatma.png"
import houssemNouri from "@/public/images/bureau/houssemNouri.png"
import najiba from "@/public/images/bureau/najiba.png"
import olfaBelkahla from "@/public/images/bureau/olfaBelkahla.png"
import radhwane from "@/public/images/bureau/radhwane.png"

import Image from "next/image";
import { AdhesionSection } from "./AdhesionSection";

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const teamMembers = [
    {
      name: "Pr. Khaled Ghédira",
      role: "Fondateur de l'ATIA Président d'honneur",
      job:"Président d'honneur",
      description:
        "Spécialiste en intelligence artificielle avec plus de 20 ans d'expérience dans le domaine",
      image: khaled,
      linkedin: "#",
      email: "adel.alimi@example.com",
    },
    {
      name: "Dr. Farah BARIKA KTATA",
      role: "Présidente ATIA",
      job:"Maître Assistante ISSAT Sousse",
      description:
        "Experte Géoscience 2025 Société et leader reconnue dans l'innovation technologique",
      image: farahKtata,
      linkedin: "#",
      email: "amel.borgi@example.com",
    },
    {
      name: "Dr. Olfa Belkahla Driss",
      role: "Responsable de la relation avec l'environnement académique ",
      job:"Maître de Conférences - ESC",
      description:
        "Spécialiste en analyse et applications d'intelligence artificielle pour les entreprises",
      image: olfaBelkahla,
      linkedin: "#",
      email: "jihen.malek@example.com",
    },
    {
      name: "Dr. Fatma SIALA KALLEL",
      role: "Responsable communication  ",
      job:"Maître Assistante ISAMM",
      description:
        "Expert Géoscience 2025 Société avec une expertise en gestion financière et stratégique",
      image: fatma,
      linkedin: "#",
      email: "farouk.bouali@example.com",
    },
    {
      name: "Pr. Najiba Bellaaj",
      role: "Vice présidente ",
      job:"Professeur ISI",
      description:
        "Chercheuse en machine learning et deep learning, spécialisée dans les réseaux de neurones",
      image: najiba,
      linkedin: "#",
      email: "sarah.ahmed@example.com",
    },
    {
      name: "Dr. Bilel Marzouki",
      role: "Responsable adhésion ",
      job:" Maître assistant ENSI",
      description:
        "Expert en communication digitale et stratégies de développement technologique",
      image: bilel,
      linkedin: "#",
      email: "mohamed.hassan@example.com",
    },
    {
      name: "Dr. Chaker Essid",
      role: "Trésorier",
      job:"Maître assistant FST",
      description:
        "Spécialisée dans les collaborations internationales et le développement de partenariats stratégiques",
      image: chaker,
      linkedin: "#",
      email: "leila.mansouri@example.com",
    },
    {
      name: "Dr. Amel Laabidi",
      role: "Sécrétaire Général Adjoint ",
      job:"Consultant BH",
      description:
        "Architecte logiciel senior avec une expertise en systèmes distribués et cloud computing",
      image: amel,
      linkedin: "#",
      email: "youssef.benali@example.com",
    },
    {
      name: "Dr. Radhwane Ben Rhouma",
      role: "Consultant PRICE",
      job:"Responsable des activités internes",
      description:
        "Architecte logiciel senior avec une expertise en systèmes distribués et cloud computing",
      image: radhwane,
      linkedin: "#",
      email: "youssef.benali@example.com",
    },
    {
      name: "Dr. Houssem Nouri",
      role: "Responsable de la planification",
      job:"Maître assistant FSEG",
      description:
        "Architecte logiciel senior avec une expertise en systèmes distribués et cloud computing",
      image: houssemNouri,
      linkedin: "#",
      email: "youssef.benali@example.com",
    },
  ];

  const itemsPerPage = 4;
  const totalPages = Math.ceil(teamMembers.length / itemsPerPage);

  const getCurrentMembers = () => {
    const start = currentIndex * itemsPerPage;
    return teamMembers.slice(start, start + itemsPerPage);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="team" className="py-20 bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bureau Exécutif
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Notre équipe dirigeante composée d'experts reconnus dans le domaine
            de l'intelligence artificielle
          </p>
        </motion.div>

        {/* Carousel Controls */}
        <div className="flex justify-center items-center mb-8 space-x-4">
          <Button
            onClick={prevSlide}
            variant="outline"
            size="sm"
            className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-white"
          >
            <ChevronLeft size={16} />
          </Button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-orange-500 w-8"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextSlide}
            variant="outline"
            size="sm"
            className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-white"
          >
            <ChevronRight size={16} />
          </Button>
        </div>

        {/* Team Cards Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {getCurrentMembers().map((member, index) => (
                <motion.div
                  key={`${currentIndex}-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <Card className="bg-gray-800 py-0 border-gray-700 hover:border-orange-500/50 transition-all duration-500 h-full group overflow-hidden">
                    <CardContent className="p-0 h-full flex flex-col">
                      {/* Image Container with Blur Overlay */}
                      <div className="relative overflow-hidden">
                        <motion.div
                          className="relative w-full h-60"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                          <Image
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full  transition-all duration-500 group-hover:blur-sm"
                          />

                          {/* Overlay that appears on hover */}
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100"
                          >
                            <div className="flex space-x-4">
                              <motion.a
                                href={member.linkedin}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.8 }}
                                className="w-12 h-12 bg-blue-600/90 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors backdrop-blur-sm"
                              >
                                <FaLinkedinIn
                                  size={20}
                                  className="text-white"
                                />
                              </motion.a>
                              <motion.a
                                href={`mailto:${member.email}`}
                                whileHover={{ scale: 1.2, rotate: -5 }}
                                whileTap={{ scale: 0.8 }}
                                className="w-12 h-12 bg-orange-600/90 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors backdrop-blur-sm"
                              >
                                <Mail size={20} className="text-white" />
                              </motion.a>
                            </div>
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <motion.div
                        className="p-6 flex-1 flex flex-col justify-between"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div>
                          <motion.h3
                            className="text-xl font-semibold mb-2 text-white group-hover:text-orange-400 transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            {member.name}
                          </motion.h3>
                          <motion.p
                            className="text-orange-400 font-medium  group-hover:text-orange-300 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {member.role}
                          </motion.p>
                          <motion.p
                            className="text-orange-100 font-medium mb-3 group-hover:text-orange-300 transition-colors duration-300"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            {member.job}
                          </motion.p>
                          <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                            {member.description}
                          </p>
                        </div>

                        {/* Animated border bottom */}
                        <motion.div className="w-0 h-0.5 bg-gradient-to-r from-orange-500 to-blue-500 mt-4 group-hover:w-full transition-all duration-500" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 flex justify-center">
          <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentIndex + 1) / totalPages) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-orange-600/10 to-blue-600/10 rounded-2xl p-6 border border-gray-700/50 backdrop-blur-sm mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-2xl font-bold text-orange-400">
                  {teamMembers.length}
                </h4>
                <p className="text-gray-300">Experts</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-blue-400">20+</h4>
                <p className="text-gray-300">Années d'expérience</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-green-400">100+</h4>
                <p className="text-gray-300">Projets réalisés</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <AdhesionSection/>
    </section>
  );
}
