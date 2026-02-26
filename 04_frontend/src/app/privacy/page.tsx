export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-24 pb-12 radial-bg">
      <div className="max-w-4xl mx-auto px-4">
        <div className="glass-card rounded-2xl p-8 md:p-12">
          <h1 className="text-4xl font-extrabold text-white mb-8">
            Privacy Policy
          </h1>

          <div className="space-y-6 text-white/70">
            <p className="text-white/40">
              <strong>Effective Date:</strong> February 22, 2026
              <br />
              <strong>Company:</strong> PRISH GLOBAL SOLUTIONS PRIVATE LIMITED
            </p>

            <h2 className="text-2xl font-bold text-phantom-gold mt-8 mb-4">
              1. Introduction
            </h2>
            <p>
              At PRISH GLOBAL SOLUTIONS, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.
            </p>

            <h2 className="text-2xl font-bold text-phantom-gold mt-8 mb-4">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact information when you submit inquiries</li>
              <li>Resume/CV information for job applications</li>
              <li>Usage data and cookies</li>
            </ul>

            <h2 className="text-2xl font-bold text-phantom-gold mt-8 mb-4">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our staffing services</li>
              <li>Match candidates with job opportunities</li>
              <li>Communicate with you about positions</li>
              <li>Respond to your inquiries</li>
            </ul>

            <h2 className="text-2xl font-bold text-phantom-gold mt-8 mb-4">
              4. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
              <strong className="text-phantom-gold">info@prishglobal.com</strong>
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/30 text-sm">
            <p>
              © {new Date().getFullYear()} PRISH GLOBAL SOLUTIONS PRIVATE LIMITED. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
