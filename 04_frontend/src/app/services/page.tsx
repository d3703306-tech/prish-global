const services = [
  {
    icon: "💻",
    title: "IT Staffing",
    description: "Full-stack developers, data scientists, cloud engineers, and tech leadership for digital transformation.",
    features: ["Software Engineers", "Data Scientists", "DevOps Engineers", "Cloud Architects"]
  },
  {
    icon: "🏥",
    title: "Healthcare Staffing",
    description: "Nurses, physicians, medical technicians, and healthcare administrators for hospitals and clinics.",
    features: ["Registered Nurses", "Physicians", "Medical Technicians", "Healthcare Admins"]
  },
  {
    icon: "⚙️",
    title: "Engineering",
    description: "Mechanical, electrical, civil, and process engineers for manufacturing and infrastructure.",
    features: ["Mechanical Engineers", "Electrical Engineers", "Civil Engineers", "Process Engineers"]
  },
  {
    icon: "🏭",
    title: "Manufacturing",
    description: "Skilled workers, supervisors, and operations managers for factories and production facilities.",
    features: ["Production Supervisors", "Quality Managers", "Supply Chain", "Operations Managers"]
  },
  {
    icon: "🛒",
    title: "Retail & Hospitality",
    description: "Customer service representatives, managers, and hospitality professionals.",
    features: ["Store Managers", "Customer Service", "Hotel Managers", "Event Coordinators"]
  },
  {
    icon: "📊",
    title: "Finance & Accounting",
    description: "CPAs, financial analysts, controllers, and accounting professionals.",
    features: ["Financial Analysts", "CPAs", "Controllers", "Auditors"]
  }
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 radial-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-phantom-gold font-semibold tracking-wider uppercase text-sm">
            Our Services
          </span>
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white mt-4">
            Comprehensive Staffing Solutions
          </h1>
          <p className="text-xl text-white/60 mt-4 max-w-2xl mx-auto">
            From temporary staffing to executive search, we deliver tailored talent solutions across industries.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all">
              <div className="text-5xl mb-6">{service.icon}</div>
              <h2 className="text-2xl font-bold text-white mb-3">{service.title}</h2>
              <p className="text-white/70 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-white/50">
                    <span className="text-phantom-gold mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 glass-card rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-extrabold text-white">Need Staffing Solutions?</h2>
          <p className="text-white/60 text-lg mt-4">
            Let us help you find the perfect talent for your organization.
          </p>
          <div className="mt-8">
            <a href="/contact" className="btn-gold text-phantom-navy px-8 py-4 rounded-xl font-bold text-lg inline-block">
              Contact Us Today
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
