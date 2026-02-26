"use client";

import { useState } from "react";
import Link from "next/link";
import { jobs } from "@/data/jobs";

const categories = ["All", "Technology", "Finance", "Healthcare", "Marketing", "Engineering", "Human Resources"];

export default function JobsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen pt-24 pb-20 radial-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-4">
            Find Your <span className="gradient-text">Dream Job</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Browse hundreds of opportunities from top companies. Your next career move starts here.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="glass-card rounded-2xl p-6 mb-10">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs by title, company, or location..."
                className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-phantom-gold focus:outline-none transition-colors text-lg"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-phantom-gold text-phantom-navy"
                    : "glass border border-white/10 text-white/70 hover:border-phantom-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-white/50 mb-6">{filteredJobs.length} jobs available</p>

        {/* Jobs Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredJobs.map(job => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="glass-card rounded-2xl p-6 cursor-pointer hover:scale-[1.01] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                  <p className="text-phantom-gold font-medium">{job.company}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-phantom-gold/10 text-phantom-gold text-sm font-medium">
                  {job.type}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 text-white/50 text-sm mb-4">
                <span>📍 {job.location}</span>
                <span>💰 {job.salary}</span>
                <span>🕐 {job.posted}</span>
              </div>
              
              <p className="text-white/60 text-sm line-clamp-2">{job.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {job.requirements.slice(0, 3).map((req, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-white/5 text-white/50 text-xs">
                    {req}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Job Detail Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedJob(null)}
            />
            <div className="relative glass-card rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white text-2xl"
              >
                ✕
              </button>
              
              <div className="mb-6">
                <span className="px-3 py-1 rounded-full bg-phantom-gold/10 text-phantom-gold text-sm font-medium">
                  {selectedJob.category}
                </span>
              </div>
              
              <h2 className="text-3xl font-extrabold text-white mb-2">{selectedJob.title}</h2>
              <p className="text-xl text-phantom-gold font-medium mb-6">{selectedJob.company}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="glass rounded-xl p-4">
                  <div className="text-white/50 text-sm">Location</div>
                  <div className="text-white font-semibold">{selectedJob.location}</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-white/50 text-sm">Salary</div>
                  <div className="text-white font-semibold">{selectedJob.salary}</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-white/50 text-sm">Type</div>
                  <div className="text-white font-semibold">{selectedJob.type}</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-white/50 text-sm">Posted</div>
                  <div className="text-white font-semibold">{selectedJob.posted}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-3">Description</h3>
                <p className="text-white/70">{selectedJob.description}</p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-center text-white/70">
                      <span className="text-phantom-gold mr-2">✓</span> {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link 
                href="/contact" 
                className="btn-gold text-phantom-navy px-8 py-4 rounded-xl font-bold text-lg w-full text-center block"
              >
                Contact to Apply
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
