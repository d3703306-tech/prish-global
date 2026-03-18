import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PRISH GLOBAL SOLUTIONS - Premier Staffing & HR Solutions",
  description: "Global staffing solutions connecting top talent with world-class companies. IT, Healthcare, Engineering & more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body text-white" style={{background: '#001F3F'}}>
        {/* Glassmorphism Navigation - Deep Navy Background */}
        <nav className="fixed top-0 w-full z-50" style={{background: 'rgba(0, 31, 63, 0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo with Brand Image */}
              <Link href="/" className="flex items-center gap-3">
                <img
                  src="/logo-icon.svg"
                  alt="PRISH GLOBAL"
                  className="h-12 w-auto"
                />
                <div className="hidden lg:block">
                  <span className="text-white font-bold text-lg">PRISH</span>
                  <span className="text-phantom-gold font-bold text-lg">GLOBAL</span>
                </div>
              </Link>

              {/* Phone Number - Visible Call to Action */}
              <div className="hidden lg:flex items-center gap-2">
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-phantom-gold/10 border border-phantom-gold/30 hover:bg-phantom-gold/20 transition-all"
                >
                  <span className="text-phantom-gold text-lg">📱</span>
                  <span className="text-white font-semibold">+91 98765 43210</span>
                </a>
              </div>

              {/* Nav Links */}
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-white hover:text-[#CA9703] font-medium transition-colors text-sm">
                  Home
                </Link>
                <Link href="/about" className="text-white hover:text-[#CA9703] font-medium transition-colors text-sm">
                  About
                </Link>
                <Link href="/services" className="text-white hover:text-[#CA9703] font-medium transition-colors text-sm">
                  Services
                </Link>
                <Link href="/jobs" className="text-white hover:text-[#CA9703] font-medium transition-colors text-sm">
                  Jobs
                </Link>
                <Link href="/contact" className="text-white hover:text-[#CA9703] font-medium transition-colors text-sm">
                  Contact
                </Link>
              </div>

              {/* Gold CTA Button */}
              <a
                href="tel:+919876543210"
                className="px-5 py-2.5 rounded-lg font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #CA9703 0%, #E5B84C 50%, #CA9703 100%)',
                  color: '#001220',
                  boxShadow: '0 4px 15px rgba(202, 151, 3, 0.4)'
                }}
              >
                <span>📞</span>
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </nav>

        {children}

        {/* Glass Footer - Deep Navy */}
        <footer className="py-12" style={{background: '#001220', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <img src="/logo.svg" alt="PRISH" className="h-10 mb-4" />
                <p className="text-white/50 text-sm">
                  Premier staffing solutions connecting top talent with world-class organizations globally.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2 text-white/50 text-sm">
                  <li><Link href="/" className="hover:text-[#CA9703] transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-[#CA9703] transition-colors">About Us</Link></li>
                  <li><Link href="/services" className="hover:text-[#CA9703] transition-colors">Services</Link></li>
                  <li><Link href="/jobs" className="hover:text-[#CA9703] transition-colors">Jobs</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Contact</h4>
                <ul className="space-y-2 text-white/50 text-sm">
                  <li>Flat No 402, KPHB Maruthi Apartments</li>
                  <li>Gandigunta, Andhra Pradesh</li>
                  <li>
                    <a href="mailto:info@prishglobal.com" className="hover:text-[#CA9703] transition-colors">
                      info@prishglobal.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+919876543210" className="hover:text-[#CA9703] transition-colors flex items-center gap-1">
                      <span>📱</span> +91 98765 43210
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-white/50 text-sm">
                  <li><Link href="/privacy" className="hover:text-[#CA9703] transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-[#CA9703] transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/30 text-sm">
              <p>&copy; {new Date().getFullYear()} PRISH GLOBAL SOLUTIONS PRIVATE LIMITED. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
