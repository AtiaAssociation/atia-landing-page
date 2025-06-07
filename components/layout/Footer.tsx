import { Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import logo from "@/public/images/logo.png"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image src={logo} alt="logo" width={60} className="bg-gray-300 p-2 rounded-sm"/>
              {/* <span className="font-bold text-xl">ATIA</span> */}
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              L'Association Tunisienne pour l'Intelligence Artificielle œuvre pour 
              le développement et la promotion de l'IA en Tunisie.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/ATIATunsie" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/in/atia-tunisie-62b827195/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-primary transition-colors">À propos</a></li>
              <li><a href="#events" className="text-gray-300 hover:text-primary transition-colors">Événements</a></li>
              <li><a href="#team" className="text-gray-300 hover:text-primary transition-colors">Équipe</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-primary" />
                <span className="text-gray-300 text-sm">ENIS, Campus Universitaire de la Manouba, CP 2010, La Manouba - Tunis</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-primary" />
                <a href="tel:+21625806190" className="text-gray-300 text-sm hover:text-primary transition-colors">(+216) 25 80 61 90</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-primary" />
                <a href="mailto:contact@atia.org.tn" className="text-gray-300 text-sm hover:text-primary transition-colors">contact@atia.org.tn</a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 ATIA - Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}