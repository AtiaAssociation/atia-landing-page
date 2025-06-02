"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { SlideIn } from "@/components/animations/slide-in"
import { Calendar, MapPin, Users } from "lucide-react"
import { motion } from "framer-motion"

export function EventsSection() {
  const upcomingEvent = {
    title: "IEEE AMCAI 2025",
    subtitle: "2nd Afro-Mediterranean Conference on Artificial Intelligence",
    date: "October 14-16, 2025",
    location: "Tunis, Tunisia",
    description: "Rejoignez-nous pour la plus grande conférence sur l'IA en Afrique et en Méditerranée",
    attendees: "200+ participants attendus"
  }

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos Événements à venir
            </h2>
            <p className="text-xl text-gray-600">
              Participez à nos conférences et rencontres autour des thématiques actuelles de la recherche et de l'innovation.
            </p>
          </div>
        </FadeIn>

        <div className="max-w-4xl mx-auto">
          <SlideIn>
            <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              <div className="relative">
                {/* Event header with gradient background */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-4 lg:mb-0">
                      <Badge className="bg-orange-500 hover:bg-orange-600 mb-3">
                        Événement Principal
                      </Badge>
                      <h3 className="text-3xl font-bold mb-2">{upcomingEvent.title}</h3>
                      <p className="text-xl text-blue-100">{upcomingEvent.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">OCT</div>
                      <div className="text-4xl font-bold">14-16</div>
                      <div className="text-lg">2025</div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Date</p>
                        <p className="text-gray-600">{upcomingEvent.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Lieu</p>
                        <p className="text-gray-600">{upcomingEvent.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Participants</p>
                        <p className="text-gray-600">{upcomingEvent.attendees}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                    {upcomingEvent.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg">
                        Voir plus de détails sur IEEE AMCAI 2025
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg">
                        S'inscrire maintenant
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}