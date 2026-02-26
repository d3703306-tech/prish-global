"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen pt-24 pb-20 radial-bg">
        <div className="max-w-2xl mx-auto px-4">
          <div className="glass-card rounded-3xl p-12 text-center">
            <span className="text-7xl block mb-6">✅</span>
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Message Sent!
            </h2>
            <p className="text-white/60 mb-8">
              Thank you for reaching out. We'll get back to you within 24 hours!
            </p>
            <a href="/" className="btn-gold px-8 py-3 rounded-xl font-bold inline-block">
              Back to Home
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20 radial-bg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-white mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-white/60">
            Have questions about our staffing services? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div>
            <div className="glass-card rounded-3xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📍</span>
                  <div>
                    <h3 className="font-bold text-white">Our Office</h3>
                    <p className="text-white/50">Flat No 402, KPHB Maruthi Apartments<br />Gandigunta, Andhra Pradesh, India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📧</span>
                  <div>
                    <h3 className="font-bold text-white">Email Us</h3>
                    <p className="text-white/50">info@prishglobal.com<br />careers@prishglobal.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <span className="text-3xl">📞</span>
                  <div>
                    <h3 className="font-bold text-white">Call Us</h3>
                    <p className="text-white/50">+1 (555) 123-4567<br />+91 98765 43210</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-white/70 mb-2 font-medium">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-phantom-gold focus:outline-none"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-white/70 mb-2 font-medium">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-phantom-gold focus:outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/70 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-phantom-gold focus:outline-none"
                  placeholder="john@company.com"
                />
              </div>
              
              <div>
                <label className="block text-white/70 mb-2 font-medium">Subject</label>
                <select
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-phantom-gold focus:outline-none"
                >
                  <option value="" className="bg-phantom-navy">Select a subject...</option>
                  <option value="General Inquiry" className="bg-phantom-navy">General Inquiry</option>
                  <option value="Staffing Services" className="bg-phantom-navy">Staffing Services</option>
                  <option value="Partnership" className="bg-phantom-navy">Partnership Opportunity</option>
                  <option value="Careers" className="bg-phantom-navy">Careers</option>
                  <option value="Other" className="bg-phantom-navy">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-white/70 mb-2 font-medium">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-phantom-gold focus:outline-none resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              
              <button
                type="submit"
                className="w-full btn-gold text-phantom-navy px-8 py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
