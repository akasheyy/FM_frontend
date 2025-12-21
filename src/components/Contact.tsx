import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import API from "../lib/api";

import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  InstagramIcon,
} from "lucide-react";

export function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    place: "",
    eventType: "",
    date: "",
    guests: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/contact", formData);
      alert("Booking request sent successfully. Our team will contact you soon!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        place: "",
        eventType: "",
        date: "",
        guests: "",
        message: "",
      });
    } catch (err) {
      alert("Failed to submit. Please try again.");
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Get In <span className="text-amber-600">Touch</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Ready to make your next event unforgettable? Fill out the form below or reach out directly via WhatsApp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT FORM (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(val) => setFormData({ ...formData, name: val })}
                />
                <InputGroup
                  placeholder="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(val) => setFormData({ ...formData, email: val })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(val) => setFormData({ ...formData, phone: val })}
                />
                <InputGroup
                  placeholder="Event Location (Place)"
                  value={formData.place}
                  onChange={(val) => setFormData({ ...formData, place: val })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Event Date</label>
                  <input
                    type="date"
                    className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 p-3.5 rounded-xl transition-all outline-none"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">No. of Guests</label>
                  <input
                    type="number"
                    placeholder="Approx. Guests"
                    className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 p-3.5 rounded-xl transition-all outline-none"
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  />
                </div>
              </div>

              <select
                className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 p-3.5 rounded-xl transition-all outline-none appearance-none"
                required
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              >
                <option value="">Select Event Type</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate</option>
                <option value="birthday">Birthday</option>
                <option value="decoration">Decoration</option>
                <option value="catering">Catering</option>
                <option value="other">Other</option>
              </select>

              <textarea
                className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 p-3.5 rounded-xl transition-all outline-none"
                placeholder="Tell us more about your requirements..."
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />

              <button
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-amber-200 transition-all active:scale-[0.98] disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit Booking Request"}
              </button>
            </form>

            {/* WhatsApp Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <WhatsAppBtn number="9496509214" />
              <WhatsAppBtn number="8137956267" />
            </div>
          </motion.div>

          {/* RIGHT SIDE INFO (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-4"
          >
            <InfoCard icon={<PhoneIcon size={20} />} title="Phone">
              +91 9496509214, +91 8137956267
            </InfoCard>

            <InfoCard icon={<MailIcon size={20} />} title="Email">
              info@fmeventplanners.com
            </InfoCard>

            <InfoCard icon={<InstagramIcon size={20} />} title="Instagram">
              <a href="https://instagram.com/fm_event_planners" target="_blank" className="hover:text-amber-600 transition-colors">
                @fm_event_planners
              </a>
            </InfoCard>

            <InfoCard icon={<MapPinIcon size={20} />} title="Location">
              Ramanattukara, Kozhikode, Kerala
            </InfoCard>

            {/* Map & QR */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white p-2 shadow-sm rounded-2xl border border-slate-100 h-52 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.626884639414!2d75.8741!3d11.181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDEwJzUxLjYiTiA3NcKwNTInMjYuOCJF!5e0!3m2!1sen!2sin!4v1625650000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  className="rounded-xl"
                  title="Ramanattukara"
                />
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col items-center justify-center">
                <h3 className="font-bold text-sm mb-3 text-slate-800 uppercase tracking-tight">Follow Us</h3>
                <img
                  src="/insta.png"
                  alt="Instagram QR Code"
                  className="w-32 h-32 object-contain border border-slate-50 p-2 rounded-lg mb-2"
                />
                <p className="text-[10px] text-slate-400 uppercase font-medium">Scan with Instagram</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** * Sub-components for cleaner structure
 */

function InputGroup({ placeholder, type = "text", value, onChange }: any) {
  return (
    <input
      type={type}
      className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 p-3.5 rounded-xl transition-all outline-none shadow-sm"
      placeholder={placeholder}
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function WhatsAppBtn({ number }: { number: string }) {
  return (
    <a
      href={`https://wa.me/91${number}`}
      target="_blank"
      rel="noreferrer"
      className="bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center gap-3 py-3.5 rounded-xl font-bold transition-transform active:scale-95 shadow-md shadow-green-100"
    >
      <MessageCircleIcon size={20} fill="white" />
      <span className="text-sm">{number}</span>
    </a>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow">
      <div className="bg-amber-50 p-3.5 rounded-xl text-amber-600 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.1em]">{title}</h3>
        <p className="text-slate-700 font-semibold">{children}</p>
      </div>
    </div>
  );
}