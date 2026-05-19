/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, 
  X, 
  Search, 
  Award, 
  Briefcase, 
  TrendingUp, 
  Megaphone, 
  FileText, 
  Users, 
  Linkedin, 
  Mail, 
  Instagram, 
  Twitter,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Code,
  PenTool,
  BarChart3,
  Rocket,
  Star,
  ArrowLeft,
  Filter
} from 'lucide-react';

// --- Types & Constants ---
interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
}

interface Skill {
  name: string;
  icon: any;
  level: number;
}

const PROJECTS: Project[] = [
  {
    title: "Brand Elevation 2024",
    category: "Branding Strategy",
    description: "Revitalized a tech startup's visual identity, resulting in a 40% increase in brand recognition.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "EcoFlow SEO Campaign",
    category: "SEO Optimization",
    description: "Organic traffic growth for a sustainable energy brand using advanced keyword targeting.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Luxe Social Growth",
    category: "Social Media Marketing",
    description: "Grew a luxury fashion account from 10k to 150k followers in 6 months through content strategy.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "MarketInsights App",
    category: "Marketing Research",
    description: "Designed and executed a comprehensive market entry research paper for a fintech firm.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  }
];

const SKILLS: Skill[] = [
  { name: "SEO Optimization", icon: TrendingUp, level: 95 },
  { name: "Social Media Marketing", icon: Users, level: 90 },
  { name: "Content Writing", icon: FileText, level: 85 },
  { name: "Branding Strategy", icon: Award, level: 88 },
  { name: "Marketing Research", icon: Search, level: 82 },
  { name: "Brand Positioning", icon: Rocket, level: 92 }
];

const SERVICES = [
  { title: "SEO Strategy", description: "Comprehensive search engine optimization to drive organic growth.", icon: TrendingUp },
  { title: "Social Media Management", description: "Strategic content planning and engagement across all platforms.", icon: Megaphone },
  { title: "Content Creation", description: "High-impact storytelling and visual content for digital brands.", icon: PenTool },
  { title: "Brand Positioning", description: "Defining and communicating your unique value in the marketplace.", icon: Rocket }
];

const JOURNEY = [
  { year: "2021", title: "Marketing Graduate", description: "Graduated with honors, focusing on digital consumer behavior and market psychology.", icon: Award },
  { year: "2022", title: "Global Agency Internship", description: "Learned the ropes of SEO and content strategy at a top-tier digital firm.", icon: Briefcase },
  { year: "2023", title: "Digital Marketing Certification", description: "Completed Digital Marketing course from HubSpot Academy, mastering various aspects of social media marketing and growth techniques.", icon: Award },
  { year: "2024", title: "SEO Specialization", description: "Earned SEO Certification from HubSpot Academy, acquiring advanced techniques for search engine optimization and organic growth.", icon: Search }
];

const TESTIMONIALS = [
  { name: "Sarah Jenkins", role: "CEO, TechBloom", text: "Hadiqa transformed our brand identity. Her SEO strategy alone increased our leads by 300% in just three months." },
  { name: "Marcus Thorne", role: "Founder, EcoFlow", text: "Exceptional creativity and discipline. She doesn't just market; she tells a story that resonates." },
  { name: "Elena Rodriguez", role: "Marketing Director, Luxe", text: "The best ROI we've ever seen on a branding campaign. Her passion for growth is contagious." }
];

// --- Sub-components ---

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  key?: string | number;
}

const FadeIn = ({ children, delay = 0, direction = 'up' }: FadeInProps) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0
    },
    visible: { opacity: 1, y: 0, x: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.215, 0.61, 0.355, 1] }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: isHomePage ? '#home' : '/' },
    { name: 'About', href: isHomePage ? '#about' : '/#about' },
    { name: 'Skills', href: isHomePage ? '#skills' : '/#skills' },
    { name: 'Marketing Projects', href: isHomePage ? '#projects' : '/#projects' },
    { name: 'Certifications', href: isHomePage ? '#certifications' : '/#certifications' },
    { name: 'Resume', href: '/resume' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') && isHomePage) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || !isHomePage ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/"
          className="text-2xl font-display font-bold text-navy"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Hadiqa<span className="text-purple-rich">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {link.href.startsWith('#') || (link.href.startsWith('/#') && isHomePage) ? (
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-medium text-navy/70 hover:text-purple-rich transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-navy/70 hover:text-purple-rich transition-colors"
                >
                  {link.name}
                </Link>
              )}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="px-6 py-2.5 rounded-full gradient-purple-coral text-white text-sm font-bold shadow-lg shadow-purple-soft/20 hover:scale-105 transition-transform"
            >
              Hire Me
            </a>
          </motion.div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-navy"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-navy/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                link.href.startsWith('#') || (link.href.startsWith('/#') && isHomePage) ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-lg font-medium text-navy hover:text-purple-rich"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-medium text-navy hover:text-purple-rich"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex flex-col pt-28 overflow-hidden bg-soft-white">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-rich/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[20%] left-[-5%] w-96 h-96 bg-coral/10 rounded-full blur-3xl" />

      <div className="flex-grow flex items-center">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10">
            <FadeIn direction="right">
              <h2 className="text-navy font-display font-bold text-5xl lg:text-7xl mb-8 leading-tight">
                Hy! I Am <br />
                <span className="text-navy">Hadiqa <span className="text-purple-rich">Iftekhar</span></span>
              </h2>
              <p className="text-lg text-navy/50 max-w-lg mb-10 leading-relaxed font-medium">
                Digital marketing and branding professional helping brands grow through creative strategy, SEO, and content marketing.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-12">
                <a href="#contact" className="px-10 py-4 rounded-xl gradient-purple-coral text-white font-bold shadow-2xl shadow-purple-rich/30 hover:scale-105 transition-transform flex items-center gap-2">
                  Hire Me
                </a>
                <Link to="/resume" className="px-10 py-4 rounded-xl bg-white border-2 border-navy/5 text-navy font-bold hover:bg-navy/5 shadow-lg shadow-navy/5 transition-all flex items-center gap-2">
                  View Resume <FileText size={20} />
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-navy/5 max-w-sm">
                 <div className="w-14 h-14 rounded-2xl bg-lavender-muted flex items-center justify-center text-purple-rich shrink-0">
                    <Rocket size={24} />
                 </div>
                 <p className="text-sm font-bold text-navy/60 leading-tight">
                   Digital Marketing & Branding specialist with a focus on SEO & Social Strategy.
                 </p>
              </div>
            </FadeIn>
          </div>

          <div className="relative">
            <FadeIn direction="left" delay={0.2}>
              <div className="relative z-10">
                {/* Diagonal Split Background */}
                <div className="absolute top-[15%] left-[10%] w-[90%] h-[85%] bg-purple-rich rounded-[40px] diagonal-split -z-10 shadow-2xl" />
                
                <div className="relative rounded-[40px] overflow-hidden group">
                  <img 
                    src="/src/assets/images/hadiqa_professional_portrait_1779174120631.png" 
                    alt="Hadiqa Iftekhar" 
                    className="w-full transition-all duration-1000 aspect-[4/5] object-cover scale-[1.02]"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent opacity-60" />
                </div>
              </div>

              {/* Floating Cards - Inspired by reference */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 }
                }}
                className="absolute top-1/4 -right-12 glass p-6 rounded-3xl shadow-2xl z-20 border-white/40"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-yellow-400 text-white flex items-center justify-center shadow-lg">
                    <Award size={24} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-navy/50 text-center leading-none">Best Marketing<br/>Strategy</span>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Specialties Grid Section (Inspired by reference) */}
      <div className="bg-white py-16 -mt-12 relative z-20 rounded-t-[60px] shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "SEO Specialist", desc: "Driving high-intent organic traffic through advanced optimization and research.", icon: TrendingUp, color: "text-green-500", bg: "bg-green-50" },
              { title: "Social Strategy", desc: "Building communities and viral presence through creative story-telling.", icon: Users, color: "text-orange-500", bg: "bg-orange-50" },
              { title: "Marketing Strategies", desc: "Developing data-driven growth plans and conversion optimization for modern brands.", icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" }
            ].map((item, i) => (
              <FadeIn key={item.title} delay={0.1 + (i * 0.1)}>
                <div className="p-8 h-full flex flex-col items-start hover:bg-lavender-muted/30 transition-colors rounded-3xl group">
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-navy/50 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* Client Logos Strip */}
      <div className="py-12 bg-white border-t border-navy/5 opacity-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-12 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-2xl font-black tracking-tighter">SCHWIND</span>
            <span className="text-2xl font-bold font-display italic">Behance</span>
            <span className="text-2xl font-bold flex items-center gap-1"><div className="w-6 h-6 rounded-full bg-navy" /> WERUM</span>
            <span className="text-2xl font-black text-green-600">Upwork</span>
          </div>
        </div>
      </div>

      {/* Quick Contact Middle Section */}
      <div className="bg-lavender-muted/30 py-8 border-y border-navy/5">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              <a href="mailto:iftekharhadiqa@gmail.com" className="flex items-center gap-3 group">
                 <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-purple-rich group-hover:bg-purple-rich group-hover:text-white transition-all">
                    <Mail size={18} />
                 </div>
                 <span className="text-sm font-bold text-navy/60 group-hover:text-navy transition-colors">iftekharhadiqa@gmail.com</span>
              </a>
              <div className="hidden md:block h-4 w-px bg-navy/10"></div>
              <a href="https://www.linkedin.com/in/hadiqaiftekhar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                 <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-navy group-hover:bg-[#0077b5] group-hover:text-white transition-all">
                    <Linkedin size={18} />
                 </div>
                 <span className="text-sm font-bold text-navy/60 group-hover:text-navy transition-colors">linkedin.com/in/hadiqaiftekhar</span>
              </a>
           </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <FadeIn direction="right">
            <div className="relative group">
              <div className="rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5] relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800" 
                  alt="Creative Workspace" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-purple-rich/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute top-1/2 -left-12 w-24 h-24 bg-coral/10 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-purple-rich/5 rounded-full blur-3xl -z-10" />
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 glass p-8 rounded-3xl shadow-xl z-20 max-w-[240px] border-white/40"
              >
                <div className="flex items-center gap-4 mb-3">
                   <div className="w-10 h-10 rounded-xl bg-coral text-white flex items-center justify-center">
                      <Star size={20} />
                   </div>
                   <span className="text-xs font-black uppercase tracking-widest text-navy/40 leading-none">The Brand<br/>Philosophy</span>
                </div>
                <p className="text-sm font-bold italic text-navy leading-relaxed">
                  "I don't just build presence; I engineer authority through strategic storytelling."
                </p>
              </motion.div>
            </div>
          </FadeIn>

          <div className="z-10">
            <FadeIn>
              <span className="text-purple-rich font-black tracking-[0.3em] text-xs uppercase mb-6 block opacity-80">Personal Story</span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-10 leading-[1.1]">
                Bridging the Gap between <span className="text-gradient">Data</span> and <span className="text-coral">Creativity</span>.
              </h2>
              <div className="space-y-6 text-lg text-navy/60 leading-relaxed font-medium">
                <p>
                  As a Digital Marketing & Branding specialist, I believe that every brand has a heart—a unique narrative that sets it apart. My goal is to find that heartbeat and amplify it through data-backed strategies.
                </p>
                <p>
                  With a solid foundation in marketing research and SEO, I combine technical precision with design-thinking to build digital identities that aren't just beautiful, but are engineered for growth.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="space-y-2">
                  <div className="text-4xl font-black text-navy">10k+</div>
                  <div className="text-xs text-navy/40 font-black uppercase tracking-widest leading-tight">Organic Leads<br/>Generated</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-black text-navy">95%</div>
                  <div className="text-xs text-navy/40 font-black uppercase tracking-widest leading-tight">Client Satisfaction<br/>Rate</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 bg-soft-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-rich/5 rounded-full blur-3xl -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <FadeIn direction="right">
            <span className="text-purple-rich font-black tracking-[0.3em] text-xs uppercase mb-6 block opacity-80">Main Expertise</span>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Mastering the <span className="text-coral">Digital</span> <br />Landscape.</h2>
          </FadeIn>
          <FadeIn direction="left">
             <p className="text-lg text-navy/50 max-w-sm mb-2 font-medium leading-relaxed">
               Constantly evolving my toolkit to deliver results that exceed modern industry standards.
             </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SKILLS.map((skill, i) => (
            <FadeIn key={skill.name} delay={i * 0.1}>
              <div className="glass p-10 rounded-[40px] shadow-sm hover:shadow-2xl hover:shadow-purple-rich/10 transition-all duration-500 group border-white/50">
                <div className="w-16 h-16 rounded-3xl bg-white text-navy shadow-sm flex items-center justify-center mb-10 group-hover:bg-purple-rich group-hover:text-white transition-all duration-500">
                  <skill.icon size={28} />
                </div>
                <div className="flex justify-between items-end mb-4">
                   <h3 className="text-xl font-bold">{skill.name}</h3>
                   <span className="text-sm font-black text-purple-rich opacity-40">{skill.level}%</span>
                </div>
                <div className="relative h-1.5 bg-navy/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                    className="absolute inset-0 gradient-purple-coral"
                  />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const MarketingProjects = () => {
  return (
    <section id="projects" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <FadeIn direction="right">
            <span className="text-purple-rich font-black tracking-[0.3em] text-xs uppercase mb-6 block opacity-80">Portfolio</span>
            <h2 className="text-4xl lg:text-5xl font-bold">Marketing <span className="text-gradient">Projects</span>.</h2>
          </FadeIn>
          <FadeIn direction="left">
            <Link to="/projects" className="flex items-center gap-3 font-black text-xs uppercase tracking-widest text-navy hover:text-purple-rich transition-all group">
              View All Projects <div className="w-10 h-10 rounded-full border border-navy/10 flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-all"><ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" /></div>
            </Link>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.15}>
              <div className="group cursor-pointer">
                <div className="relative h-[500px] rounded-[60px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 mb-8 aspect-square md:aspect-auto">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/40 transition-colors duration-500" />
                  
                  {/* Category over image */}
                  <div className="absolute top-10 left-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <span className="glass px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest text-navy border-white/40">{project.category}</span>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                     <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-white/70 max-w-xs text-sm font-medium">{project.description}</p>
                     </div>
                     <button className="w-16 h-16 rounded-full glass flex items-center justify-center text-navy opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 border-white/40">
                        <ExternalLink size={24} />
                     </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 bg-soft-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <FadeIn>
             <span className="text-purple-rich font-black tracking-[0.3em] text-xs uppercase mb-6 block opacity-80">Strategic Solutions</span>
             <h2 className="text-4xl lg:text-5xl font-bold mb-8">Premium Services for <span className="text-coral">Modern</span> Brands.</h2>
             <p className="text-lg text-navy/50 font-medium">
               Tailored marketing ecosystem designed to drive impact, authority, and long-term brand equity.
             </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
           {SERVICES.map((service, i) => (
             <FadeIn key={service.title} delay={i * 0.1}>
                <div className="glass p-12 rounded-[50px] h-full flex flex-col items-start hover:-translate-y-4 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-purple-rich/5 border-white/50 group">
                   <div className="w-20 h-20 rounded-[30px] bg-white shadow-sm flex items-center justify-center mb-10 text-purple-rich group-hover:scale-110 transition-transform duration-500">
                      <service.icon size={36} />
                   </div>
                   <h3 className="text-2xl font-bold mb-6">{service.title}</h3>
                   <p className="text-navy/60 leading-relaxed font-medium mb-10">{service.description}</p>
                   <div className="mt-auto">
                      <a href="#contact" className="text-xs font-black uppercase tracking-widest text-purple-rich hover:text-navy flex items-center gap-2 group/btn">
                        Learn More <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                   </div>
                </div>
             </FadeIn>
           ))}
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-32 bg-soft-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <FadeIn>
            <span className="text-purple-rich font-black tracking-[0.3em] text-xs uppercase mb-6 block opacity-80">Achievements</span>
            <h2 className="text-4xl lg:text-5xl font-bold">Professional <span className="text-gradient">Certifications</span>.</h2>
          </FadeIn>
        </div>

        <div className="max-w-4xl mx-auto relative px-4">
          {/* Vertical line with gradient */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 gradient-purple-coral opacity-10 -translate-x-1/2 rounded-full" />

          <div className="space-y-20 relative">
            {JOURNEY.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.15} direction={i % 2 === 0 ? 'right' : 'left'}>
                <div className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 w-full">
                    <div className={`glass p-10 rounded-[40px] relative hover:shadow-2xl hover:shadow-purple-rich/5 transition-all duration-500 border-white/50 group ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className={`inline-block px-4 py-1.5 rounded-full bg-lavender-muted text-purple-rich text-xs font-black mb-6 tracking-widest ${i % 2 === 0 ? 'md:float-right' : ''}`}>{item.year}</div>
                      <div className="clear-both"></div>
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-rich transition-colors">{item.title}</h3>
                      <p className="text-navy/60 leading-relaxed font-medium">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 w-20 h-20 rounded-[30px] gradient-purple-coral text-white flex items-center justify-center shrink-0 border-[8px] border-white shadow-2xl scale-90 md:scale-100 group-hover:rotate-12 transition-transform">
                    <item.icon size={28} />
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-32 bg-soft-white overflow-hidden relative">
      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-coral/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <FadeIn>
            <span className="text-purple-rich font-black tracking-[0.3em] text-xs uppercase mb-6 block opacity-80">Testimony</span>
            <h2 className="text-4xl lg:text-5xl font-bold">Trusted by <span className="text-coral">Global Leaders</span>.</h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className="glass p-12 rounded-[50px] relative h-full flex flex-col shadow-sm hover:shadow-2xl hover:shadow-navy/5 transition-all duration-500 group border-white/50">
                <div className="text-8xl font-display font-black text-navy/5 absolute top-10 right-10 group-hover:text-purple-rich/5 transition-colors">“</div>
                <p className="text-xl text-navy/70 italic mb-12 relative z-10 font-medium leading-relaxed">"{t.text}"</p>
                <div className="mt-auto flex items-center gap-6">
                   <div className="w-14 h-14 rounded-full bg-lavender-muted flex items-center justify-center text-purple-rich shadow-inner">
                      <Users size={24} />
                   </div>
                   <div>
                      <h4 className="text-lg font-bold text-navy">{t.name}</h4>
                      <p className="text-xs text-navy/40 font-black uppercase tracking-[0.2em]">{t.role}</p>
                   </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-coral/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-rich/5 rounded-full blur-[150px] -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto glass rounded-[80px] p-10 md:p-24 shadow-2xl relative border-white/60">
          <div className="grid lg:grid-cols-2 gap-24">
            <div>
              <FadeIn direction="right">
                <span className="text-purple-rich font-black tracking-[0.3em] text-xs uppercase mb-6 block opacity-80">Collaborate</span>
                <h2 className="text-4xl lg:text-6xl font-bold mb-10 leading-tight">Let’s scale your <span className="text-gradient">vision</span> into reality.</h2>
                
                <div className="space-y-10 mt-16">
                   <a href="mailto:iftekharhadiqa@gmail.com" className="flex items-center gap-8 group">
                      <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center text-purple-rich group-hover:gradient-purple-coral group-hover:text-white transition-all duration-500 shadow-sm">
                         <Mail size={28} />
                      </div>
                      <div>
                         <span className="block text-xs text-navy/40 font-black uppercase tracking-widest mb-1">Send an inquiry</span>
                         <span className="text-xl font-bold group-hover:text-purple-rich transition-colors">iftekharhadiqa@gmail.com</span>
                      </div>
                   </a>
                   <a href="https://www.linkedin.com/in/hadiqaiftekhar" target="_blank" rel="noopener noreferrer" className="flex items-center gap-8 group">
                      <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center text-navy group-hover:bg-[#0077b5] group-hover:text-white transition-all duration-500 shadow-sm">
                         <Linkedin size={28} />
                      </div>
                      <div>
                         <span className="block text-xs text-navy/40 font-black uppercase tracking-widest mb-1">Let's connect</span>
                         <span className="text-xl font-bold group-hover:text-purple-rich transition-colors">LinkedIn /in/hadiqaiftekhar</span>
                      </div>
                   </a>
                </div>

                <div className="mt-20">
                   <p className="text-xs font-black text-navy/30 uppercase tracking-[0.4em] mb-8">Follow My Growth</p>
                   <div className="flex gap-6">
                      {[Instagram, Twitter].map((Icon, i) => (
                        <a key={i} href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:gradient-purple-coral hover:text-white transition-all duration-500 hover:-translate-y-1 shadow-sm">
                           <Icon size={20} />
                        </a>
                      ))}
                   </div>
                </div>
              </FadeIn>
            </div>

            <div>
              <FadeIn direction="left">
                <form className="space-y-8 bg-white/40 p-10 md:p-14 rounded-[50px] border border-white/50 shadow-inner" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-xs font-black text-navy/40 uppercase tracking-widest ml-1">Full Name</label>
                       <input type="text" placeholder="John Doe" className="w-full px-8 py-5 rounded-3xl bg-white border border-navy/5 focus:border-purple-rich focus:ring-4 focus:ring-purple-rich/5 outline-none transition-all placeholder:text-navy/20 font-bold" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-xs font-black text-navy/40 uppercase tracking-widest ml-1">Email</label>
                       <input type="email" placeholder="john@example.com" className="w-full px-8 py-5 rounded-3xl bg-white border border-navy/5 focus:border-purple-rich focus:ring-4 focus:ring-purple-rich/5 outline-none transition-all placeholder:text-navy/20 font-bold" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black text-navy/40 uppercase tracking-widest ml-1">Message</label>
                    <textarea rows={6} placeholder="Tell me about your project or brand goals..." className="w-full px-8 py-6 rounded-[32px] bg-white border border-navy/5 focus:border-purple-rich focus:ring-4 focus:ring-purple-rich/5 outline-none transition-all resize-none placeholder:text-navy/20 font-bold"></textarea>
                  </div>
                  <button className="w-full py-6 rounded-3xl gradient-purple-coral text-white font-black text-lg shadow-2xl shadow-purple-rich/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
                    Submit Inquiry <ArrowRight size={22} />
                  </button>
                </form>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-24 bg-navy text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
      
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <h3 className="text-4xl font-display font-black mb-8">Hadiqa<span className="text-purple-rich">.</span></h3>
            <p className="text-white/40 max-w-sm leading-relaxed mb-10 text-lg font-medium">
              Transforming ambitious brands into digital authorities through the perfect fusion of strategy and creativity.
            </p>
            <div className="flex gap-6">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/hadiqaiftekhar" },
                  { icon: Instagram, href: "#" },
                  { icon: Twitter, href: "#" }
                ].map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-purple-rich transition-all duration-500 hover:-translate-y-1">
                    <social.icon size={24} />
                  </a>
                ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-purple-rich mb-10">Exploration</h4>
            <ul className="space-y-6">
              {['Home', 'About', 'Skills', 'Projects', 'Certifications'].map(item => (
                <li key={item}><a href={`#${item.toLowerCase()}`} className="text-white/40 hover:text-white transition-all font-bold tracking-wide">{item}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-purple-rich mb-10">Contact</h4>
            <ul className="space-y-6 text-white/40 font-bold tracking-wide">
              <li>iftekharhadiqa@gmail.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Remote / Global</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-xs font-black uppercase tracking-[0.2em]">© {new Date().getFullYear()} Hadiqa Iftekhar. Premium Design.</p>
          <div className="flex gap-12 text-white/20 text-xs font-black uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-purple-rich transition-colors">Privacy</a>
            <a href="#" className="hover:text-purple-rich transition-colors">Terms</a>
            <a href="#" className="hover:text-purple-rich transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  
  const filteredProjects = activeCategory === "All" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-soft-white min-h-screen">
      <div className="container mx-auto px-6">
        <FadeIn direction="down">
          <Link to="/" className="inline-flex items-center gap-2 text-navy/50 hover:text-purple-rich font-bold mb-12 group transition-colors">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="mb-16">
            <span className="text-purple-rich font-black tracking-[0.3em] text-xs uppercase mb-6 block opacity-80">Portfolio Archive</span>
            <h1 className="text-5xl lg:text-7xl font-bold text-navy mb-8">Selected <span className="text-gradient">Projects</span>.</h1>
            <p className="text-xl text-navy/50 max-w-2xl font-medium leading-relaxed">
              Explore my body of work across different digital disciplines. Each project represents a unique challenge solved through strategic thinking.
            </p>
          </div>
        </FadeIn>

        {/* Category Filter */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap gap-4 mb-20 items-center">
            <div className="flex items-center gap-2 mr-4 text-navy/30">
              <Filter size={18} />
              <span className="text-xs font-black uppercase tracking-widest">Filter by:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-purple-rich text-white shadow-xl shadow-purple-rich/20' 
                    : 'bg-white text-navy hover:bg-lavender-muted border border-navy/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-12">
          {filteredProjects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.1}>
              <div className="group bg-white rounded-[50px] overflow-hidden border border-navy/5 shadow-sm hover:shadow-2xl hover:shadow-purple-rich/5 transition-all duration-700">
                <div className="relative h-[400px] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/40 transition-colors duration-500" />
                  <div className="absolute top-8 left-8">
                    <span className="glass px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-navy border-white/40">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-12">
                  <h3 className="text-3xl font-bold text-navy mb-4 group-hover:text-purple-rich transition-colors">{project.title}</h3>
                  <p className="text-navy/60 leading-relaxed font-medium mb-8">
                    {project.description}
                  </p>
                  <button className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-purple-rich group/btn">
                    View Case Study <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
};

const ResumeSection = () => {
  return (
    <section className="py-24 bg-purple-rich text-white overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-soft-white/5 rounded-full blur-3xl -z-10" />
      <div className="container mx-auto px-6 text-center">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-8 italic">Ready to see my full professional background?</h2>
          <p className="text-xl opacity-70 mb-12 max-w-2xl mx-auto font-medium">
            View my comprehensive resume to explore my experience, skills, and the impact I've delivered for brands globally.
          </p>
          <Link to="/resume" className="inline-flex items-center gap-3 px-12 py-5 rounded-2xl bg-white text-navy font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl">
            View Resume <FileText size={24} />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
};

const ResumePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 bg-soft-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <FadeIn direction="down">
          <Link to="/" className="inline-flex items-center gap-2 text-navy/50 hover:text-purple-rich font-bold mb-12 group transition-colors">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-navy/5 p-8 md:p-16">
            {/* Resume Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-navy/5 pb-12 mb-12 gap-8">
              <div>
                <h1 className="text-5xl font-black text-navy mb-2 tracking-tighter">HADIQA <span className="text-purple-rich">IFTEKHAR</span></h1>
                <p className="text-xl font-bold text-navy/40 uppercase tracking-widest">Marketing Intern</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-navy font-bold">9062161166</p>
                <p className="text-navy/60">iftekharhadiqa@gmail.com</p>
                <p className="text-navy/60">Kolkata - 700023</p>
                <a href="https://www.linkedin.com/in/hadiqaiftekhar" target="_blank" rel="noopener noreferrer" className="text-purple-rich font-bold hover:underline">linkedin.com/in/hadiqaiftekhar</a>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="mb-12">
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-purple-rich mb-6">Profile</h2>
              <p className="text-lg text-navy/70 leading-relaxed font-medium">
                Highly motivated and aspiring Marketing Intern with a strong interest in digital marketing and brand growth. Skilled in SEO, social media management, and audience engagement strategies. Eager to apply my knowledge, creativity, and work ethic to real-world projects while continuously developing my skills in the marketing industry.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-12">
                {/* Education */}
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-purple-rich mb-8">Education</h2>
                  <div className="space-y-10">
                    <div className="relative pl-8 border-l-2 border-lavender-muted">
                      <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-purple-rich" />
                      <h3 className="text-xl font-bold text-navy leading-tight mb-1">Bachelor of Commerce in Accounting and Finance</h3>
                      <p className="text-navy/40 font-bold mb-3">University of Calcutta | 2022-2025</p>
                      <p className="text-navy/60 font-medium">Relevant coursework: Financial management, Marketing management</p>
                      <p className="text-purple-rich font-black mt-2">CGPA - 8.7/10</p>
                    </div>
                    <div className="relative pl-8 border-l-2 border-lavender-muted">
                      <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-navy/20" />
                      <h3 className="text-xl font-bold text-navy leading-tight mb-1">Higher Secondary (Class XII)</h3>
                      <p className="text-navy/40 font-bold mb-3">Khalsa High School, WBSE | 2021-2022</p>
                      <p className="text-navy/60 font-medium">Scored 96% with a focus on Business studies, Accountancy and Economics. Ranked among top 2% of the class.</p>
                    </div>
                  </div>
                </section>

                {/* Online Courses */}
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-purple-rich mb-8">Online Courses</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-bold text-navy">SEO Certification Course</h3>
                      <p className="text-navy/40 font-bold mb-2 uppercase tracking-widest text-xs">HubSpot Academy (2026)</p>
                      <p className="text-navy/60 font-medium italic">"Learned various techniques of SEO"</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-navy">Social Media Marketing Course</h3>
                      <p className="text-navy/40 font-bold mb-2 uppercase tracking-widest text-xs">HubSpot Academy (2026)</p>
                      <p className="text-navy/60 font-medium italic">"Learned how to utilize social media for promotional activities."</p>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-12 bg-lavender-muted/20 p-8 rounded-[40px] border border-navy/5">
                {/* Skills */}
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-purple-rich mb-6">Expertise</h2>
                  <ul className="space-y-3">
                    {['Search Engine Optimization', 'Social Media Marketing', 'Time Management', 'Accounting Principles', 'Tax Laws', 'Financial Data Analytics'].map(skill => (
                      <li key={skill} className="flex items-center gap-2 text-navy text-sm font-bold">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-rich" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Languages */}
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-purple-rich mb-6">Languages</h2>
                  <div className="flex gap-4 flex-wrap">
                    <span className="px-4 py-1.5 rounded-full bg-white text-navy font-bold text-xs shadow-sm">English</span>
                    <span className="px-4 py-1.5 rounded-full bg-white text-navy font-bold text-xs shadow-sm">Hindi</span>
                  </div>
                </section>

                {/* Interests */}
                <section>
                  <h2 className="text-xs font-black uppercase tracking-[0.3em] text-purple-rich mb-6">Interests</h2>
                  <div className="flex gap-4 flex-wrap">
                    <span className="px-4 py-2 rounded-xl bg-purple-rich/5 text-purple-rich font-bold text-xs">Reading</span>
                    <span className="px-4 py-2 rounded-xl bg-purple-rich/5 text-purple-rich font-bold text-xs">Yoga</span>
                  </div>
                </section>

                {/* Projects Reference */}
                <section>
                   <h2 className="text-xs font-black uppercase tracking-[0.3em] text-purple-rich mb-4">Portfolio</h2>
                   <Link to="/projects" className="text-xs font-black text-navy/40 uppercase hover:text-purple-rich transition-colors">View All Projects →</Link>
                </section>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <MarketingProjects />
      <Certifications />
      <ResumeSection />
      <Contact />
    </>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
