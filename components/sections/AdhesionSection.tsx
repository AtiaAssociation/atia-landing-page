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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../animations/fade-in";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  position: string;
  experience: string;
  motivation: string;
  membershipType: 'individual' | 'student' | 'corporate';
}

export const AdhesionSection = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    experience: '',
    motivation: '',
    membershipType: 'individual'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        position: '',
        experience: '',
        motivation: '',
        membershipType: 'individual'
      });
    }, 3000);
  };

  const membershipTypes = [
    {
      id: 'individual',
      title: 'Adhésion Individuelle',
      price: '150 TND/an',
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
      price: '50 TND/an',
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
      price: '500 TND/an',
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
    <section className="py-20  relative overflow-hidden">
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
          <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Devenez membre de l'Association Tunisienne d'Intelligence Artificielle et participez à l'avenir technologique de la Tunisie
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Membership Types */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-8 text-white">Types d'Adhésion</h3>
            <div className="space-y-6">
              {membershipTypes.map((type, index) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    formData.membershipType === type.id
                      ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20'
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, membershipType: type.id as 'individual' | 'student' | 'corporate' }))}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{type.title}</h4>
                        <p className="text-orange-400 font-bold text-xl">{type.price}</p>
                      </div>
                    </div>
                    <motion.div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        formData.membershipType === type.id
                          ? 'border-orange-500 bg-orange-500'
                          : 'border-gray-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {formData.membershipType === type.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 bg-white rounded-full"
                        />
                      )}
                    </motion.div>
                  </div>
                  <ul className="space-y-2">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-300 text-sm flex items-center">
                        <span className="text-green-400 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-white">Formulaire d'Adhésion</h3>
              
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <motion.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">Demande Envoyée !</h4>
                    <p className="text-gray-300">Nous vous contacterons bientôt pour finaliser votre adhésion.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Prénom *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Nom *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="votre@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Téléphone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="+216 XX XXX XXX"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Organisation</label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="Nom de votre entreprise/université"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Poste</label>
                        <input
                          type="text"
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
                          placeholder="Votre fonction"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Expérience en IA</label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors"
                      >
                        <option value="">Sélectionnez votre niveau</option>
                        <option value="beginner">Débutant (0-2 ans)</option>
                        <option value="intermediate">Intermédiaire (2-5 ans)</option>
                        <option value="advanced">Avancé (5+ ans)</option>
                        <option value="expert">Expert (10+ ans)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Motivation *</label>
                      <textarea
                        name="motivation"
                        value={formData.motivation}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                        placeholder="Pourquoi souhaitez-vous rejoindre l'ATIA ? Quels sont vos objectifs ?"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-orange-600 to-blue-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <span>Soumettre ma candidature</span>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};