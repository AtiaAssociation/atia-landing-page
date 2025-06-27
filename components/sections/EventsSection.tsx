"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FadeIn } from "../animations/fade-in";

interface Event {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  attendees?: string;
  imageUrl?: string;
  featured: boolean;
  gradient?: string;
  published: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 5000;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(true);

  const cardRef = useRef(null);
  const isCardInView = useInView(cardRef, { once: true, amount: 0.3 });

  console.log("Events state:", events);
  console.log("Current slide:", currentSlide);
  console.log("Loading:", loading);
  console.log("Error:", error);

  // Memoized date formatting functions
  const formatDate = useCallback((dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return dateString;
    }
  }, []);

  const formatDateRange = useCallback(
    (startDate: string, endDate?: string) => {
      try {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : null;

        if (!end || start.toDateString() === end.toDateString()) {
          return formatDate(startDate);
        }

        return `${formatDate(startDate)} - ${formatDate(endDate!)}`;
      } catch (error) {
        console.error(
          "Error formatting date range:",
          startDate,
          endDate,
          error
        );
        return startDate;
      }
    },
    [formatDate]
  );

  // Cleanup function for intervals
  const clearAllIntervals = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  // Navigation functions with proper cleanup
  const nextSlide = useCallback(() => {
    if (events.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % events.length);
    setProgress(0);
    clearAllIntervals();
  }, [events.length, clearAllIntervals]);

  const prevSlide = useCallback(() => {
    if (events.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
    setProgress(0);
    clearAllIntervals();
  }, [events.length, clearAllIntervals]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      setProgress(0);
      clearAllIntervals();
    },
    [clearAllIntervals]
  );

  // Memoized current event to prevent unnecessary re-renders
  const currentEvent = useMemo(() => {
    return events[currentSlide] || null;
  }, [events, currentSlide]);

  // Fetch events from database
  useEffect(() => {
    const fetchEvents = async () => {
      if (!mountedRef.current) return;

      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/events");

        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`);
        }

        const data = await response.json();

        if (!mountedRef.current) return;

        // Ensure data is an array
        if (Array.isArray(data)) {
          setEvents(data);
        } else if (data && Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          console.error("Invalid data format:", data);
          setEvents([]);
        }
      } catch (err) {
        if (!mountedRef.current) return;
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchEvents();
  }, []);

  // Reset currentSlide when events change
  useEffect(() => {
    if (events.length > 0 && currentSlide >= events.length) {
      setCurrentSlide(0);
    }
  }, [events.length, currentSlide]);

  // Auto-advance slides with proper cleanup
  useEffect(() => {
    clearAllIntervals();

    if (isHovered || events.length <= 1 || !mountedRef.current) {
      setProgress(0);
      return;
    }

    // Main slide interval
    intervalRef.current = setInterval(() => {
      if (!mountedRef.current) return;
      setCurrentSlide((prev) => (prev + 1) % events.length);
      setProgress(0);
    }, SLIDE_DURATION);

    // Progress bar interval
    const progressStep = 100 / (SLIDE_DURATION / 100);
    progressIntervalRef.current = setInterval(() => {
      if (!mountedRef.current) return;
      setProgress((prev) => {
        const newProgress = prev + progressStep;
        return newProgress >= 100 ? 0 : newProgress;
      });
    }, 100);

    return clearAllIntervals;
  }, [isHovered, events.length, SLIDE_DURATION, clearAllIntervals]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      clearAllIntervals();
    };
  }, [clearAllIntervals]);

  // Memoized event info sections to prevent re-renders
  const eventInfoSections = useMemo(() => {
    if (!currentEvent) return null;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg">Date</p>
            <p className="text-gray-600">
              {formatDateRange(currentEvent.startDate, currentEvent.endDate)}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <MapPin className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg">Lieu</p>
            <p className="text-gray-600">{currentEvent.location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg">Participants</p>
            <p className="text-gray-600">
              {currentEvent.attendees || "À confirmer"}
            </p>
          </div>
        </div>
      </div>
    );
  }, [currentEvent, formatDateRange]);

  // Memoized navigation dots
  const navigationDots = useMemo(() => {
    if (events.length <= 1) return null;

    return (
      <div className="flex space-x-3">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-blue-600 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    );
  }, [events.length, currentSlide, goToSlide]);

  // Show loading state
  if (loading) {
    return (
      <section id="events" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Événements à venir
            </h2>
            <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 w-24" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Participez à nos conférences et rencontres autour des thématiques
              actuelles de la recherche et de l'innovation.
            </p>
          </div>

          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Chargement des événements...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section id="events" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Événements à venir
            </h2>
            <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 w-24" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Participez à nos conférences et rencontres autour des thématiques
              actuelles de la recherche et de l'innovation.
            </p>
          </div>

          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Réessayer
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state
  if (events.length === 0) {
    return (
      <section id="events" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Événements à venir
            </h2>
            <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 w-24" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Participez à nos conférences et rencontres autour des thématiques
              actuelles de la recherche et de l'innovation.
            </p>
          </div>

          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Aucun événement à venir pour le moment.
              </p>
              <p className="text-gray-500">
                Revenez bientôt pour découvrir nos prochains événements !
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!currentEvent) {
    console.error("No current event found at index:", currentSlide);
    return (
      <section id="events" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">Erreur: Événement non trouvé</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos Événements à venir
          </h2>
          <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-6 w-24" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Participez à nos conférences et rencontres autour des thématiques
            actuelles de la recherche et de l'innovation.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative" ref={cardRef}>
            {/* Main Event Card */}
            <div
              className="relative overflow-hidden"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentEvent.id}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
                    {/* Event Banner */}
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${
                          currentEvent.gradient ||
                          "from-blue-600 via-indigo-600 to-purple-600"
                        }`}
                      />

                      {currentEvent.imageUrl && (
                        <img
                          src={currentEvent.imageUrl}
                          alt={currentEvent.title}
                          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                        />
                      )}

                      <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between text-white">
                        <div>
                          {currentEvent.featured && (
                            <div className="inline-block bg-orange-500 text-white text-sm px-3 py-1 rounded-full mb-4">
                              Événement Principal
                            </div>
                          )}
                          <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                            {currentEvent.title}
                          </h3>
                          {currentEvent.subtitle && (
                            <p className="text-lg md:text-xl text-blue-100 font-medium">
                              {currentEvent.subtitle}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                          <div className="mb-4 md:mb-0">
                            <div className="text-2xl md:text-3xl font-bold">
                              {formatDateRange(
                                currentEvent.startDate,
                                currentEvent.endDate
                              )}
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

                    {/* Event Details */}
                    <div className="p-8 md:p-12">
                      {eventInfoSections}

                      <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                        {currentEvent.description}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full">
                          Voir plus de détails
                        </Button>
                        <Button
                          variant="outline"
                          className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-full"
                        >
                          S'inscrire maintenant
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            {events.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 -translate-y-1/2 left-4 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-blue-600 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 -translate-y-1/2 right-4 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-blue-600 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Bottom Controls */}
                <div className="flex items-center justify-center mt-8 space-x-6">
                  {navigationDots}
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
