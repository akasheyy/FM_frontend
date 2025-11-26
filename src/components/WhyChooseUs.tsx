import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AwardIcon, ClockIcon, UsersIcon, SparklesIcon } from 'lucide-react';
export function WhyChooseUs() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const features = [{
    icon: <SparklesIcon size={50} />,
    title: 'Creative Decoration',
    description: 'Unique and stunning decoration designs tailored to your event theme'
  }, {
    icon: <AwardIcon size={50} />,
    title: 'Expert Team',
    description: 'Experienced professionals dedicated to making your event perfect'
  }, {
    icon: <ClockIcon size={50} />,
    title: 'Timely Execution',
    description: 'On-time setup and seamless event coordination from start to finish'
  }, {
    icon: <UsersIcon size={50} />,
    title: 'Personalized Service',
    description: 'Custom packages designed to match your vision and budget'
  }];
  return <section className="py-20 bg-gradient-to-br from-amber-50 to-white">
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
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Excellence in event decoration and catering services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 30
        }} animate={inView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: index * 0.15
        }} className="text-center">
              <motion.div whileHover={{
            scale: 1.1,
            rotate: 5
          }} transition={{
            duration: 0.3
          }} className="inline-flex items-center justify-center w-24 h-24 bg-amber-500 text-white rounded-full mb-6 shadow-lg">
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>)}
        </div>
      </div>
    </section>;
}