import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import API from "../lib/api";

import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  InstagramIcon,
  CheckCircle2,
  AlertCircle,
  X
} from "lucide-react";

export function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [loading, setLoading] = useState(false);
  
  // State for the popup box
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

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

  // Auto-hide popup after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/contact", formData);
      
      // Trigger Success Popup
      setNotification({ 
        type: 'success', 
        message: "Request sent! We will contact you shortly." 
      });
      
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
      // Trigger Error Popup
      setNotification({ 
        type: 'error', 
        message: "Failed to submit. Please try again or use WhatsApp." 
      });
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* POPUP NOTIFICATION BOX */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -100, x: "-50%" }}
            animate={{ opacity: 1, y: 30, x: "-50%" }}
            exit={{ opacity: 0, y: -100, x: "-50%" }}
            className="fixed top-0 left-1/2 z-[100] w-[90%] max-w-md"
          >
            <div className={`flex items-center justify-between gap-4 p-4 rounded-2xl shadow-2xl border backdrop-blur-md ${
              notification.type === 'success' 
                ? "bg-white/90 border-green-100 shadow-green-100/50" 
                : "bg-white/90 border-red-100 shadow-red-100/50"
            }`}>
              <div className="flex items-center gap-3">
                {notification.type === 'success' ? (
                  <CheckCircle2 className="text-green-500" size={24} />
                ) : (
                  <AlertCircle className="text-red-500" size={24} />
                )}
                <p className={`font-semibold text-sm md:text-base ${
                  notification.type === 'success' ? "text-slate-800" : "text-red-800"
                }`}>
                  {notification.message}
                </p>
              </div>
              <button 
                onClick={() => setNotification(null)}
                className="p-1 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={18} className="text-slate-400" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          {/* LEFT FORM */}
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
                  onChange={(val: string) => setFormData({ ...formData, name: val })}
                />
                <InputGroup
                  placeholder="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(val: string) => setFormData({ ...formData, email: val })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(val: string) => setFormData({ ...formData, phone: val })}
                />
                <InputGroup
                  placeholder="Event Location (Place)"
                  value={formData.place}
                  onChange={(val: string) => setFormData({ ...formData, place: val })}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <WhatsAppBtn number="9496509214" />
              <WhatsAppBtn number="8137956267" />
            </div>
          </motion.div>

          {/* RIGHT SIDE INFO */}
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
              fmeventtplanners@gmail.com
            </InfoCard>

            <InfoCard icon={<InstagramIcon size={20} />} title="Instagram">
              <a href="https://instagram.com/fm_event_planners" target="_blank" rel="noreferrer" className="hover:text-amber-600 transition-colors">
                @fm_event_planners
              </a>
            </InfoCard>

            <InfoCard icon={<MapPinIcon size={20} />} title="Location">
              Ramanattukara, Kozhikode, Kerala
            </InfoCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-64">
              <div className="bg-white p-2 rounded-3xl shadow-lg border border-slate-100 overflow-hidden h-56 md:h-full relative group">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.6841261019675!2d75.87186357481145!3d11.20967398896942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65bc93855f4a7%3A0x7e59b207a164c483!2sRamanattukara%2C%20Kerala!5e0!3m2!1sen!2sin!4v1715600000000!5m2!1sen!2sin"
                  className="w-full h-full rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  style={{ border: 0 }}
                  title="Google Maps Location"
                />
              </div>

              <div className="bg-slate-900 text-white rounded-3xl shadow-lg p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500 rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                <h4 className="font-semibold text-base mb-3 text-white">Scan to Connect</h4>
                <div className="bg-white p-1 rounded-xl mb-3">
                  <img src="/insta.png" alt="Scan QR" className="w-36 h-36 object-contain" />
                </div>
                <p className="text-slate-400 text-xs">Point your camera to visit our profile</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** * Sub-components
 */

function InputGroup({ placeholder, type = "text", value, onChange }: any) {
  return (
    <input
      type={type}
      className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-amber-500 p-3.5 rounded-xl transition-all outline-none shadow-sm text-slate-900"
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
        <div className="text-slate-700 font-semibold">{children}</div>
      </div>
    </div>
  );
}