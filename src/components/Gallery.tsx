import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { XIcon } from 'lucide-react';
export function Gallery() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const images = ['https://images.unsplash.com/photo-1555244162-803834f70033?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=600&fit=crop'];
  return <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{
        opacity: 0,
        y: 30
      }} animate={inView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Gallery
          </h2>
          <p className="text-xl text-gray-600">
            A glimpse into our culinary artistry
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => <motion.div key={index} initial={{
          opacity: 0,
          scale: 0.8
        }} animate={inView ? {
          opacity: 1,
          scale: 1
        } : {}} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} whileHover={{
          scale: 1.05
        }} onClick={() => setSelectedImage(image)} className="relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg">
              <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors" />
            </motion.div>)}
        </div>
      </div>
      <AnimatePresence>
        {selectedImage && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => setSelectedImage(null)} className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <motion.button whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }} className="absolute top-4 right-4 text-white bg-amber-500 p-2 rounded-full">
              <XIcon size={24} />
            </motion.button>
            <motion.img initial={{
          scale: 0.8
        }} animate={{
          scale: 1
        }} exit={{
          scale: 0.8
        }} src={selectedImage} alt="Gallery preview" className="max-w-full max-h-full rounded-lg" />
          </motion.div>}
      </AnimatePresence>
    </section>;
}