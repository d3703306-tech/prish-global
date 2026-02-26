export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 radial-bg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero */}
        <section className="text-center mb-20">
          <span className="text-phantom-gold font-semibold tracking-wider uppercase text-sm">
            About Us
          </span>
          <h1 className="text-5xl font-extrabold text-white mt-4 mb-6">
            About <span className="gradient-text">PRISH GLOBAL</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Connecting exceptional talent with world-class organizations since 2020
          </p>
        </section>

        {/* Company Story */}
        <section className="mb-20">
          <div className="glass-card rounded-3xl p-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-phantom-gold font-semibold tracking-wider uppercase text-sm">
                  Our Story
                </span>
                <h2 className="text-4xl font-extrabold text-white mt-4 mb-6">
                  Building Bridges Between Talent and Opportunity
                </h2>
                <p className="text-white/70 text-lg mb-4">
                  Founded in 2020, PRISH GLOBAL SOLUTIONS PRIVATE LIMITED began with a simple vision: to transform how companies find and hire exceptional talent.
                </p>
                <p className="text-white/70 text-lg">
                  Based in Andhra Pradesh, India, we've grown from a local staffing boutique to a global talent solutions provider.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: "5,000+", label: "Placements" },
                  { number: "200+", label: "Clients" },
                  { number: "20+", label: "Countries" },
                  { number: "98%", label: "Satisfaction" }
                ].map((stat, i) => (
                  <div key={i} className="glass-card rounded-2xl p-6 text-center">
                    <div className="text-4xl font-extrabold text-phantom-gold">{stat.number}</div>
                    <div className="text-white/60 mt-2">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20 glass border-y border-white/5 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-white">What Drives Us</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: '🎯', title: 'Excellence', desc: 'We strive for excellence in everything we do, from candidate selection to client service.' },
                { icon: '🤝', title: 'Integrity', desc: 'We build lasting relationships based on trust, transparency, and ethical practices.' },
                { icon: '🚀', title: 'Innovation', desc: 'We embrace technology to deliver cutting-edge staffing solutions.' }
              ].map((value, i) => (
                <div key={i} className="glass-card rounded-2xl p-8 text-center">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-white/60">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="glass-card rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Ready to Transform Your Career or Business?
            </h2>
            <p className="text-white/60 text-lg mt-4 mb-8">
              Join thousands of satisfied clients and candidates who trusted PRISH GLOBAL SOLUTIONS.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/jobs" className="btn-gold text-phantom-navy px-8 py-4 rounded-xl font-bold text-lg">
                Browse Jobs
              </a>
              <a href="/contact" className="btn-outline px-8 py-4 rounded-xl font-semibold text-lg">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
