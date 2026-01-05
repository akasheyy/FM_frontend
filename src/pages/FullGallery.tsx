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

  /* ---------------- Navigation Logic ---------------- */
  const showNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null) {
        setSelectedIndex((prev) => (prev! + 1) % images.length);
      }
    },
    [selectedIndex, images.length]
  );

  const showPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedIndex !== null) {
        setSelectedIndex(
          (prev) => (prev! - 1 + images.length) % images.length
        );
      }
    },
    [selectedIndex, images.length]
  );

  /* ---------------- Keyboard Support ---------------- */
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
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Gallery
            </motion.h2>
            <p className="text-xl text-gray-600">
              Explore all our uploaded works
            </p>
          </div>

          {/* ---------------- CARD STYLE IMAGE GRID ---------------- */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img, index) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border border-gray-100"
                onClick={() => setSelectedIndex(index)}
              >
                {/* Image */}
                <div className="h-56 w-full overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.caption || "Gallery image"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Caption */}
                <div className="p-3 border-t">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {img.caption || "Untitled"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FULL SCREEN SLIDER MODAL ---------------- */}
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(null);
              }}
              className="absolute top-6 right-6 text-white z-[70] p-2 bg-white/10 rounded-full hover:bg-white/20"
            >
              <XIcon size={32} />
            </button>

            {/* Previous */}
            <button
              onClick={showPrev}
              className="absolute left-4 md:left-8 text-white z-[70] p-3 bg-white/5 rounded-full hover:bg-white/20"
            >
              <ChevronLeft size={40} />
            </button>

            {/* Next */}
            <button
              onClick={showNext}
              className="absolute right-4 md:right-8 text-white z-[70] p-3 bg-white/5 rounded-full hover:bg-white/20"
            >
              <ChevronRight size={40} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-20 text-white/60 font-medium">
              {selectedIndex + 1} / {images.length}
            </div>

            {/* Image */}
            <motion.img
              key={images[selectedIndex].url}
              src={images[selectedIndex].url}
              className="max-w-[90vw] max-h-[80vh] object-contain rounded-sm shadow-2xl"
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
