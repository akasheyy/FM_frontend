import React, { useEffect, useState, useCallback } from "react";
import API from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "../components/Navigation";

export default function FullGallery() {
  const [images, setImages] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    API.get("/gallery")
      .then((res) => setImages(res.data))
      .catch(() => console.log("Failed to load full gallery"));
  }, []);

  // Navigation Logic
  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! + 1) % images.length);
    }
  }, [selectedIndex, images.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! - 1 + images.length) % images.length);
    }
  }, [selectedIndex, images.length]);

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-gray-900 mb-4">Gallery</motion.h2>
            <p className="text-xl text-gray-600">Explore all our uploaded works</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className="relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-md"
                onClick={() => setSelectedIndex(index)}
              >
                <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------- FULL SCREEN SLIDER MODAL -------------------- */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button className="absolute top-6 right-6 text-white z-[70] p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <XIcon size={32} />
            </button>

            {/* Previous Button */}
            <button 
              onClick={showPrev}
              className="absolute left-4 md:left-8 text-white z-[70] p-3 bg-white/5 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Next Button */}
            <button 
              onClick={showNext}
              className="absolute right-4 md:right-8 text-white z-[70] p-3 bg-white/5 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-6 text-white/60 font-medium">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Main Image */}
            <motion.img
              key={images[selectedIndex].url} // Key ensures animation triggers on skip
              src={images[selectedIndex].url}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}