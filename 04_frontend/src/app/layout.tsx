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
              {/* SVG Logo - Transparent Background */}
              <Link href="/" className="flex items-center">
                <img 
                  src="/logo.svg" 
                  alt="PRISH GLOBAL" 
                  className="h-14"
                />
              </Link>
              
              {/* Nav Links */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-white hover:text-[#CA9703] font-medium transition-colors">
                  Home
                </Link>
                <Link href="/about" className="text-white hover:text-[#CA9703] font-medium transition-colors">
                  About
                </Link>
                <Link href="/services" className="text-white hover:text-[#CA9703] font-medium transition-colors">
                  Services
                </Link>
                <Link href="/jobs" className="text-white hover:text-[#CA9703] font-medium transition-colors">
                  Jobs
                </Link>
                <Link href="/contact" className="text-white hover:text-[#CA9703] font-medium transition-colors">
                  Contact
                </Link>
              </div>
              
              {/* Gold CTA Button */}
              <Link 
                href="/contact" 
                className="px-6 py-2.5 rounded-lg font-bold hover:scale-105 transition-transform"
                style={{
                  background: 'linear-gradient(135deg, #CA9703 0%, #E5B84C 50%, #CA9703 100%)',
                  color: '#001220',
                  boxShadow: '0 4px 15px rgba(202, 151, 3, 0.4)'
                }}
              >
                Get Started
              </Link>
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
                  <li>info@prishglobal.com</li>
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
