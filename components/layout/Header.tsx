"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import logo from "@/public/images/logo.png"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("partners")
  const menuRef = useRef<HTMLDivElement | null>(null)

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Smooth scroll to section handler
  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsMenuOpen(false)
    }
  }

  // Advanced section detection logic from first file
  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(document.querySelectorAll("section"))
      const scrollPos = window.scrollY + 110 // Offset for fixed header

      let closestSectionId = "partners"
      let closestDistance = Infinity

      sections.forEach((section) => {
        const distance = Math.abs(section.offsetTop - scrollPos)
        if (distance < closestDistance) {
          closestDistance = distance
          closestSectionId = section.id
        }
      })

      // Special handling for bottom of page
      const scrollBottom = window.innerHeight + window.scrollY
      const pageHeight = document.documentElement.scrollHeight

      if (pageHeight - scrollBottom < 10) {
        setActiveSection("contact")
      } else {
        setActiveSection(closestSectionId)
      }
    }

    // Debounced scroll handler for better performance
    let timeout: NodeJS.Timeout
    const debouncedHandleScroll = () => {
      clearTimeout(timeout)
      timeout = setTimeout(handleScroll, 50)
    }

    window.addEventListener("scroll", debouncedHandleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", debouncedHandleScroll)
  }, [])

  const menuItems = [
    { name: "Partenaires", href: "#partners", id: "partners" },
    { name: "L'ATIA", href: "#about", id: "about" },
    { name: "Statistiques", href: "#stats", id: "stats" },
    { name: "Engagement", href: "#engagement", id: "engagement" },
    { name: "Événements", href: "#events", id: "events" },
    { name: "Bureau Exécutif", href: "#team", id: "team" },
    { name: "Adhésion", href: "#membership", id: "membership" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image src={logo} alt="Logo" width={45} height={45} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.id} className="relative">
                <button
                  onClick={() => handleScrollToSection(item.id)}
                  className={`cursor-pointer transition-colors duration-300 py-1 font-medium ${
                    activeSection === item.id
                      ? "text-primary"
                      : "text-gray-700 hover:text-gray-500"
                  }`}
                >
                  {item.name}
                </button>

                {/* Animated underline for active section */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
            ))}
            
            {/* CTA Button */}
            <div className="relative">
              <Button 
                className={`border-1 border-black bg-transparent group hover:bg-white hover:border-primary hover:text-primary cursor-pointer text-black font-semibold  ${
                    activeSection === "contact" ? "border-primary " : ""
                  }`}
                onClick={() => handleScrollToSection("contact")}
              >
                <span
                  className={`text-gray-700 hover:text-primary group-hover:text-primary font-medium ${
                    activeSection === "contact" ? "text-primary " : ""
                  }`}
                >
                  Contact
                </span>
              </Button>
              
            
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4 border-t border-gray-200"
            >
              <nav className="flex flex-col space-y-4 pt-4">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleScrollToSection(item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`cursor-pointer transition-colors duration-300 text-left ${
                      activeSection === item.id
                        ? "text-primary border-b-2 border-primary font-bold"
                        : "text-gray-700 hover:text-gray-500"
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <Button 
                  className="bg-primary hover:bg-orange-700 text-white w-full mt-4"
                  onClick={() => handleScrollToSection("membership")}
                >
                  Adhérer maintenant
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}