import React, { useEffect, useState } from "react";
import API from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, MenuIcon, ArrowLeft, Home, UtensilsCrossed, Package, Info, ImageIcon, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function FullGallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Load all images
  useEffect(() => {
    API.get("/gallery")
      .then((res) => setImages(res.data))
      .catch(() => console.log("Failed to load full gallery"));
  }, []);

  // NAVIGATION LINKS (same as main nav)
  const navLinks = [
    { name: "Home", href: "/", icon: <Home size={20} /> },
    { name: "Services", href: "/#services", icon: <UtensilsCrossed size={20} /> },
    { name: "Packages", href: "/#menu", icon: <Package size={20} /> },
    { name: "About", href: "/#about", icon: <Info size={20} /> },
    { name: "Gallery", href: "/gallery", icon: <ImageIcon size={20} /> },
    { name: "Contact", href: "/#contact", icon: <Phone size={20} /> },
  ];

  return (
    <>
      {/* -------------------- NAVBAR -------------------- */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg py-3 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="/FM.jpg"
              alt="FM Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">FM EVENT PLANNERS</span>
              <span className="text-xs text-gray-600">Flavour Maker Event Management</span>
            </div>
          </div>

          {/* DESKTOP BACK BUTTON */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center gap-2 bg-amber-500 text-white px-6 py-2 rounded-full font-medium hover:bg-amber-600 transition"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-800"
          >
            <MenuIcon size={26} />
          </button>
        </div>

        {/* BACKDROP */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            className="fixed inset-0 bg-black md:hidden z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* MOBILE SLIDE MENU */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: mobileOpen ? 0 : "100%" }}
          transition={{ type: "tween", duration: 0.4 }}
          className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 p-6 md:hidden"
        >
          <div className="flex flex-col space-y-4">

            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="self-end text-gray-700 mb-4"
            >
              <XIcon size={26} />
            </button>

            {/* Navigation links */}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 text-lg text-gray-700 hover:text-amber-600"
              >
                {link.icon}
                {link.name}
              </a>
            ))}

            {/* Back to home in mobile */}
            <a
              href="/"
              className="flex items-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-full font-medium hover:bg-amber-600 transition"
            >
              <ArrowLeft size={18} />
              Back to Home
            </a>
          </div>
        </motion.div>
      </nav>

      {/* -------------------- PAGE CONTENT -------------------- */}
      <section className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Gallery</h2>
            <p className="text-xl text-gray-600">Explore all our uploaded works</p>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 py-10">Loading images...</p>
            ) : (
              images.map((img, index) => (
                <motion.div
                  key={img._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg"
                  onClick={() => setSelectedImage(img.url)}
                >
                  <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* -------------------- IMAGE MODAL -------------------- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-4 right-4 text-white bg-amber-500 p-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <XIcon size={24} />
            </motion.button>

            <motion.img
              src={selectedImage}
              className="max-w-full max-h-full rounded-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
