"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../animations/fade-in";

export const AdhesionSection = () => {
  const handleRedirectToForm = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSc8LNGFSROFgzpyxM3TT-_tSEkmi-femalSwXCkyJVY4eMk1Q/viewform?pli=1', '_blank');
  };

  const membershipTypes = [
    {
      id: 'individual',
      title: 'Adhésion Individuelle',
      features: [
        'Accès aux événements ATIA',
        'Newsletter mensuelle',
        'Réseau professionnel',
        'Formations en ligne'
      ],
      icon: '👤'
    },
    {
      id: 'student',
      title: 'Adhésion Étudiante',
      features: [
        'Tous les avantages individuels',
        'Tarifs préférentiels formations',
        'Mentorat professionnel',
        'Concours et défis'
      ],
      icon: '🎓'
    },
    {
      id: 'corporate',
      title: 'Adhésion Entreprise',
      features: [
        'Jusqu\'à 5 membres',
        'Partenariats privilégiés',
        'Visibilité événements',
        'Conseil stratégique'
      ],
      icon: '🏢'
    }
  ];

  return (
    <section id="membership" className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-purple-500 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Rejoignez l'ATIA
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Devenez membre de l'Association Tunisienne d'Intelligence Artificielle et participez à l'avenir technologique de la Tunisie
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
         

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-7 sm:p-12 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-white">Prêt à rejoindre l'ATIA ?</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Remplissez notre formulaire d'adhésion et commencez votre parcours avec nous dès aujourd'hui
              </p>
              
              <motion.button
                onClick={handleRedirectToForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 px-4 sm:px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:from-orange-700 hover:to-blue-700 transition-all duration-300 text-lg shadow-lg hover:shadow-xl cursor-pointer"
              >
                <span>Remplir le formulaire d'adhésion</span>
                <ExternalLink className="w-8 h-8 xs:w-5 xs:h-5" />
              </motion.button>
              
              <p className="text-gray-400 text-sm mt-4">
                Le formulaire s'ouvrira dans un nouvel onglet
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};