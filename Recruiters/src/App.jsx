import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin, ExternalLink, Menu, X, Sun, Moon, Award, Code, Palette, Database, Cloud } from 'lucide-react';
// The main CSS file is typically imported here (e.g., import './index.css'; or in main.jsx/index.jsx)

// NOTE: This component relies entirely on Tailwind CSS utility classes for styling.
// Ensure Tailwind CSS is configured and imported in your project's main CSS file.

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false); // Unused, but kept for context
  const [activeSkillTab, setActiveSkillTab] = useState('Frontend');
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null); // Unused for canvas in current implementation, but kept for context

  // Mock data
  const skills = {
    Frontend: [
      { name: 'React', level: 95, icon: <Code className="w-6 h-6" /> },
      { name: 'Vue.js', level: 85, icon: <Code className="w-6 h-6" /> },
      { name: 'HTML5/CSS3', level: 98, icon: <Palette className="w-6 h-6" /> },
      { name: 'Tailwind CSS', level: 92, icon: <Palette className="w-6 h-6" /> },
      { name: 'JavaScript', level: 96, icon: <Code className="w-6 h-6" /> }
    ],
    Backend: [
      { name: 'Node.js', level: 88, icon: <Database className="w-6 h-6" /> },
      { name: 'Python', level: 90, icon: <Code className="w-6 h-6" /> },
      { name: 'Express', level: 85, icon: <Database className="w-6 h-6" /> },
      { name: 'MongoDB', level: 82, icon: <Database className="w-6 h-6" /> },
      { name: 'PostgreSQL', level: 78, icon: <Database className="w-6 h-6" /> }
    ],
    ML: [
      { name: 'TensorFlow', level: 75, icon: <Award className="w-6 h-6" /> },
      { name: 'PyTorch', level: 70, icon: <Award className="w-6 h-6" /> },
      { name: 'Scikit-learn', level: 80, icon: <Award className="w-6 h-6" /> },
      { name: 'OpenCV', level: 65, icon: <Award className="w-6 h-6" /> }
    ],
    Cloud: [
      { name: 'AWS', level: 85, icon: <Cloud className="w-6 h-6" /> },
      { name: 'Azure', level: 75, icon: <Cloud className="w-6 h-6" /> },
      { name: 'Google Cloud', level: 70, icon: <Cloud className="w-6 h-6" /> },
      { name: 'Docker', level: 88, icon: <Cloud className="w-6 h-6" /> },
      { name: 'Kubernetes', level: 72, icon: <Cloud className="w-6 h-6" /> }
    ]
  };

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB',
      image: 'https://placehold.co/600x400/6366f1/ffffff?text=E-Commerce+Platform',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      id: 2,
      title: 'AI Image Generator',
      description: 'Machine learning application that generates images from text prompts',
      image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=AI+Image+Generator',
      tech: ['Python', 'TensorFlow', 'React', 'Flask'],
      link: '#'
    },
    {
      id: 3,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media metrics with real-time updates',
      image: 'https://placehold.co/600x400/10b981/ffffff?text=Social+Media+Dashboard',
      tech: ['Vue.js', 'D3.js', 'Firebase', 'Chart.js'],
      link: '#'
    },
    {
      id: 4,
      title: 'Health Tracking App',
      description: 'Mobile application for tracking fitness and nutrition goals',
      image: 'https://placehold.co/600x400/f59e0b/ffffff?text=Health+Tracking+App',
      tech: ['React Native', 'Redux', 'GraphQL', 'AWS'],
      link: '#'
    }
  ];

  const experiences = [
    {
      company: 'TechCorp',
      role: 'Senior Frontend Developer',
      period: '2022 - Present',
      description: 'Leading frontend development for enterprise applications',
      logo: 'https://placehold.co/80x80/6366f1/ffffff?text=TC'
    },
    {
      company: 'InnovateStartup',
      role: 'Full Stack Developer',
      period: '2020 - 2022',
      description: 'Built and maintained web applications for startup clients',
      logo: 'https://placehold.co/80x80/8b5cf6/ffffff?text=IS'
    },
    {
      company: 'DigitalAgency',
      role: 'Junior Developer',
      period: '2018 - 2020',
      description: 'Developed websites and web applications for various clients',
      logo: 'https://placehold.co/80x80/10b981/ffffff?text=DA'
    }
  ];

  const achievements = [
    { title: 'Certified React Developer', count: 1, icon: '🏆' },
    { title: 'AWS Certified Solutions Architect', count: 1, icon: '🏅' },
    { title: 'Projects Completed', count: 47, icon: '⭐' },
    { title: 'Open Source Contributions', count: 23, icon: '🌟' }
  ];

  const blogs = [
    {
      title: 'The Future of Web Development',
      excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
      date: 'June 15, 2023',
      category: 'Technology',
      readTime: '5 min read'
    },
    {
      title: 'Mastering React Hooks',
      excerpt: 'A comprehensive guide to understanding and effectively using React Hooks in your projects.',
      date: 'May 22, 2023',
      category: 'Tutorial',
      readTime: '8 min read'
    },
    {
      title: 'Building Scalable Applications',
      excerpt: 'Best practices and architectural patterns for building applications that scale.',
      date: 'April 10, 2023',
      category: 'Architecture',
      readTime: '12 min read'
    }
  ];

  // Initialize particles
  useEffect(() => {
    const initialParticles = [];
    for (let i = 0; i < 30; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.2
      });
    }
    setParticles(initialParticles);
    
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Update particles animation
  useEffect(() => {
    if (isLoading) return;
    
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        opacity: particle.opacity + (Math.random() - 0.5) * 0.01,
        size: particle.size + (Math.random() - 0.5) * 0.05
      })).map(particle => ({
        ...particle,
        x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
        y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
        opacity: Math.min(Math.max(particle.opacity, 0.1), 0.6),
        size: Math.min(Math.max(particle.size, 0.5), 3)
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Scroll section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'blog', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  if (isLoading) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center transition-colors duration-500 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-4 border-transparent border-t-indigo-500 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600"
          >
            ALEX
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-indigo-400/20"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [particle.opacity, particle.opacity + 0.1, particle.opacity]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${darkMode ? 'bg-gray-950/80 backdrop-blur-xl' : 'bg-white/80 backdrop-blur-xl'} border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600"
            >
              ALEX CHEN
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'blog', 'contact'].map((section) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    activeSection === section 
                      ? 'text-indigo-500' 
                      : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  {activeSection === section && (
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"
                      layoutId="activeSection"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
              
              <motion.button
                onClick={toggleDarkMode}
                className="p-2 rounded-full transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
            >
              <div className="px-4 py-4 space-y-4">
                {['hero', 'about', 'skills', 'projects', 'experience', 'achievements', 'blog', 'contact'].map((section) => (
                  <motion.a
                    key={section}
                    href={`#${section}`}
                    className={`block px-3 py-2 text-sm font-medium ${
                      activeSection === section 
                        ? 'text-indigo-500' 
                        : darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ x: 10 }}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </motion.a>
                ))}
                <motion.button
                  onClick={() => {
                    toggleDarkMode();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center px-3 py-2 text-sm font-medium"
                  whileHover={{ x: 10 }}
                >
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-24 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="lg:w-1/2 mb-10 lg:mb-0"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                  Hello, I'm
                </span>
                <motion.span 
                  className="block text-5xl md:text-7xl mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Alex Chen
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Full Stack Developer & UI/UX Designer
              </motion.p>
              
              <motion.p 
                className="text-lg mb-10 max-w-xl text-gray-600 dark:text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                I create beautiful, functional, and user-centered digital experiences that solve real-world problems.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.button>
                <motion.button
                  className="px-8 py-3 border-2 border-indigo-500 text-indigo-500 font-semibold rounded-xl hover:bg-indigo-500 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Me
                </motion.button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="lg:w-2/5 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative">
                <motion.div
                  className="w-72 h-72 rounded-2xl overflow-hidden border-4 border-indigo-500/20 shadow-2xl"
                  whileHover={{ rotate: 2 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="https://placehold.co/400x400/6366f1/ffffff?text=Alex+Chen" 
                    alt="Alex Chen" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div 
                  className="absolute -top-4 -right-4 w-16 h-16 bg-purple-500 rounded-full opacity-60"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                <motion.div 
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-indigo-500 rounded-full opacity-60"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, -180, -360]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                I'm a passionate full-stack developer with over 5 years of experience creating digital solutions that make a difference. My journey began with a fascination for how things work, which led me to pursue computer science and eventually specialize in web development.
              </p>
              <p className="text-lg mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                I believe in clean, efficient code and intuitive design. My approach combines technical expertise with creative problem-solving to deliver products that not only function well but also provide exceptional user experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                {['JavaScript', 'React', 'Node.js', 'Python'].map((tech) => (
                  <motion.div
                    key={tech}
                    className="px-4 py-2 bg-indigo-500/10 text-indigo-500 rounded-full font-medium text-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className={`bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl ${darkMode ? 'border border-gray-700' : ''}`}>
                  <h3 className="text-2xl font-bold mb-6 text-indigo-500">My Journey</h3>
                  <div className="space-y-6">
                    {experiences.map((exp, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-3 h-3 bg-indigo-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-lg">{exp.period.split(' - ')[0]}</h4>
                          <p className="text-gray-600 dark:text-gray-300">{exp.role} at {exp.company}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">My Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>
          
          {/* Skill Tabs */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={`inline-flex p-1 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              {Object.keys(skills).map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveSkillTab(tab)}
                  className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                    activeSkillTab === tab
                      ? 'bg-white dark:bg-gray-700 text-indigo-500 font-semibold shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:text-indigo-500'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {skills[activeSkillTab].map((skill, index) => (
              <motion.div 
                key={skill.name}
                className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-indigo-500 mr-3">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                  <span className="font-semibold text-indigo-500">{skill.level}%</span>
                </div>
                <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <motion.div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                }`}
                whileHover={{ y: -10 }}
                onClick={() => openProjectModal(project)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm opacity-90">{project.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-indigo-500 font-semibold">
                    View Details
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Work Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 transform -translate-x-1/2"></div>
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className={`flex flex-col md:flex-row items-center mb-16 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center mb-4">
                      <img src={exp.logo} alt={exp.company} className="w-14 h-14 rounded-lg mr-4" />
                      <div>
                        <h3 className="text-lg font-bold">{exp.company}</h3>
                        <p className="text-indigo-500 font-semibold">{exp.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{exp.period}</p>
                    <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
                  </div>
                </div>
                <div className="hidden md:block w-1/12 flex justify-center">
                  <div className="w-5 h-5 bg-indigo-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Achievements</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {achievements.map((achievement, index) => (
              <motion.div 
                key={index}
                className={`p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center cursor-pointer hover:scale-105 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                }`}
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  {achievement.icon}
                </motion.div>
                <div className="text-3xl font-bold text-indigo-500 mb-2">
                  {achievement.count}
                </div>
                <h3 className="text-lg font-semibold">{achievement.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Latest Articles</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {blogs.map((blog, index) => (
              <motion.div 
                key={index}
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                }`}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full">
                      {blog.category}
                    </span>
                    <span className="ml-3 text-gray-500 dark:text-gray-400 text-sm">{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 hover:text-indigo-500 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{blog.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{blog.date}</span>
                    <span className="text-indigo-500 font-semibold flex items-center">
                      Read More
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or want to chat? I'd love to hear from you!
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-800 border border-gray-700 text-white' 
                        : 'bg-white border border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-800 border border-gray-700 text-white' 
                        : 'bg-white border border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
                <div>
                  <textarea
                    rows="5"
                    placeholder="Your Message"
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 resize-none ${
                      darkMode 
                        ? 'bg-gray-800 border border-gray-700 text-white' 
                        : 'bg-white border border-gray-300 text-gray-900'
                    }`}
                  ></textarea>
                </div>
                <motion.button
                  className="w-full px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
            
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-indigo-500">Connect With Me</h3>
                  <div className="flex space-x-4">
                    {[Github, Linkedin, Twitter, Mail].map((Icon, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          darkMode 
                            ? 'bg-gray-800 text-gray-300 hover:bg-indigo-500 hover:text-white' 
                            : 'bg-white text-gray-600 hover:bg-indigo-500 hover:text-white'
                        } shadow-lg hover:shadow-xl`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-indigo-500" />
                    Email
                  </h3>
                  <p className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300 cursor-pointer">
                    alex.chen@example.com
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-indigo-500" />
                    Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">San Francisco, CA</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-950 border-t border-gray-800' : 'bg-white border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mb-4">
              Alex Chen
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Full Stack Developer & UI/UX Designer
            </p>
            <div className="flex justify-center space-x-6 mb-8">
              {[Github, Linkedin, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-500 hover:text-indigo-500 transition-colors duration-300"
                  whileHover={{ y: -2 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <div className="pt-8">
              <p className="text-gray-500 dark:text-gray-400">
                © 2023 Alex Chen. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectModal}
          >
            <motion.div
              className={`rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <motion.button
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{selectedProject.description}</p>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <motion.button
                    className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Visit Project
                  </motion.button>
                  <motion.button
                    className="px-6 py-3 border border-indigo-500 text-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Code
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;