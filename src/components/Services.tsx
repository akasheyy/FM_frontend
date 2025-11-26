import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HeartIcon, SparklesIcon, CakeIcon, BriefcaseIcon, UtensilsIcon, PaletteIcon } from 'lucide-react';
export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const services = [{
    icon: <HeartIcon size={40} />,
    title: 'Wedding Decorations',
    description: 'Stunning wedding decor with floral arrangements, lighting, and elegant setups to make your special day magical'
  }, {
    icon: <SparklesIcon size={40} />,
    title: 'Event Decoration & Setup',
    description: 'Complete event decoration services including stage design, backdrop arrangements, and venue transformation'
  }, {
    icon: <UtensilsIcon size={40} />,
    title: 'Catering Services',
    description: 'Delicious multi-cuisine catering with customized menus for weddings, parties, and corporate events'
  }, {
    icon: <BriefcaseIcon size={40} />,
    title: 'Corporate Events',
    description: 'Professional event planning and decoration for conferences, meetings, and corporate celebrations'
  }, {
    icon: <CakeIcon size={40} />,
    title: 'Birthday Parties',
    description: 'Creative themed decorations and catering packages for memorable birthday celebrations'
  }, {
    icon: <PaletteIcon size={40} />,
    title: 'Custom Event Design',
    description: 'Personalized event concepts with unique themes, color schemes, and custom decoration elements'
  }];
  return <section id="services" className="py-20 bg-white">
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
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete event decoration and catering solutions for every occasion
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} animate={inView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: index * 0.1
        }} whileHover={{
          y: -10,
          transition: {
            duration: 0.3
          }
        }} className="bg-neutral-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
              <motion.div whileHover={{
            scale: 1.1,
            rotate: 5
          }} transition={{
            duration: 0.3
          }} className="text-amber-500 mb-6">
                {service.icon}
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>)}
        </div>
      </div>
    </section>;
}