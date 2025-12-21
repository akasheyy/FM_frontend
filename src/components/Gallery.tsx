import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { XIcon } from "lucide-react";
import API from "../lib/api";
import { Link } from "react-router-dom";

export function Gallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState([]);

  // 🔥 Load only 8 images from backend
  useEffect(() => {
    API.get("/gallery?limit=8")
      .then((res) => setImages(res.data))
      .catch(() => console.log("Failed to load gallery images"));
  }, []);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Gallery
          </h2>
          <p className="text-xl text-gray-600">
            A glimpse into our culinary artistry
          </p>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-10">
              Loading images...
            </p>
          ) : (
            images.map((img, index) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedImage(img.url)}
                className="relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg"
              >
                <img
                  src={img.url}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors" />
              </motion.div>
            ))
          )}
        </div>

        {/* 🔗 View Full Gallery Button */}
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold shadow-md transition-all"
          >
            View Gallery →
          </Link>
        </div>

      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 text-white bg-amber-500 p-2 rounded-full"
            >
              <XIcon size={24} />
            </motion.button>

            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Gallery preview"
              className="max-w-full max-h-full rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
