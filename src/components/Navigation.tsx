import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [{
    name: 'Home',
    href: '#home'
  }, {
    name: 'Services',
    href: '#services'
  }, {
    name: 'Packages',
    href: '#menu'
  }, {
    name: 'About',
    href: '#about'
  }, {
    name: 'Gallery',
    href: '#gallery'
  }, {
    name: 'Contact',
    href: '#contact'
  }];
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{
          scale: 1.05
        }} className="flex items-center gap-3">
            <img src="/WhatsApp_Image_2025-11-26_at_12.57.01_AM.jpg" alt="FM Event Planners Logo" className="h-12 w-12 object-contain" />
            <div className="flex flex-col">
              <span className={`text-xl font-bold leading-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                FM EVENT PLANNERS
              </span>
              <span className={`text-xs ${isScrolled ? 'text-gray-600' : 'text-gray-200'}`}>
                Flavour Maker Event Management
              </span>
            </div>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <motion.a key={link.name} href={link.href} whileHover={{
            scale: 1.05
          }} className={`font-medium transition-colors ${isScrolled ? 'text-gray-700 hover:text-amber-600' : 'text-white hover:text-amber-300'}`}>
                {link.name}
              </motion.a>)}
            <motion.button whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="bg-amber-500 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-600 transition-colors">
              Book Now
            </motion.button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && <motion.div initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} exit={{
      opacity: 0,
      height: 0
    }} className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map(link => <a key={link.name} href={link.href} className="block text-gray-700 hover:text-amber-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </a>)}
            <button className="w-full bg-amber-500 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-600">
              Book Now
            </button>
          </div>
        </motion.div>}
    </motion.nav>;
}