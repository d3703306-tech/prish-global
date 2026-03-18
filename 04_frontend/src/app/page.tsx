import Link from "next/link";
import { jobs } from "@/data/jobs";

export default function Home() {
  const featuredJobs = jobs.slice(0, 3);

  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section with Abstract Mesh Background */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Abstract Tech Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-phantom-navy via-[#001a35] to-phantom-dark"></div>
        
        {/* Mesh Grid Pattern */}
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(202,151,3,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(202,151,3,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
        
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-phantom-navy/60 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-phantom-gold/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-blue-900/30 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-20 right-20 w-[200px] h-[200px] bg-phantom-gold/5 rounded-full blur-[80px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="glass-card rounded-3xl p-10 lg:p-12" style={{backdropFilter: 'blur(20px)'}}>
              <span className="text-phantom-gold font-semibold tracking-wider uppercase text-sm block mb-4">
                Premier Staffing Solutions
              </span>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
                Connecting<span className="gradient-text"> Talent</span>
                <br />With Opportunity
              </h1>
              <p className="text-xl text-white/60 mb-8 max-w-lg">
                PRISH GLOBAL SOLUTIONS bridges the gap between exceptional talent and world-class organizations across IT, Healthcare, Engineering, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/jobs" className="btn-gold text-phantom-navy px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform">
                  Browse Jobs
                </Link>
                <Link href="/contact" className="btn-outline px-8 py-4 rounded-xl font-semibold text-lg">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Stats with enhanced glass */}
            <div className="relative hidden lg:block">
              <div className="glass-card rounded-3xl p-8" style={{
                backdropFilter: 'blur(24px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-5xl font-extrabold text-phantom-gold mb-2">5000+</div>
                    <div className="text-white/60">Placements</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-5xl font-extrabold text-phantom-gold mb-2">98%</div>
                    <div className="text-white/60">Satisfaction</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-5xl font-extrabold text-phantom-gold mb-2">20+</div>
                    <div className="text-white/60">Countries</div>
                  </div>
                  <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-5xl font-extrabold text-phantom-gold mb-2">200+</div>
                    <div className="text-white/60">Clients</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-phantom-gold/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Ticker */}
      <section className="py-8 glass border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-white/40 text-sm mb-6">TRUSTED BY INDUSTRY LEADERS</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {['Microsoft', 'Google', 'Amazon', 'Meta', 'Apple', 'Netflix'].map((company, i) => (
              <span key={i} className="text-xl font-bold text-white/60 hover:text-white transition-colors">{company}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 radial-bg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white">Why Choose PRISH GLOBAL</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🌍', title: 'Global Reach', desc: 'Operations in 20+ countries with deep local market expertise and global talent networks.' },
              { icon: '✓', title: 'Vetted Talent', desc: 'Rigorous 5-step screening process ensuring only top 5% candidates reach our clients.' },
              { icon: '💬', title: '24/7 Support', desc: 'Dedicated account managers available round the clock for urgent hiring needs.' }
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-8 text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Icons */}
      <section id="services" className="py-24 glass border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-phantom-gold font-semibold tracking-wider uppercase text-sm block mb-4">Our Services</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">Comprehensive Staffing Solutions</h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              From temporary staffing to executive search, we deliver tailored talent solutions across industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '💻', color: 'from-blue-500 to-blue-700', title: "IT Staffing", desc: "Full-stack developers, data scientists, cloud engineers, and tech leadership." },
              { icon: '🏥', color: 'from-red-500 to-red-700', title: "Healthcare Staffing", desc: "Nurses, physicians, medical technicians, and healthcare administrators." },
              { icon: '⚙️', color: 'from-gray-500 to-gray-700', title: "Engineering", desc: "Mechanical, electrical, civil, and process engineers." },
              { icon: '🏭', color: 'from-orange-500 to-orange-700', title: "Manufacturing", desc: "Skilled workers, supervisors, and operations managers." },
              { icon: '🛒', color: 'from-green-500 to-green-700', title: "Retail & Hospitality", desc: "Customer service reps, managers, and hospitality professionals." },
              { icon: '📊', color: 'from-purple-500 to-purple-700', title: "Finance & Accounting", desc: "CPAs, financial analysts, controllers, and accounting professionals." },
            ].map((service, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 hover:scale-[1.02] transition-all cursor-pointer group">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/60">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-24 radial-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-phantom-gold font-semibold tracking-wider uppercase text-sm block mb-4">Latest Opportunities</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white">Featured Positions</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <div key={job.id} className="glass-card rounded-2xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                    <p className="text-phantom-gold font-medium">{job.company}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-phantom-gold/10 text-phantom-gold text-sm font-medium">
                    {job.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-3 text-white/50 text-sm mb-4">
                  <span>📍 {job.location}</span>
                  <span>💰 {job.salary}</span>
                </div>
                
                <p className="text-white/60 text-sm line-clamp-2 mb-6">{job.description}</p>
                
                <Link 
                  href={job.applyLink} 
                  className="btn-gold w-full text-center block py-3 rounded-xl font-bold text-sm"
                >
                  Contact to Apply
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/jobs" className="btn-outline px-8 py-4 rounded-xl font-semibold text-lg inline-block">
              View All Jobs →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 glass border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-phantom-gold font-semibold tracking-wider uppercase text-sm block mb-4">Testimonials</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white">Trusted by Industry Leaders</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "PRISH GLOBAL SOLUTIONS transformed our hiring process. They delivered exceptional talent within weeks.", name: "Sarah Johnson", role: "CTO, TechCorp Inc." },
              { quote: "Their healthcare staffing expertise is unmatched. They helped us scale during critical demand periods.", name: "Dr. Michael Chen", role: "Hospital Director" },
              { quote: "Professional, responsive, and truly understand our industry needs. A true strategic partner.", name: "Robert Williams", role: "HR Director" },
            ].map((testimonial, index) => (
              <div key={index} className="glass-card rounded-2xl p-8">
                <div className="text-5xl text-phantom-gold mb-4">"</div>
                <p className="text-white/80 text-lg mb-6">{testimonial.quote}</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-white/40 text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 radial-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-12 text-center" style={{backdropFilter: 'blur(24px)'}}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Join thousands of professionals who found their dream jobs through PRISH GLOBAL SOLUTIONS.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/jobs" className="btn-gold text-phantom-navy px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform">
                Browse Jobs
              </Link>
              <Link href="/contact" className="btn-outline px-8 py-4 rounded-xl font-semibold text-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
