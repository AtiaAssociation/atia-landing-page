"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function Header({
  adminMode = false,
  authMode = false,
}: {
  adminMode?: boolean;
  authMode?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("partners");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { data: session, status } = useSession();

  // Handle logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/signin" });
  };

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Improved smooth scroll to section handler
  const handleScrollToSection = (id: string) => {
    // Close menu immediately for better UX
    setIsMenuOpen(false);

    // Small delay to ensure menu animation doesn't interfere
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        const headerHeight = 100; // Adjust this to match your actual header height
        const elementPosition = section.offsetTop;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 50);
  };

  // Advanced section detection logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = Array.from(
        document.querySelectorAll("section[id]")
      ) as HTMLElement[];
      if (sections.length === 0) return;

      const scrollPos = window.scrollY + 150; // Offset for fixed header

      let currentSection = sections[0].id;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPos >= sectionTop - 200 &&
          scrollPos < sectionTop + sectionHeight - 200
        ) {
          currentSection = section.id;
        }
      });

      // Special handling for bottom of page
      const scrollBottom = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (pageHeight - scrollBottom < 100) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
          currentSection = lastSection.id;
        }
      }

      setActiveSection(currentSection);
    };

    // Throttled scroll handler for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  const menuItems = [
    { name: "Partenaires", href: "#partners", id: "partners" },
    { name: "L'ATIA", href: "#about", id: "about" },
    { name: "Statistiques", href: "#stats", id: "stats" },
    { name: "Engagement", href: "#engagement", id: "engagement" },
    { name: "Événements", href: "#events", id: "events" },
    { name: "Bureau Exécutif", href: "#team", id: "team" },
    { name: "Adhésion", href: "#membership", id: "membership" },
  ];

  // If adminMode, show admin nav; if authMode, show minimal nav; else show default nav
  if (adminMode) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-white text-primary shadow-md">
        <div className="container py-2 flex items-center justify-between">
          <Image src={logo} alt="Logo" width={45} height={45} />
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button className="cursor-pointer bg-white text-primary border border-primary hover:bg-primary hover:text-white">
                Retour au site
              </Button>
            </Link>
            {session && (
              <Button
                onClick={handleLogout}
                className="cursor-pointer bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:border-red-700"
              >
                <LogOut size={16} className="mr-2" />
                Déconnexion
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (authMode) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-white text-primary shadow-md">
        <div className="container py-2 flex items-center justify-between">
          <Image src={logo} alt="Logo" width={45} height={45} />
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button className="cursor-pointer bg-white text-primary border border-primary hover:bg-primary hover:text-white">
                Retour au site
              </Button>
            </Link>
            {session && (
              <Button
                onClick={handleLogout}
                className="cursor-pointer bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:border-red-700"
              >
                <LogOut size={16} className="mr-2" />
                Déconnexion
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {/* <div className="flex items-center"> */}
          <Image src={logo} alt="Logo" width={45} height={45} />
          {/* </div> */}

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

            <div className="relative">
              <Button
                className={`border border-black bg-transparent group hover:bg-white hover:border-primary hover:text-primary cursor-pointer text-black font-semibold ${
                  activeSection === "contact" ? "border-primary" : ""
                }`}
                onClick={() => handleScrollToSection("contact")}
              >
                <span
                  className={`text-gray-700 hover:text-primary group-hover:text-primary font-medium ${
                    activeSection === "contact" ? "text-primary" : ""
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
            aria-label="Toggle menu"
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
                    className={`cursor-pointer transition-colors duration-300 text-left py-2 px-4 rounded-lg ${
                      activeSection === item.id
                        ? "text-primary bg-primary/10 font-bold"
                        : "text-gray-700 hover:text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <motion.button
                  key="contact"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 8 * 0.1 }}
                  onClick={() => handleScrollToSection("contact")}
                >
                  <Button
                    className="bg-primary hover:bg-orange-700 text-white w-full mt-4 cursor-pointer"
                    onClick={() => handleScrollToSection("contact")}
                  >
                    Contact
                  </Button>
                </motion.button>

             
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
