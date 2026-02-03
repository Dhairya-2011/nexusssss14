'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Brain,
  Route,
  TrendingUp,
  Briefcase,
  Trophy,
  Users,
  Wifi,
  BarChart3,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Target,
  Clock,
  CheckCircle,
  Heart,
  Zap,
  Rocket,
  Lightbulb,
  Compass,
  Award,
  Search,
  FileText,
  Video,
  FolderGit,
  HandshakeIcon
} from 'lucide-react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

// Types
interface StatCardProps {
  value: string
  label: string
  icon: React.ReactNode
  color: string
  delay: number
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  bullets: string[]
  color: string
  delay: number
}

interface PersonaCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  color: string
  plan: string
  delay: number
}

interface StepCardProps {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
  delay: number
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Components
function FloatingOrb({ className }: { className?: string }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl opacity-20 ${className}`}
      animate={{
        y: [0, -30, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

function StatCard({ value, label, icon, color, delay }: StatCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
      style={{
        background: `linear-gradient(135deg, ${color}10 0%, ${color}05 100%)`,
        border: `1px solid ${color}20`
      }}
    >
      <div className="text-4xl font-bold mb-2 text-gray-800">{value}</div>
      <div className="text-gray-600 font-medium mb-3">{label}</div>
      <div className="flex justify-center" style={{ color }}>
        {icon}
      </div>
    </motion.div>
  )
}

function FeatureCard({ icon, title, description, bullets, color, delay }: FeatureCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-2xl p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-400"
    >
      <motion.div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto"
        style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-bold mb-3 text-center text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4 text-center leading-relaxed">{description}</p>
      <ul className="space-y-2 text-gray-600">
        {bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{bullet}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function PersonaCard({ icon, title, description, features, color, plan, delay }: PersonaCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-2xl p-8 text-center hover:scale-102 hover:-translate-y-1 transition-all duration-300"
    >
      <div 
        className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` }}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2 text-left mb-6">
        {features.map((feature, idx) => (
          <p key={idx} className="text-sm text-gray-600 flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color }} />
            {feature}
          </p>
        ))}
      </div>
      <span 
        className="inline-block px-4 py-2 rounded-lg text-sm font-medium text-white"
        style={{ background: color }}
      >
        {plan}
      </span>
    </motion.div>
  )
}

function StepCard({ number, title, description, icon, color, delay }: StepCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div 
        className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` }}
      >
        <div className="text-4xl font-bold text-white">{number}</div>
      </div>
      <h4 className="text-xl font-semibold mb-2 text-white">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  )
}

// Main Page Component
export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  }

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-white" />,
      title: "Adaptive Assessment",
      description: "Computerized adaptive testing evaluates aptitude, interests, personality, and learning style with personalized question flow",
      bullets: ["Real-time difficulty adjustment", "Explainable AI recommendations", "Multiple question formats"],
      color: "#3b82f6",
      delay: 0
    },
    {
      icon: <Route className="w-8 h-8 text-white" />,
      title: "Personalized Roadmaps",
      description: "DAG-based learning paths with curated resources, projects, and milestones tailored to your schedule",
      bullets: ["Skill dependency graphs", "Curated learning resources", "Timeline customization"],
      color: "#8b5cf6",
      delay: 0.1
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: "Labor Market Intelligence",
      description: "Real-time job market data, salary insights, demand trends for informed career decisions",
      bullets: ["Live job market data", "Salary range estimates", "Demand forecasting"],
      color: "#10b981",
      delay: 0.2
    },
    {
      icon: <Briefcase className="w-8 h-8 text-white" />,
      title: "Job Readiness Tools",
      description: "AI-powered resume builder, mock interviews, portfolio projects, and application tracking",
      bullets: ["Resume auto-generation", "Mock interview practice", "Portfolio project templates"],
      color: "#f59e0b",
      delay: 0.3
    },
    {
      icon: <Trophy className="w-8 h-8 text-white" />,
      title: "Portfolio & Projects",
      description: "Build real-world projects with templates, automated feedback, and CI integration for employable demos",
      bullets: ["Project templates library", "Automated code reviews", "GitHub integration"],
      color: "#ec4899",
      delay: 0.4
    },
    {
      icon: <HandshakeIcon className="w-8 h-8 text-white" />,
      title: "Expert Mentorship",
      description: "Connect with industry professionals for guidance, feedback, and networking opportunities",
      bullets: ["1-on-1 mentorship matching", "Career coaching sessions", "Industry expert network"],
      color: "#6366f1",
      delay: 0.5
    }
  ]

  const personas = [
    {
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      title: "Students",
      description: "Exploring careers after high school with limited guidance",
      features: ["AI-powered career discovery", "Personalized learning roadmaps", "Entry-level project templates"],
      color: "#3b82f6",
      plan: "Student Plan",
      delay: 0
    },
    {
      icon: <ArrowRight className="w-8 h-8 text-white" />,
      title: "Career Switchers",
      description: "Professionals transitioning to new industries or roles",
      features: ["Targeted career roadmaps", "Advanced project portfolio", "Industry-specific interview prep"],
      color: "#8b5cf6",
      plan: "Switcher Plan",
      delay: 0.1
    },
    {
      icon: <Wifi className="w-8 h-8 text-white" />,
      title: "Rural Learners",
      description: "Users with limited connectivity in remote areas",
      features: ["Offline assessment mode", "Low-bandwidth resource bundles", "IVR/SMS-based access"],
      color: "#10b981",
      plan: "Rural Access",
      delay: 0.2
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      title: "Professionals",
      description: "Experienced workers seeking advancement and new skills",
      features: ["Executive-level roadmaps", "Leadership skill development", "Networking and mentorship"],
      color: "#f59e0b",
      plan: "Professional Plan",
      delay: 0.3
    }
  ]

  const steps = [
    {
      number: 1,
      title: "Assessment",
      description: "Complete adaptive evaluation of skills, interests & personality",
      icon: <Search className="w-8 h-8 text-white" />,
      color: "#3b82f6",
      delay: 0
    },
    {
      number: 2,
      title: "Career Matching",
      description: "AI matches you with best-fitting careers based on your profile",
      icon: <Sparkles className="w-8 h-8 text-white" />,
      color: "#8b5cf6",
      delay: 0.1
    },
    {
      number: 3,
      title: "Roadmap Generation",
      description: "Get personalized learning path with curated resources & milestones",
      icon: <Compass className="w-8 h-8 text-white" />,
      color: "#10b981",
      delay: 0.2
    },
    {
      number: 4,
      title: "Job Readiness",
      description: "Build portfolio, prepare for interviews & land your dream job",
      icon: <Award className="w-8 h-8 text-white" />,
      color: "#f59e0b",
      delay: 0.3
    }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-800">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Floating Orbs */}
        <FloatingOrb className="top-20 left-10 w-72 h-72 bg-purple-500" />
        <FloatingOrb className="top-40 right-20 w-96 h-96 bg-blue-500" />
        <FloatingOrb className="bottom-20 left-1/4 w-64 h-64 bg-indigo-500" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center text-white"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4 inline mr-2" />
                AI-Powered Career Guidance
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
            >
              Find Your Perfect
              <br />
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Career Path
              </span>{" "}
              with AI
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed"
            >
              Personalized career guidance combining psychometric assessment, real-time labor market intelligence, 
              and adaptive learning roadmaps to guide you from exploration to employment.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-12"
            >
              <Link 
                href="/assessment/"
                className="group relative overflow-hidden bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <span className="relative z-10 flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Start Free Assessment
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                href="/assessment/"
                className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-white/10"
              >
                <span className="flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  I Know My Career Goal
                </span>
              </Link>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-6 text-blue-200 text-sm"
            >
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>20-30 min assessment</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                <span>95% roadmap accuracy</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>Real-time job insights</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard
              value="2.8K+"
              label="Users Worldwide"
              icon={<Users className="w-8 h-8" />}
              color="#3b82f6"
              delay={0}
            />
            <StatCard
              value="95%"
              label="Roadmap Accuracy"
              icon={<Route className="w-8 h-8" />}
              color="#8b5cf6"
              delay={0.1}
            />
            <StatCard
              value="15K+"
              label="Career Paths"
              icon={<Compass className="w-8 h-8" />}
              color="#10b981"
              delay={0.2}
            />
            <StatCard
              value="92%"
              label="Match Satisfaction"
              icon={<Heart className="w-8 h-8" />}
              color="#ec4899"
              delay={0.3}
            />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered
              </span>{" "}
              Career Guidance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools designed to help you discover, prepare, and land your dream career
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                CB-AI
              </span>{" "}
              Works
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {steps.map((step, index) => (
              <StepCard key={index} {...step} />
            ))}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Link 
              href="/assessment/"
              className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Start Your Journey Now
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Personas Section */}
      <section id="personas" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Who{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CB-AI
              </span>{" "}
              Helps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Designed for diverse users across different backgrounds and career stages
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {personas.map((persona, index) => (
              <PersonaCard key={index} {...persona} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="assessment" className="py-24 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Ready to{" "}
              <span className="bg-white/20 px-4 py-2 rounded-xl inline-block">
                Transform
              </span>{" "}
              Your Career?
            </motion.h2>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl mb-12 text-blue-100 max-w-2xl mx-auto"
            >
              Start with a free assessment or select your target career to get a personalized roadmap
              designed specifically for your goals and constraints.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12"
            >
              <div className="glass-card p-8 text-center w-full md:w-auto">
                <div className="text-6xl font-bold text-blue-600 mb-2">1</div>
                <p className="text-gray-700 font-medium mb-4">Take Assessment</p>
                <Link 
                  href="/assessment/"
                  className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-blue-700"
                >
                  <Brain className="w-5 h-5 mr-2" />
                  Start Assessment
                </Link>
              </div>
              
              <div className="text-4xl text-white font-bold">OR</div>
              
              <div className="glass-card p-8 text-center w-full md:w-auto">
                <div className="text-6xl font-bold text-purple-600 mb-2">2</div>
                <p className="text-gray-700 font-medium mb-4">Select Career</p>
                <Link 
                  href="/assessment/"
                  className="inline-flex items-center bg-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-purple-700"
                >
                  <Target className="w-5 h-5 mr-2" />
                  Choose Career
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-blue-200"
            >
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>20-30 minutes</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>AI-powered matching</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Personalized roadmap</span>
              </div>
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Free to start</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
