"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FadeIn } from "../animations/fade-in";

export const EventsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const SLIDE_DURATION = 5000; // 5 seconds in milliseconds

  // Add refs for scroll animations
  const cardRef = React.useRef(null);
  const isCardInView = useInView(cardRef, { once: true, amount: 0.3 });

  const events = [
    {
      id: 1,
      title: "IEEE AMCAI 2025",
      subtitle: "2nd Afro-Mediterranean Conference on Artificial Intelligence",
      date: "October 14-16, 2025",
      location: "Valenciennes, France",
      description:
        "Rejoignez-nous pour la plus grande conférence sur l'IA en Afrique et en Méditerranée. Découvrez les dernières avancées en intelligence artificielle et connectez-vous avec des experts internationaux.",
      attendees: "200+ participants attendus",
      image: "/api/placeholder/1280/400",
      featured: true,
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
    },
    {
      id: 2,
      title: "AI Research Workshop",
      subtitle: "Workshop on Machine Learning Applications",
      date: "November 20-21, 2025",
      location: "Tunis, Tunisia",
      description:
        "Un atelier intensif sur les applications pratiques de l'apprentissage automatique dans divers domaines industriels et académiques.",
      attendees: "150+ participants attendus",
      image: "/api/placeholder/1280/400",
      featured: false,
      gradient: "from-green-600 via-teal-600 to-blue-600",
    },
    {
      id: 3,
      title: "Tech Innovation Summit",
      subtitle: "Future Technologies and Digital Transformation",
      date: "December 10-12, 2025",
      location: "Casablanca, Morocco",
      description:
        "Explorez les technologies émergentes et leur impact sur la transformation digitale des entreprises et institutions.",
      attendees: "300+ participants attendus",
      image: "/api/placeholder/1280/400",
      featured: false,
      gradient: "from-purple-600 via-pink-600 to-red-600",
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    if (isHovered) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / SLIDE_DURATION) * 100;
      setProgress(Math.min(newProgress, 100));

      if (elapsed >= SLIDE_DURATION) {
        setCurrentSlide((prev) => (prev + 1) % events.length);
        setProgress(0);
      }
    }, 10); // Update progress every 10ms for smooth animation

    return () => clearInterval(interval);
  }, [isHovered, events.length, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentEvent = events[currentSlide];

  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    >
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Nos Événements à venir
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto mb-6"
            />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Participez à nos conférences et rencontres autour des thématiques
              actuelles de la recherche et de l'innovation.
            </motion.p>
          </div>
        </FadeIn>

        <div className="max-w-6xl mx-auto">
          <div className="relative" ref={cardRef}>
            {/* Main Event Card */}
            <div className="relative overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Card className="overflow-hidden py-0 bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
                      {/* Event Banner Image */}
                      <div className="relative h-64 md:h-80 overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${currentEvent.gradient} opacity-90`}
                        />
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

                        <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between text-white">
                          <div>
                            {currentEvent.featured && (
                              <Badge className="bg-orange-500 hover:bg-primary mb-4 text-sm px-3 py-1">
                                Événement Principal
                              </Badge>
                            )}
                            <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                              {currentEvent.title}
                            </h3>
                            <p className="text-lg md:text-xl text-blue-100 font-medium">
                              {currentEvent.subtitle}
                            </p>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                            <div className="mb-4 md:mb-0">
                              <div className="text-4xl md:text-6xl font-bold">
                                {currentEvent.date.split(" ")[1].split("-")[0]}-
                                {currentEvent.date.split(" ")[1].split("-")[1]}
                              </div>
                              <div className="text-lg md:text-xl opacity-90">
                                {currentEvent.date.split(" ")[0]}{" "}
                                {currentEvent.date.split(" ")[2]}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="flex items-center text-lg md:text-xl mb-2">
                                <MapPin className="w-5 h-5 mr-2" />
                                {currentEvent.location}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-8 md:p-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-lg">
                                Date
                              </p>
                              <p className="text-gray-600">{currentEvent.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-lg">
                                Lieu
                              </p>
                              <p className="text-gray-600">
                                {currentEvent.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 text-lg">
                                Participants
                              </p>
                              <p className="text-gray-600">
                                {currentEvent.attendees}
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                          {currentEvent.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button className="bg-gradient-to-r from-primary/60 to-primary hover:from-primary hover:to-primary text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg cursor-pointer">
                              Voir plus de détails
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              className="border-2 border-secondary text-secondary hover:bg-blue-50 hover:text-secondary px-8 py-4 text-lg font-semibold rounded-full cursor-pointer"
                            >
                              S'inscrire maintenant
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={isCardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-1/2 -translate-y-1/2 left-4 z-20"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-blue-600 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={isCardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-1/2 -translate-y-1/2 right-4 z-20"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-blue-600 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </motion.div>

            {/* Bottom Controls */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center mt-8 space-x-6"
            >
              {/* Slide Indicators */}
              <div className="flex space-x-3">
                {events.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-gradient-to-r from-primary/60 to-primary w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isCardInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary/70 to-primary"
                initial={{ width: "0%" }}
                animate={{
                  width: isHovered ? `${progress}%` : `${progress}%`,
                }}
                transition={{
                  duration: 0.1,
                  ease: "linear",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
