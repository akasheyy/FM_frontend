import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom'; // Added for route detection
import {
  MenuIcon,
  XIcon,
  Home,
  UtensilsCrossed,
  Package,
  Info,
  ImageIcon,
  Phone,
} from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we are on the Home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: 'home', icon: <Home size={20} /> },
    { name: 'Services', href: 'services', icon: <UtensilsCrossed size={20} /> },
    { name: 'Packages', href: 'menu', icon: <Package size={20} /> },
    { name: 'About', href: 'about', icon: <Info size={20} /> },
    { name: 'Gallery', href: 'gallery', icon: <ImageIcon size={20} /> },
    { name: 'Contact', href: 'contact', icon: <Phone size={20} /> },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (href === 'gallery') {
      navigate('/gallery');
      return;
    }

    if (!isHomePage) {
      // If on gallery page, go home first then scroll
      navigate(`/#${href}`);
    } else {
      // If already home, just scroll
      const element = document.getElementById(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Logic: Transparent ONLY if on Home Page AND not scrolled. 
  // Otherwise (on Gallery or Scrolled), use White.
  const navBgClass = (!isHomePage || isScrolled) 
    ? 'bg-white shadow-lg py-3' 
    : 'bg-transparent py-4';

  const textColorClass = (!isHomePage || isScrolled)
    ? 'text-gray-900'
    : 'text-white';

  const subTextColorClass = (!isHomePage || isScrolled)
    ? 'text-gray-600'
    : 'text-gray-200';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img
              src="/FM.jpg"
              alt="FM Event Planners Logo"
              className="h-12 w-12 object-contain rounded-full"
            />
            <div className="flex flex-col">
              <span
                className={`text-xl font-bold leading-tight ${
                  (!isHomePage || isScrolled) ? 'text-gray-900' : 'text-white'
                }`}
              >
                FM EVENT PLANNERS
              </span>
              <span
                className={`text-xs ${
                  (!isHomePage || isScrolled) ? 'text-gray-600' : 'text-gray-200'
                }`}
              >
                Flavour Makers Event Management
              </span>
            </div>
          </motion.div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  (!isHomePage || isScrolled)
                    ? 'text-gray-700 hover:text-amber-600'
                    : 'text-white hover:text-amber-300'
                }`}
              >
                {link.icon}
                {link.name}
              </motion.button>
            ))}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden ${(!isHomePage || isScrolled) ? 'text-gray-700' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <XIcon size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU SLIDE-OUT */}
      <motion.div
        ref={menuRef}
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.4 }}
        className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl md:hidden z-50 p-6"
      >
        <div className="flex flex-col space-y-6 mt-10">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="flex items-center gap-4 text-lg text-gray-700 hover:text-amber-600 font-medium"
            >
              <span className="text-amber-600">{link.icon}</span>
              {link.name}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
