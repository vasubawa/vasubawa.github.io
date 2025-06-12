/**
 * Portfolio Data
 * Centralized data store for portfolio content that can be used
 * by both the terminal and React components
 */

const portfolioData = {
  /**
   * Basic personal information
   */
  personal: {
    name: "Dhruv",
    fullName: "Dhruv Sharma",
    title: "Software Developer",
    location: "United States",
    email: "contact@example.com", 
    github: "https://github.com/vasubawa",
    linkedin: "https://linkedin.com/in/DhruvSharma2000", 
  },
  
  /**
   * Experience entries
   */
  experience: [
    {
      company: "Tech Company",
      position: "Software Engineer",
      period: "2023 - Present",
      description: "Working on full-stack web applications using React, Node.js and MongoDB.",
      technologies: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      company: "Previous Company",
      position: "Junior Developer",
      period: "2021 - 2023",
      description: "Developed and maintained web applications.",
      technologies: ["JavaScript", "HTML", "CSS", "Python"]
    }
  ],
  
  /**
   * Education entries
   */
  education: [
    {
      institution: "University Name",
      degree: "Bachelor of Science in Computer Science",
      period: "2025",
    }
  ],
  
  /**
   * Project entries
   */
  projects: [
    {
      name: "Portfolio Website",
      description: "A dual-mode portfolio website with terminal and GUI interfaces",
      technologies: ["React", "JavaScript", "HTML", "CSS"],
      link: "https://vasubawa.github.io",
      github: "https://github.com/vasubawa/vasubawa.github.io"
    },
  ],
  
  /**
   * Technical skills
   */
  skills: {
    languages: [
      { name: "JavaScript", description: "A versatile programming language used for web development, both frontend and backend." },
      { name: "TypeScript", description: "A statically typed superset of JavaScript that adds type safety." },
      { name: "Python", description: "A high-level, versatile language known for readability and use in data science, web development, and automation." },
      { name: "Java", description: "Object-oriented programming language used for enterprise applications and Android development." },
      { name: "HTML", description: "Markup language for creating web pages and applications." },
      { name: "CSS", description: "Style sheet language used for describing the presentation of a document." }
    ],
    frameworks: [
      { name: "React", description: "A JavaScript library for building user interfaces, particularly single-page applications." },
      { name: "Node.js", description: "A JavaScript runtime for server-side programming." },
      { name: "Express", description: "A minimal and flexible Node.js web application framework." },
      { name: "Next.js", description: "A React framework for production that enables server-side rendering and static site generation." }
    ],
    tools: [
      { name: "Git", description: "A distributed version control system for tracking changes in source code." },
      { name: "VS Code", description: "A lightweight but powerful source code editor." },
      { name: "Docker", description: "A platform for developing, shipping, and running applications in containers." },
      { name: "Linux", description: "An open-source operating system known for its stability and security." }
    ],
    databases: [
      { name: "MongoDB", description: "A NoSQL database that uses JSON-like documents with optional schemas." },
      { name: "PostgreSQL", description: "A powerful, open-source object-relational database system." },
      { name: "MySQL", description: "An open-source relational database management system." }
    ],
  },
  
  /**
   * Contact information
   */
  contact: {
    email: "contact@example.com", // Replace with your actual email
    socials: {
      github: "https://github.com/vasubawa",
      linkedin: "https://linkedin.com/in/yourprofile", // Replace with your actual profile
      twitter: "https://twitter.com/yourhandle" // Replace with your actual handle
    }
  },
  
  /**
   * Quote to display in terminal
   */
  quotes: [
    "The best way to predict the future is to invent it.",
    "Code is like humor. When you have to explain it, it's bad.",
    "First, solve the problem. Then, write the code.",
    "Make it work, make it right, make it fast."
  ]
};

// Export the portfolio data
export default portfolioData;

// Make data available globally in browser environment for backward compatibility
try {
  window.portfolioData = portfolioData;
} catch {
  // window is not defined (e.g., in Node.js), ignore error
}