"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
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
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  PlayCircle,
  Star,
  Zap,
  Timer,
  AlertCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import eventImage from "@/public/images/event.png";

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
  link?: string;
  featured: boolean;
  gradient?: string;
  published: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Animation variants - defined outside component to prevent recreation
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const slideTransition = {
  x: { type: "spring", stiffness: 300, damping: 30 },
  opacity: { duration: 0.3 },
};

// Utility functions - memoized outside component
const formatDate = (dateString: string): string => {
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
};

const formatDateRange = (startDate: string, endDate?: string): string => {
  try {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    if (!end || start.toDateString() === end.toDateString()) {
      return formatDate(startDate);
    }

    return `${formatDate(startDate)} - ${formatDate(endDate!)}`;
  } catch (error) {
    console.error("Error formatting date range:", startDate, endDate, error);
    return startDate;
  }
};

// Enhanced status determination with more granular statuses
const getEventStatus = (
  event: Event
): {
  status: string;
  label: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  pulse?: boolean;
  glow?: boolean;
  priority: number;
} => {
  const now = new Date();
  const startDate = new Date(event.startDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;

  // If status is explicitly set and not UPCOMING, use it
  if (event.status && event.status !== "UPCOMING") {
    switch (event.status) {
      case "ONGOING":
        return {
          status: "ongoing",
          label: "En cours",
          color: "text-white",
          bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
          icon: <PlayCircle className="w-4 h-4" />,
          pulse: true,
          glow: true,
          priority: 1,
        };
      case "COMPLETED":
        return {
          status: "completed",
          label: "Terminé",
          color: "text-white",
          bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
          icon: <CheckCircle className="w-4 h-4" />,
          priority: 4,
        };
      case "CANCELLED":
        return {
          status: "cancelled",
          label: "Annulé",
          color: "text-white",
          bgColor: "bg-gradient-to-r from-red-500 to-red-600",
          icon: <XCircle className="w-4 h-4" />,
          priority: 5,
        };
    }
  }

  // Auto-determine status based on dates
  if (endDate && now > endDate) {
    return {
      status: "completed",
      label: "Terminé",
      color: "text-white",
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      icon: <CheckCircle className="w-4 h-4" />,
      priority: 4,
    };
  }

  if (now >= startDate && (!endDate || now <= endDate)) {
    return {
      status: "ongoing",
      label: "En cours",
      color: "text-white",
      bgColor: "bg-gradient-to-r from-green-500 to-emerald-500",
      icon: <PlayCircle className="w-4 h-4" />,
      pulse: true,
      glow: true,
      priority: 1,
    };
  }

  // Calculate days until event
  const daysUntil = Math.ceil(
    (startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysUntil <= 1) {
    return {
      status: "today",
      label: daysUntil === 0 ? "Aujourd'hui" : "Demain",
      color: "text-white",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
      icon: <Zap className="w-4 h-4" />,
      pulse: true,
      glow: true,
      priority: 0,
    };
  }

  if (daysUntil <= 7) {
    return {
      status: "soon",
      label: "Cette semaine",
      color: "text-white",
      bgColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
      icon: <AlertCircle className="w-4 h-4" />,
      pulse: true,
      priority: 2,
    };
  }

  if (daysUntil <= 30) {
    return {
      status: "upcoming",
      label: "Ce mois-ci",
      color: "text-white",
      bgColor: "bg-gradient-to-r from-purple-500 to-indigo-500",
      icon: <Calendar className="w-4 h-4" />,
      priority: 3,
    };
  }

  return {
    status: "future",
    label: "À venir",
    color: "text-white",
    bgColor: "bg-gradient-to-r from-gray-500 to-gray-600",
    icon: <Clock className="w-4 h-4" />,
    priority: 6,
  };
};

// Enhanced Creative Status Badge Component
const StatusBadge = React.memo<{ event: Event }>(({ event }) => {
  const statusInfo = getEventStatus(event);

  return (
    <div className="absolute top-4 left-4 z-10">
      <div
        className={`
          ${statusInfo.bgColor} 
          ${statusInfo.color} 
          px-4 py-2 rounded-full text-sm font-bold 
          flex items-center gap-2 
          shadow-2xl backdrop-blur-sm 
          hover:scale-105 transition-all duration-300 
          border border-white/20
          ${statusInfo.pulse ? "animate-pulse" : ""}
          ${statusInfo.glow ? "shadow-2xl drop-shadow-lg" : ""}
          relative overflow-hidden
        `}
      >
        {/* Animated background effect for high-priority events */}
        {statusInfo.priority <= 2 && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse" />
        )}

        <motion.div
          animate={statusInfo.pulse ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {statusInfo.icon}
        </motion.div>

        <span className="relative z-10 font-semibold tracking-wide">
          {statusInfo.label}
        </span>

        {/* Sparkle effect for featured events */}
        {event.featured && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Star className="w-4 h-4 text-yellow-300" fill="currentColor" />
          </motion.div>
        )}
      </div>
    </div>
  );
});

StatusBadge.displayName = "StatusBadge";

// Enhanced Countdown Timer Component
const CountdownTimer = React.memo<{ startDate: string }>(({ startDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const eventDate = new Date(startDate).getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });

        // Mark as urgent if less than 24 hours
        setIsUrgent(days === 0 && hours < 24);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsUrgent(false);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [startDate]);

  // Don't show countdown if event has already started
  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="absolute top-4 right-4 z-20 hidden md:block"
    >
      <div
        className={`
          backdrop-blur-md rounded-xl p-4 text-white border border-white/20
          ${
            isUrgent
              ? "bg-gradient-to-br from-red-500/50 to-orange-500/50 animate-pulse "
              : "bg-gradient-to-br from-black/0 to-gray-900/0"
          }
          shadow-2xl transform hover:scale-105 transition-all duration-300
        `}
      >
        <div className="flex items-center gap-2 mb-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Timer className="w-4 h-4" />
          </motion.div>
          <div className="text-xs font-bold uppercase tracking-wider">
            {isUrgent ? "Urgent!" : "Compte à rebours"}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {timeLeft.days > 0 && (
            <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
              <motion.div
                className="text-xl font-bold leading-none mb-1"
                animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {timeLeft.days}
              </motion.div>
              <div className="text-xs opacity-80 font-medium">Jours</div>
            </motion.div>
          )}

          <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
            <motion.div
              className="text-xl font-bold leading-none mb-1"
              animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity, delay: 0.1 }}
            >
              {timeLeft.hours.toString().padStart(2, "0")}
            </motion.div>
            <div className="text-xs opacity-80 font-medium">H</div>
          </motion.div>

          <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
            <motion.div
              className="text-xl font-bold leading-none mb-1"
              animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            >
              {timeLeft.minutes.toString().padStart(2, "0")}
            </motion.div>
            <div className="text-xs opacity-80 font-medium">Min</div>
          </motion.div>

          <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
            <motion.div
              className="text-xl font-bold leading-none mb-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            >
              {timeLeft.seconds.toString().padStart(2, "0")}
            </motion.div>
            <div className="text-xs opacity-80 font-medium">Sec</div>
          </motion.div>
        </div>

        {/* Progress bar for visual appeal */}
        <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary/50  to-secondary/50"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
});

CountdownTimer.displayName = "CountdownTimer";

// Enhanced Inline Countdown Timer Component
const InlineCountdownTimer = React.memo<{ startDate: string }>(
  ({ startDate }) => {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    const [isUrgent, setIsUrgent] = useState(false);

    useEffect(() => {
      const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const eventDate = new Date(startDate).getTime();
        const difference = eventDate - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft({ days, hours, minutes, seconds });
          setIsUrgent(days === 0 && hours < 24);
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          setIsUrgent(false);
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);

      return () => clearInterval(timer);
    }, [startDate]);

    if (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      return null;
    }

    return (
      <div className="flex justify-center ">
        <div
          className={`
            grid ${
              timeLeft.days > 0
                ? "grid-cols-2 md:grid-cols-4"
                : "grid-cols-2 md:grid-cols-3"
            } 
            gap-6 p-6 rounded-2xl
            justify-center
            ${
              isUrgent
                ? "bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200"
                : "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200"
            }
          `}
        >
          {timeLeft.days > 0 && (
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <motion.div
                className={`
                  text-3xl font-bold leading-none mb-2 
                  ${isUrgent ? "text-red-600" : "text-blue-600"}
                `}
                animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {timeLeft.days}
              </motion.div>
              <div className="text-sm text-gray-600 font-semibold">Jours</div>
            </motion.div>
          )}

          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className={`
                text-3xl font-bold leading-none mb-2 
                ${isUrgent ? "text-red-600" : "text-blue-600"}
              `}
              animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
            >
              {timeLeft.hours.toString().padStart(2, "0")}
            </motion.div>
            <div className="text-sm text-gray-600 font-semibold">Heures</div>
          </motion.div>

          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className={`
                text-3xl font-bold leading-none mb-2 
                ${isUrgent ? "text-red-600" : "text-blue-600"}
              `}
              animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              {timeLeft.minutes.toString().padStart(2, "0")}
            </motion.div>
            <div className="text-sm text-gray-600 font-semibold">Minutes</div>
          </motion.div>

          <motion.div
            className="text-center"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className={`
                text-3xl font-bold leading-none mb-2 
                ${isUrgent ? "text-red-600" : "text-blue-600"}
              `}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {timeLeft.seconds.toString().padStart(2, "0")}
            </motion.div>
            <div className="text-sm text-gray-600 font-semibold">Secondes</div>
          </motion.div>
        </div>
      </div>
    );
  }
);

InlineCountdownTimer.displayName = "InlineCountdownTimer";

// Memoized Event Info Component
const EventInfo = React.memo<{ event: Event }>(({ event }) => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Calendar className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-lg">Date</p>
          <p className="text-gray-600">
            {formatDateRange(event.startDate, event.endDate)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <MapPin className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-lg">Lieu</p>
          <p className="text-gray-600">{event.location}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-lg">Participants</p>
          <p className="text-gray-600">{event.attendees || "Non spécifiés"}</p>
        </div>
      </div>
    </div>

    {/* Enhanced Countdown Timer for Upcoming Events */}
    {(getEventStatus(event).status === "upcoming" ||
      getEventStatus(event).status === "soon" ||
      getEventStatus(event).status === "today") && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 shadow-lg md:hidden"
      >
        <div className="text-center mb-6">
          <motion.h4
            className="text-xl font-bold text-gray-900 mb-2"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            ⏰ Compte à rebours
          </motion.h4>
          <p className="text-sm text-gray-600">
            Temps restant avant le début de l'événement
          </p>
        </div>
        <InlineCountdownTimer startDate={event.startDate} />
      </motion.div>
    )}
  </div>
));

EventInfo.displayName = "EventInfo";

// Replace the EventCard component with this improved version

const EventCard = React.memo<{
  event: Event;
  direction: number;
}>(({ event, direction }) => (
  <motion.div
    key={`${event.id}-${direction}`}
    custom={direction}
    variants={slideVariants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={slideTransition}
    className="bg-white rounded-lg shadow-2xl overflow-hidden"
  >
    {/* Improved Event Banner with Hover Effect */}
    <div className="relative h-64 md:h-80 overflow-hidden group">
      {/* Background Gradient (fallback) */}
      <div
        className={`absolute inset-0  ${
          event.gradient || "from-blue-600 via-indigo-600 to-purple-600"
        }`}
      />

      {/* Event Image */}
      {event.imageUrl ? (
        <Image
          src={event.imageUrl}
          alt={event.title}
          width={400}
          height={400}
          className="absolute  w-full h-full object-fill transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        /* If no image, show gradient with subtle pattern */
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            event.gradient || "from-blue-600 via-indigo-600 to-purple-600"
          } opacity-50 `}
        ></div>
      )}

      {/* Status Badge */}
      <StatusBadge event={event} />

      {/* Enhanced Countdown Timer */}
      {(getEventStatus(event).status === "upcoming" ||
        getEventStatus(event).status === "soon" ||
        getEventStatus(event).status === "today") && (
        <CountdownTimer startDate={event.startDate} />
      )}

      {/* Hover Overlay with Blur Background */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 lg:z-10">
        <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-t from-black/60 via-black/30 to-transparent">
          {/* Content that appears on hover */}
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 ">
              {event.featured && (
                <Badge className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full mb-4 transform scale-95 group-hover:scale-100 transition-transform duration-300">
                  Événement Principal
                </Badge>
              )}
              <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight drop-shadow-lg ">
                {event.title}
              </h3>
              {event.subtitle && (
                <p className="text-lg md:text-xl text-blue-100 font-medium drop-shadow-md">
                  {event.subtitle}
                </p>
              )}
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="text-2xl md:text-3xl font-bold drop-shadow-lg">
                    {formatDateRange(event.startDate, event.endDate)}
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center text-lg md:text-xl mb-2 drop-shadow-md">
                    <MapPin className="w-5 h-5 mr-2" />
                    {event.location}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Always visible minimal overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 group-hover:opacity-0 transition-opacity duration-500">
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight drop-shadow-lg line-clamp-2">
            {event.title}
          </h3>
          <div className="flex items-center text-sm md:text-base opacity-90">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDateRange(event.startDate, event.endDate)}
          </div>
        </div>
      </div>
    </div>

    {/* Event Details - same as before */}
    <div className="p-8 md:p-12">
      <EventInfo event={event} />

      <p className="text-gray-700 text-lg mb-8 leading-relaxed">
        {event.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {event.link ? (
          <Link href={event.link} target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full cursor-pointer">
              <ExternalLink className="w-5 h-5 mr-2" />
              Voir plus de détails
            </Button>
          </Link>
        ) : (
          <Button
            className="bg-gray-400 text-white px-8 py-4 text-lg font-semibold rounded-full cursor-not-allowed"
            disabled
          >
            Voir plus de détails
          </Button>
        )}
      </div>
    </div>
  </motion.div>
));

EventCard.displayName = "EventCard";

// Memoized Navigation Dots Component
const NavigationDots = React.memo<{
  eventsCount: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
}>(({ eventsCount, currentSlide, onSlideChange }) => {
  if (eventsCount <= 1) return null;

  return (
    <div className="flex space-x-3">
      {Array.from({ length: eventsCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentSlide
              ? "bg-blue-600 w-8"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
});

NavigationDots.displayName = "NavigationDots";

// Memoized Header component
const Header = React.memo(() => (
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
));

Header.displayName = "Header";

// Auto-slide hook for cleaner separation of concerns
const useAutoSlide = (
  eventsLength: number,
  isHovered: boolean,
  onNext: () => void
) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const clearIntervals = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    clearIntervals();
    if (eventsLength <= 1 || isHovered || isPaused) return;

    intervalRef.current = setInterval(() => {
      onNext();
    }, 5000);
  }, [eventsLength, isHovered, isPaused, onNext, clearIntervals]);

  const pauseAutoSlide = useCallback(() => {
    setIsPaused(true);
    clearIntervals();

    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  }, [clearIntervals]);

  useEffect(() => {
    startAutoSlide();
    return clearIntervals;
  }, [startAutoSlide, clearIntervals]);

  useEffect(() => {
    return clearIntervals;
  }, [clearIntervals]);

  return pauseAutoSlide;
};

export const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const mountedRef = useRef(true);

  // Memoize current event to prevent unnecessary re-renders
  const currentEvent = useMemo(() => {
    return events[currentSlide] || null;
  }, [events, currentSlide]);

  // Stable navigation functions
  const nextSlide = useCallback(() => {
    if (events.length === 0) return;
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % events.length);
  }, [events.length]);

  const prevSlide = useCallback(() => {
    if (events.length === 0) return;
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  }, [events.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide || index < 0 || index >= events.length) return;
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    },
    [currentSlide, events.length]
  );

  // Use auto-slide hook
  const pauseAutoSlide = useAutoSlide(events.length, isHovered, nextSlide);

  // Handle user interactions
  const handleUserNavigation = useCallback((action: () => void) => {
    pauseAutoSlide();
    action();
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Fetch events - simplified and stable
  useEffect(() => {
    let isCancelled = false;

    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/events");
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`);
        }

        const data = await response.json();

        if (isCancelled) return;

        const eventsArray = Array.isArray(data) ? data : data?.events || [];

        // Sort events: featured first, then by status and date
        const sortedEvents = eventsArray.sort((a: Event, b: Event) => {
          // First priority: featured events
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;

          // Second priority: status (upcoming > ongoing > completed)
          const statusOrder = {
            upcoming: 0,
            ongoing: 1,
            completed: 2,
            cancelled: 3,
          };
          const statusA = getEventStatus(a).status;
          const statusB = getEventStatus(b).status;

          if (
            statusOrder[statusA as keyof typeof statusOrder] !==
            statusOrder[statusB as keyof typeof statusOrder]
          ) {
            return (
              statusOrder[statusA as keyof typeof statusOrder] -
              statusOrder[statusB as keyof typeof statusOrder]
            );
          }

          // Third priority: start date (earliest first)
          return (
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          );
        });

        setEvents(sortedEvents);
      } catch (err) {
        if (isCancelled) return;
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
        setEvents([]);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Reset slide when events change
  useEffect(() => {
    if (events.length > 0 && currentSlide >= events.length) {
      setCurrentSlide(0);
    }
  }, [events.length, currentSlide]);

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <Header />
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

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <Header />
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

  // Empty state
  if (events.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <Header />
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
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">Erreur: Événement non trouvé</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    >
      <div className="container mx-auto px-4">
        <Header />

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Main Event Card with Hover Support */}
            <div
              className="relative overflow-hidden rounded-lg"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <EventCard
                  key={currentEvent.id}
                  event={currentEvent}
                  direction={direction}
                />
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            {events.length > 1 && (
              <>
                <button
                  onClick={() => handleUserNavigation(prevSlide)}
                  className="absolute top-1/2 -translate-y-1/2 left-4 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-blue-600 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => handleUserNavigation(nextSlide)}
                  className="absolute top-1/2 -translate-y-1/2 right-4 z-20 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center text-gray-800 hover:text-blue-600 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Bottom Controls */}
                <div className="flex items-center justify-center mt-8">
                  <NavigationDots
                    eventsCount={events.length}
                    currentSlide={currentSlide}
                    onSlideChange={(index) =>
                      handleUserNavigation(() => goToSlide(index))
                    }
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
