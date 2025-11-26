import React from 'react';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Menu } from '../components/Menu';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { About } from '../components/About';
import { Testimonials } from '../components/Testimonials';
import { Gallery } from '../components/Gallery';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
export function Home() {
  return <div className="w-full bg-neutral-50">
      <Navigation />
      <Hero />
      <Services />
      <Menu />
      <WhyChooseUs />
      <About />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </div>;
}