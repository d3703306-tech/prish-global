/**
 * PRISH GLOBAL SOLUTIONS - Jobs API
 * Job listings endpoint
 */

import { NextRequest, NextResponse } from 'next/server';

// Sample job data (in production, this comes from database)
const jobs = [
  {
    id: "job_001",
    title: "Senior Full Stack Developer",
    company: "TechCorp Inc.",
    location: "Dallas, TX (Hybrid)",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description: "We're looking for an experienced Full Stack Developer to join our team.",
    requirements: ["5+ years experience", "React", "Node.js", "TypeScript"],
    postedAt: "2026-02-20",
    category: "IT"
  },
  {
    id: "job_002",
    title: "Data Scientist",
    company: "DataDriven LLC",
    location: "Remote",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    description: "Join our data science team to build ML models.",
    requirements: ["Python", "TensorFlow", "SQL", "Statistics"],
    postedAt: "2026-02-19",
    category: "IT"
  },
  {
    id: "job_003",
    title: "Registered Nurse",
    company: "City Medical Center",
    location: "Houston, TX",
    type: "Full-time",
    salary: "$80,000 - $100,000",
    description: "Seeking experienced RNs for our growing hospital.",
    requirements: ["RN License", "BLS/ACLS", "2+ years experience"],
    postedAt: "2026-02-18",
    category: "Healthcare"
  },
  {
    id: "job_004",
    title: "Mechanical Engineer",
    company: "BuildTech Solutions",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    description: "Looking for a mechanical engineer with manufacturing experience.",
    requirements: ["BS Mechanical Engineering", "CAD", "Manufacturing"],
    postedAt: "2026-02-17",
    category: "Engineering"
  },
  {
    id: "job_005",
    title: "DevOps Engineer",
    company: "CloudFirst Inc.",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    description: "Join our DevOps team to build scalable infrastructure.",
    requirements: ["AWS", "Kubernetes", "CI/CD", "Terraform"],
    postedAt: "2026-02-16",
    category: "IT"
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  let filteredJobs = [...jobs];

  // Filter by category
  if (category && category !== 'all') {
    filteredJobs = filteredJobs.filter(job => 
      job.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by search
  if (search) {
    const searchLower = search.toLowerCase();
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower)
    );
  }

  return NextResponse.json({
    jobs: filteredJobs,
    total: filteredJobs.length
  });
}
