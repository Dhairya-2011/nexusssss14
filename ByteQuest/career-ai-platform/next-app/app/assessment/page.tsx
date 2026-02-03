'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Brain,
  Users,
  Code,
  Palette,
  LineChart,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Briefcase,
  Target,
  Clock,
  Zap,
  Award,
  BookOpen,
  Download,
  Share2,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

// TypeScript Interfaces
interface Answer {
  text: string
  traitScores: TraitScores
  icon: React.ReactNode
}

interface TraitScores {
  analytical: number
  creative: number
  technical: number
  interpersonal: number
  leadership: number
}

interface Question {
  id: number
  question: string
  category: string
  answers: Answer[]
}

interface CareerProfile {
  id: string
  title: string
  description: string
  traits: TraitScores
  icon: React.ReactNode
  color: string
  salaryRange: string
  growth: string
  skills: string[]
  roadmap: RoadmapStage[]
}

interface RoadmapStage {
  stage: string
  duration: string
  description: string
  skills: string[]
  resources: string[]
}

interface AssessmentResult {
  career: CareerProfile
  matchPercentage: number
}

// Assessment Questions Data
const questions: Question[] = [
  {
    id: 1,
    category: 'Problem Solving',
    question: 'How do you prefer to approach complex problems?',
    answers: [
      {
        text: 'Break it down into data-driven steps and analyze systematically',
        traitScores: { analytical: 3, creative: 0, technical: 2, interpersonal: 0, leadership: 0 },
        icon: <LineChart className="w-5 h-5" />,
      },
      {
        text: 'Think outside the box and find innovative solutions',
        traitScores: { analytical: 0, creative: 3, technical: 0, interpersonal: 1, leadership: 0 },
        icon: <Lightbulb className="w-5 h-5" />,
      },
      {
        text: 'Write code or build technical solutions',
        traitScores: { analytical: 1, creative: 0, technical: 3, interpersonal: 0, leadership: 0 },
        icon: <Code className="w-5 h-5" />,
      },
      {
        text: 'Collaborate with others to find the best approach',
        traitScores: { analytical: 1, creative: 0, technical: 0, interpersonal: 3, leadership: 1 },
        icon: <Users className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 2,
    category: 'Learning Style',
    question: 'What is your preferred way of learning new concepts?',
    answers: [
      {
        text: 'Reading documentation and technical specifications',
        traitScores: { analytical: 3, creative: 0, technical: 2, interpersonal: 0, leadership: 0 },
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        text: 'Hands-on experimentation and building prototypes',
        traitScores: { analytical: 0, creative: 2, technical: 3, interpersonal: 0, leadership: 0 },
        icon: <Zap className="w-5 h-5" />,
      },
      {
        text: 'Visual learning through diagrams and videos',
        traitScores: { analytical: 1, creative: 3, technical: 1, interpersonal: 0, leadership: 0 },
        icon: <Palette className="w-5 h-5" />,
      },
      {
        text: 'Learning from mentors and team discussions',
        traitScores: { analytical: 1, creative: 0, technical: 0, interpersonal: 3, leadership: 1 },
        icon: <Users className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 3,
    category: 'Work Environment',
    question: 'What type of work environment do you thrive in?',
    answers: [
      {
        text: 'Quiet, focused space for deep analytical work',
        traitScores: { analytical: 3, creative: 0, technical: 2, interpersonal: 0, leadership: 0 },
        icon: <Brain className="w-5 h-5" />,
      },
      {
        text: 'Dynamic, collaborative space with team interaction',
        traitScores: { analytical: 0, creative: 1, technical: 0, interpersonal: 3, leadership: 2 },
        icon: <Users className="w-5 h-5" />,
      },
      {
        text: 'Creative studio with visual inspiration',
        traitScores: { analytical: 0, creative: 3, technical: 0, interpersonal: 1, leadership: 0 },
        icon: <Palette className="w-5 h-5" />,
      },
      {
        text: 'Flexible remote setup with autonomy',
        traitScores: { analytical: 1, creative: 1, technical: 3, interpersonal: 0, leadership: 1 },
        icon: <Zap className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 4,
    category: 'Activity Interests',
    question: 'Which activities do you find most engaging?',
    answers: [
      {
        text: 'Analyzing data and finding patterns',
        traitScores: { analytical: 3, creative: 0, technical: 1, interpersonal: 0, leadership: 0 },
        icon: <LineChart className="w-5 h-5" />,
      },
      {
        text: 'Designing user interfaces or visual content',
        traitScores: { analytical: 0, creative: 3, technical: 1, interpersonal: 0, leadership: 0 },
        icon: <Palette className="w-5 h-5" />,
      },
      {
        text: 'Building software and coding applications',
        traitScores: { analytical: 1, creative: 0, technical: 3, interpersonal: 0, leadership: 0 },
        icon: <Code className="w-5 h-5" />,
      },
      {
        text: 'Leading projects and coordinating teams',
        traitScores: { analytical: 1, creative: 0, technical: 0, interpersonal: 2, leadership: 3 },
        icon: <Briefcase className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 5,
    category: 'Work-Life Balance',
    question: 'How do you prioritize work-life balance?',
    answers: [
      {
        text: 'Strict boundaries - work stays at work',
        traitScores: { analytical: 2, creative: 0, technical: 2, interpersonal: 0, leadership: 0 },
        icon: <Clock className="w-5 h-5" />,
      },
      {
        text: 'Flexible hours that adapt to my energy levels',
        traitScores: { analytical: 0, creative: 3, technical: 1, interpersonal: 0, leadership: 0 },
        icon: <Zap className="w-5 h-5" />,
      },
      {
        text: 'Work integrated with life - passion-driven',
        traitScores: { analytical: 0, creative: 2, technical: 3, interpersonal: 0, leadership: 0 },
        icon: <Sparkles className="w-5 h-5" />,
      },
      {
        text: 'Team-oriented schedule with collaboration time',
        traitScores: { analytical: 0, creative: 0, technical: 0, interpersonal: 3, leadership: 2 },
        icon: <Users className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 6,
    category: 'Technical vs Creative',
    question: 'Do you lean more toward technical or creative pursuits?',
    answers: [
      {
        text: 'Purely technical - logic, algorithms, and systems',
        traitScores: { analytical: 2, creative: 0, technical: 3, interpersonal: 0, leadership: 0 },
        icon: <Code className="w-5 h-5" />,
      },
      {
        text: 'Technical with creative problem-solving',
        traitScores: { analytical: 2, creative: 2, technical: 2, interpersonal: 0, leadership: 0 },
        icon: <Brain className="w-5 h-5" />,
      },
      {
        text: 'Creative with some technical implementation',
        traitScores: { analytical: 1, creative: 3, technical: 1, interpersonal: 0, leadership: 0 },
        icon: <Palette className="w-5 h-5" />,
      },
      {
        text: 'Purely creative - design, art, and expression',
        traitScores: { analytical: 0, creative: 3, technical: 0, interpersonal: 1, leadership: 0 },
        icon: <Lightbulb className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 7,
    category: 'Team Collaboration',
    question: 'How do you prefer to work with others?',
    answers: [
      {
        text: 'Independent work with occasional check-ins',
        traitScores: { analytical: 2, creative: 1, technical: 2, interpersonal: 0, leadership: 0 },
        icon: <Brain className="w-5 h-5" />,
      },
      {
        text: 'Close collaboration within a small team',
        traitScores: { analytical: 1, creative: 1, technical: 1, interpersonal: 3, leadership: 1 },
        icon: <Users className="w-5 h-5" />,
      },
      {
        text: 'Leading and coordinating multiple teams',
        traitScores: { analytical: 1, creative: 0, technical: 0, interpersonal: 2, leadership: 3 },
        icon: <Briefcase className="w-5 h-5" />,
      },
      {
        text: 'Cross-functional collaboration across departments',
        traitScores: { analytical: 1, creative: 2, technical: 1, interpersonal: 3, leadership: 1 },
        icon: <Target className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 8,
    category: 'Impact Preference',
    question: 'What type of impact do you want your work to have?',
    answers: [
      {
        text: 'Data-driven insights that inform decisions',
        traitScores: { analytical: 3, creative: 0, technical: 2, interpersonal: 0, leadership: 0 },
        icon: <LineChart className="w-5 h-5" />,
      },
      {
        text: 'Beautiful, intuitive products users love',
        traitScores: { analytical: 0, creative: 3, technical: 1, interpersonal: 1, leadership: 0 },
        icon: <Palette className="w-5 h-5" />,
      },
      {
        text: 'Robust, scalable technical systems',
        traitScores: { analytical: 1, creative: 0, technical: 3, interpersonal: 0, leadership: 0 },
        icon: <Code className="w-5 h-5" />,
      },
      {
        text: 'Strategic vision that guides entire organizations',
        traitScores: { analytical: 2, creative: 1, technical: 0, interpersonal: 1, leadership: 3 },
        icon: <Award className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 9,
    category: 'Communication Style',
    question: 'How do you prefer to communicate your ideas?',
    answers: [
      {
        text: 'Through detailed reports and documentation',
        traitScores: { analytical: 3, creative: 0, technical: 1, interpersonal: 0, leadership: 0 },
        icon: <BookOpen className="w-5 h-5" />,
      },
      {
        text: 'Visual presentations and prototypes',
        traitScores: { analytical: 0, creative: 3, technical: 1, interpersonal: 1, leadership: 0 },
        icon: <Palette className="w-5 h-5" />,
      },
      {
        text: 'Live demos and technical walkthroughs',
        traitScores: { analytical: 1, creative: 0, technical: 3, interpersonal: 0, leadership: 0 },
        icon: <Code className="w-5 h-5" />,
      },
      {
        text: 'Storytelling and persuasive narratives',
        traitScores: { analytical: 0, creative: 2, technical: 0, interpersonal: 3, leadership: 2 },
        icon: <Sparkles className="w-5 h-5" />,
      },
    ],
  },
  {
    id: 10,
    category: 'Career Growth',
    question: 'What is your ideal career progression path?',
    answers: [
      {
        text: 'Deep technical expertise in specialized domain',
        traitScores: { analytical: 3, creative: 0, technical: 3, interpersonal: 0, leadership: 0 },
        icon: <Brain className="w-5 h-5" />,
      },
      {
        text: 'Creative leadership and design direction',
        traitScores: { analytical: 0, creative: 3, technical: 1, interpersonal: 1, leadership: 2 },
        icon: <Lightbulb className="w-5 h-5" />,
      },
      {
        text: 'Management and organizational leadership',
        traitScores: { analytical: 1, creative: 0, technical: 0, interpersonal: 2, leadership: 3 },
        icon: <Briefcase className="w-5 h-5" />,
      },
      {
        text: 'Versatile role spanning multiple disciplines',
        traitScores: { analytical: 2, creative: 2, technical: 2, interpersonal: 1, leadership: 1 },
        icon: <Target className="w-5 h-5" />,
      },
    ],
  },
]

// Career Profiles Data
const careerProfiles: CareerProfile[] = [
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Transform raw data into actionable insights that drive business decisions through statistical analysis and visualization.',
    traits: { analytical: 3, creative: 1, technical: 2, interpersonal: 1, leadership: 0 },
    icon: <LineChart className="w-8 h-8" />,
    color: 'from-blue-500 to-cyan-500',
    salaryRange: '$65,000 - $95,000',
    growth: '25% growth expected',
    skills: ['SQL', 'Python', 'Tableau', 'Statistics', 'Excel', 'Data Visualization'],
    roadmap: [
      {
        stage: 'Foundation',
        duration: '3-6 months',
        description: 'Learn basic statistics, SQL, and Excel fundamentals',
        skills: ['Statistics Basics', 'SQL Queries', 'Excel Functions'],
        resources: ['Khan Academy Statistics', 'SQL Bolt', 'Excel Easy Tutorial'],
      },
      {
        stage: 'Technical Skills',
        duration: '6-12 months',
        description: 'Master Python/R and data visualization tools',
        skills: ['Python Programming', 'Pandas', 'Matplotlib', 'Tableau'],
        resources: ['DataCamp Python Track', 'Coursera Data Science', 'Tableau Public'],
      },
      {
        stage: 'Advanced Analytics',
        duration: '12-18 months',
        description: 'Learn machine learning basics and business intelligence',
        skills: ['Machine Learning Basics', 'Power BI', 'Big Data Tools'],
        resources: ['Kaggle Learn', 'Google Data Analytics Certificate'],
      },
    ],
  },
  {
    id: 'software-developer',
    title: 'Software Developer',
    description: 'Design, build, and maintain software applications using programming languages and development frameworks.',
    traits: { analytical: 2, creative: 1, technical: 3, interpersonal: 0, leadership: 0 },
    icon: <Code className="w-8 h-8" />,
    color: 'from-green-500 to-emerald-600',
    salaryRange: '$75,000 - $130,000',
    growth: '22% growth expected',
    skills: ['JavaScript', 'React', 'Node.js', 'Git', 'Algorithms', 'System Design'],
    roadmap: [
      {
        stage: 'Programming Basics',
        duration: '3-6 months',
        description: 'Learn programming fundamentals and one language deeply',
        skills: ['HTML/CSS', 'JavaScript Basics', 'Git', 'Command Line'],
        resources: ['freeCodeCamp', 'The Odin Project', 'MDN Web Docs'],
      },
      {
        stage: 'Frontend Development',
        duration: '6-12 months',
        description: 'Master modern frontend frameworks and responsive design',
        skills: ['React/Vue', 'CSS Frameworks', 'API Integration', 'TypeScript'],
        resources: ['React Official Docs', 'Frontend Masters', 'Scrimba'],
      },
      {
        stage: 'Full-Stack Skills',
        duration: '12-18 months',
        description: 'Expand into backend development and databases',
        skills: ['Node.js', 'Databases', 'Cloud Services', 'DevOps Basics'],
        resources: ['Node.js Docs', 'MongoDB University', 'AWS Free Tier'],
      },
    ],
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Create intuitive, user-centered digital experiences through research, prototyping, and visual design.',
    traits: { analytical: 1, creative: 3, technical: 1, interpersonal: 2, leadership: 0 },
    icon: <Palette className="w-8 h-8" />,
    color: 'from-purple-500 to-pink-500',
    salaryRange: '$70,000 - $120,000',
    growth: '18% growth expected',
    skills: ['User Research', 'Figma', 'Prototyping', 'Wireframing', 'Usability Testing', 'Design Thinking'],
    roadmap: [
      {
        stage: 'Design Fundamentals',
        duration: '3-6 months',
        description: 'Learn design principles, color theory, and typography',
        skills: ['Design Principles', 'Color Theory', 'Typography', 'Figma Basics'],
        resources: ['Google UX Certificate', 'Figma YouTube', 'Dribbble'],
      },
      {
        stage: 'UX Research',
        duration: '6-12 months',
        description: 'Master user research methods and information architecture',
        skills: ['User Interviews', 'Journey Mapping', 'Information Architecture', 'Wireframing'],
        resources: ['Nielsen Norman Group', 'Interaction Design Foundation', 'Maze'],
      },
      {
        stage: 'Advanced UX',
        duration: '12-18 months',
        description: 'Develop prototyping skills and design systems expertise',
        skills: ['High-Fidelity Prototyping', 'Design Systems', 'Usability Testing', 'Design Metrics'],
        resources: ['UX Collective', 'Design Better', 'Career Foundry'],
      },
    ],
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Define product vision, strategy, and roadmap while coordinating cross-functional teams to deliver value.',
    traits: { analytical: 2, creative: 1, technical: 1, interpersonal: 3, leadership: 3 },
    icon: <Briefcase className="w-8 h-8" />,
    color: 'from-orange-500 to-red-500',
    salaryRange: '$90,000 - $160,000',
    growth: '14% growth expected',
    skills: ['Agile/Scrum', 'Roadmapping', 'Stakeholder Management', 'Data Analysis', 'User Stories', 'A/B Testing'],
    roadmap: [
      {
        stage: 'PM Fundamentals',
        duration: '3-6 months',
        description: 'Learn product management basics and agile methodologies',
        skills: ['Agile/Scrum', 'User Stories', 'Backlog Management', 'Basic Analytics'],
        resources: ['Cracking the PM Interview', 'Product School', 'Scrum.org'],
      },
      {
        stage: 'Strategic Skills',
        duration: '6-12 months',
        description: 'Develop roadmap creation and prioritization skills',
        skills: ['Roadmapping', 'Prioritization Frameworks', 'Market Research', 'Competitive Analysis'],
        resources: ['ProductPlan Blog', 'Mind the Product', 'Lenny\'s Newsletter'],
      },
      {
        stage: 'Leadership',
        duration: '12-24 months',
        description: 'Build cross-functional leadership and strategic thinking',
        skills: ['Stakeholder Management', 'Executive Communication', 'OKRs', 'Team Leadership'],
        resources: ['Silicon Valley Product Group', 'Reforge', 'Product Leadership'],
      },
    ],
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    description: 'Bridge the gap between business needs and technical solutions through requirements analysis and process improvement.',
    traits: { analytical: 3, creative: 0, technical: 1, interpersonal: 2, leadership: 1 },
    icon: <Target className="w-8 h-8" />,
    color: 'from-indigo-500 to-blue-600',
    salaryRange: '$65,000 - $100,000',
    growth: '11% growth expected',
    skills: ['Requirements Gathering', 'Process Mapping', 'SQL', 'Documentation', 'UML', 'Stakeholder Communication'],
    roadmap: [
      {
        stage: 'BA Fundamentals',
        duration: '3-6 months',
        description: 'Learn business analysis concepts and documentation',
        skills: ['Requirements Elicitation', 'Process Modeling', 'Documentation Standards', 'UML Basics'],
        resources: ['BABOK Guide', 'Business Analysis Body of Knowledge', 'LinkedIn Learning'],
      },
      {
        stage: 'Technical BA',
        duration: '6-12 months',
        description: 'Develop technical skills and data analysis capabilities',
        skills: ['SQL', 'Data Modeling', 'API Understanding', 'Agile BA'],
        resources: ['SQLZoo', 'IIBA Resources', 'Techcanvass'],
      },
      {
        stage: 'Strategic BA',
        duration: '12-18 months',
        description: 'Focus on business strategy and enterprise analysis',
        skills: ['Enterprise Analysis', 'Business Architecture', 'Strategy Planning', 'Change Management'],
        resources: ['Adaptive US', 'BA Times', 'IIBA Certification'],
      },
    ],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Apply statistical and machine learning techniques to solve complex problems and build predictive models.',
    traits: { analytical: 3, creative: 1, technical: 3, interpersonal: 0, leadership: 0 },
    icon: <Brain className="w-8 h-8" />,
    color: 'from-violet-500 to-purple-600',
    salaryRange: '$95,000 - $165,000',
    growth: '35% growth expected',
    skills: ['Python/R', 'Machine Learning', 'Statistics', 'Deep Learning', 'Big Data', 'SQL'],
    roadmap: [
      {
        stage: 'Math & Stats Foundation',
        duration: '3-6 months',
        description: 'Strengthen mathematics, statistics, and probability skills',
        skills: ['Linear Algebra', 'Calculus', 'Probability', 'Statistics'],
        resources: ['3Blue1Brown', 'Khan Academy', 'StatQuest'],
      },
      {
        stage: 'Programming & ML',
        duration: '6-12 months',
        description: 'Learn Python and machine learning algorithms',
        skills: ['Python Programming', 'Scikit-Learn', 'Pandas/NumPy', 'ML Algorithms'],
        resources: ['Coursera ML by Andrew Ng', 'Fast.ai', 'DataCamp'],
      },
      {
        stage: 'Advanced DS',
        duration: '12-24 months',
        description: 'Master deep learning, NLP, and big data technologies',
        skills: ['Deep Learning', 'NLP', 'Big Data', 'Cloud ML', 'MLOps'],
        resources: ['Deep Learning Specialization', 'Kaggle Competitions', 'TensorFlow'],
      },
    ],
  },
  {
    id: 'ui-designer',
    title: 'UI Designer',
    description: 'Create visually appealing, pixel-perfect interfaces that delight users and align with brand aesthetics.',
    traits: { analytical: 0, creative: 3, technical: 1, interpersonal: 1, leadership: 0 },
    icon: <Palette className="w-8 h-8" />,
    color: 'from-pink-500 to-rose-500',
    salaryRange: '$65,000 - $110,000',
    growth: '13% growth expected',
    skills: ['Visual Design', 'Figma/Sketch', 'Typography', 'Color Theory', 'Prototyping', 'Design Systems'],
    roadmap: [
      {
        stage: 'Visual Design',
        duration: '3-6 months',
        description: 'Master visual design principles and design tools',
        skills: ['Color Theory', 'Typography', 'Layout', 'Figma/Sketch'],
        resources: ['Dribbble', 'Behance', 'DesignLab'],
      },
      {
        stage: 'UI Patterns',
        duration: '6-12 months',
        description: 'Learn interface patterns and responsive design',
        skills: ['UI Patterns', 'Responsive Design', 'Mobile Design', 'Accessibility'],
        resources: ['Material Design', 'Apple HIG', 'Refactoring UI'],
      },
      {
        stage: 'Advanced UI',
        duration: '12-18 months',
        description: 'Develop design systems and motion design skills',
        skills: ['Design Systems', 'Motion Design', 'Design Ops', 'Brand Design'],
        resources: ['Design Systems Repo', 'Motion Design Principles', 'Figma Community'],
      },
    ],
  },
  {
    id: 'project-manager',
    title: 'Project Manager',
    description: 'Plan, execute, and deliver projects on time and within budget while managing resources and stakeholders.',
    traits: { analytical: 2, creative: 0, technical: 0, interpersonal: 3, leadership: 2 },
    icon: <Target className="w-8 h-8" />,
    color: 'from-teal-500 to-cyan-600',
    salaryRange: '$75,000 - $125,000',
    growth: '7% growth expected',
    skills: ['Project Planning', 'Risk Management', 'Budgeting', 'Stakeholder Management', 'Agile/Waterfall', 'Communication'],
    roadmap: [
      {
        stage: 'PM Basics',
        duration: '3-6 months',
        description: 'Learn project management fundamentals and methodologies',
        skills: ['PMBOK', 'Agile/Scrum', 'Waterfall', 'Project Lifecycle'],
        resources: ['PMI', 'Project Management PrepCast', 'Coursera PM'],
      },
      {
        stage: 'Tools & Techniques',
        duration: '6-12 months',
        description: 'Master project management tools and techniques',
        skills: ['MS Project', 'Jira', 'Risk Management', 'Resource Planning'],
        resources: ['Jira Documentation', 'TeamGantt', 'Wrike'],
      },
      {
        stage: 'Advanced PM',
        duration: '12-24 months',
        description: 'Develop program management and portfolio skills',
        skills: ['Program Management', 'Portfolio Management', 'Strategic Planning', 'PMO'],
        resources: ['PMI PMP', 'Program Management', 'Strategic Planning'],
      },
    ],
  },
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [results, setResults] = useState<AssessmentResult[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState<CareerProfile | null>(null)

  // Calculate scores and career matches
  const calculateResults = () => {
    const traitScores: TraitScores = {
      analytical: 0,
      creative: 0,
      technical: 0,
      interpersonal: 0,
      leadership: 0,
    }

    // Aggregate trait scores from answers
    answers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex]
      const answer = question.answers[answerIndex]
      Object.keys(answer.traitScores).forEach((trait) => {
        traitScores[trait as keyof TraitScores] += answer.traitScores[trait as keyof TraitScores]
      })
    })

    // Calculate career match percentages
    const careerMatches: AssessmentResult[] = careerProfiles.map((career) => {
      let totalScore = 0
      let maxPossibleScore = 0

      Object.keys(career.traits).forEach((trait) => {
        const userScore = traitScores[trait as keyof TraitScores]
        const careerWeight = career.traits[trait as keyof TraitScores]
        totalScore += userScore * careerWeight
        maxPossibleScore += 30 * careerWeight // 30 is max possible for each trait (10 questions * 3 max score)
      })

      const matchPercentage = Math.round((totalScore / maxPossibleScore) * 100)
      return { career, matchPercentage }
    })

    // Sort by match percentage and get top 3
    careerMatches.sort((a, b) => b.matchPercentage - a.matchPercentage)
    return careerMatches.slice(0, 3)
  }

  // Handle answer selection
  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      // Assessment complete
      setIsComplete(true)
      const calculatedResults = calculateResults()
      setResults(calculatedResults)
      setTimeout(() => {
        setShowResults(true)
      }, 1000)
    }
  }

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Reset assessment
  const resetAssessment = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setIsComplete(false)
    setResults([])
    setShowResults(false)
    setSelectedCareer(null)
  }

  // Progress percentage
  const progressPercentage = ((currentQuestion + (isComplete ? 1 : 0)) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            >
              Career Assessment
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Discover your ideal career path through our AI-powered assessment
            </motion.p>
          </div>

          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div className="max-w-3xl mx-auto mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {Math.round(progressPercentage)}% Complete
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-3xl mx-auto"
              >
                <div className="glass-card bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
                  {/* Category Tag */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                    <Sparkles className="w-4 h-4" />
                    {questions[currentQuestion].category}
                  </div>

                  {/* Question */}
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                    {questions[currentQuestion].question}
                  </h2>

                  {/* Answer Options */}
                  <div className="space-y-4">
                    {questions[currentQuestion].answers.map((answer, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 group ${
                          answers[currentQuestion] === index
                            ? 'border-blue-500 bg-blue-50 shadow-lg'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 hover:shadow-md'
                        }`}
                      >
                        <div
                          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            answers[currentQuestion] === index
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                          }`}
                        >
                          {answer.icon}
                        </div>
                        <span className="text-lg text-gray-700 font-medium pt-2">
                          {answer.text}
                        </span>
                        {answers[currentQuestion] === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto"
                          >
                            <CheckCircle className="w-6 h-6 text-blue-500" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition ${
                        currentQuestion === 0
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>

                    <div className="flex gap-2">
                      {questions.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2.5 h-2.5 rounded-full transition-all ${
                            index === currentQuestion
                              ? 'bg-blue-600 w-6'
                              : index < currentQuestion
                              ? 'bg-blue-300'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Completion Message */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md mx-4"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Analyzing Your Responses
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Our AI is calculating your career matches and generating personalized recommendations...
                    </p>
                    <div className="flex justify-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                        className="w-3 h-3 bg-blue-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-3 h-3 bg-purple-500 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-3 h-3 bg-pink-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </>
          ) : (
            <>
              {/* Results Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                {/* Results Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-6 py-3 rounded-full text-lg font-semibold mb-4">
                    <Award className="w-6 h-6" />
                    Assessment Complete!
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Your Top Career Matches
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Based on your responses, we&apos;ve identified the careers that best match your skills, interests, and personality.
                  </p>
                </div>

                {/* Career Match Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.career.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative ${index === 0 ? 'md:-mt-4 md:mb-4' : ''}`}
                    >
                      <div
                        className={`glass-card bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border-2 h-full cursor-pointer transition-all duration-300 hover:shadow-3xl ${
                          index === 0
                            ? 'border-yellow-400 scale-105'
                            : index === 1
                            ? 'border-gray-300'
                            : 'border-orange-300'
                        } ${selectedCareer?.id === result.career.id ? 'ring-4 ring-blue-200' : ''}`}
                        onClick={() => setSelectedCareer(result.career)}
                      >
                        {/* Rank Badge */}
                        <div
                          className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white font-bold text-sm ${
                            index === 0
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                              : index === 1
                              ? 'bg-gradient-to-r from-gray-300 to-gray-400'
                              : 'bg-gradient-to-r from-orange-400 to-orange-500'
                          }`}
                        >
                          #{index + 1} Match
                        </div>

                        {/* Match Percentage */}
                        <div className="text-center mb-6">
                          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-4">
                            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {result.matchPercentage}%
                            </span>
                          </div>
                        </div>

                        {/* Career Info */}
                        <div className="text-center mb-6">
                          <div
                            className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${result.career.color} flex items-center justify-center text-white mb-4`}
                          >
                            {result.career.icon}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {result.career.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {result.career.description}
                          </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Briefcase className="w-4 h-4" />
                            <span>{result.career.salaryRange}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <TrendingUp className="w-4 h-4" />
                            <span>{result.career.growth}</span>
                          </div>
                        </div>

                        {/* View Roadmap Button */}
                        <button
                          className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold transition hover:shadow-lg flex items-center justify-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCareer(result.career)
                          }}
                        >
                          <BookOpen className="w-5 h-5" />
                          View Roadmap
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <button
                    onClick={resetAssessment}
                    className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-700 transition hover:border-blue-300 hover:shadow-lg"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Retake Assessment
                  </button>
                  <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition hover:shadow-lg">
                    <Download className="w-5 h-5" />
                    Download Report
                  </button>
                  <button className="flex items-center gap-2 px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-xl font-semibold transition hover:bg-blue-50">
                    <Share2 className="w-5 h-5" />
                    Share Results
                  </button>
                </div>

                {/* Selected Career Roadmap */}
                <AnimatePresence>
                  {selectedCareer && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      className="max-w-4xl mx-auto"
                    >
                      <div className="glass-card bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                        {/* Roadmap Header */}
                        <div
                          className={`p-8 bg-gradient-to-r ${selectedCareer.color}`}
                        >
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center text-white">
                              {selectedCareer.icon}
                            </div>
                            <div>
                              <h3 className="text-3xl font-bold text-white">
                                {selectedCareer.title} Roadmap
                              </h3>
                              <p className="text-white/80">
                                Your personalized path to becoming a {selectedCareer.title}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {selectedCareer.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm text-white font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Roadmap Stages */}
                        <div className="p-8">
                          <div className="space-y-8">
                            {selectedCareer.roadmap.map((stage, index) => (
                              <motion.div
                                key={stage.stage}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-8 md:pl-12 pb-8 border-l-4 border-blue-200 last:pb-0"
                              >
                                {/* Stage Indicator */}
                                <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                  {index + 1}
                                </div>

                                {/* Stage Content */}
                                <div className="bg-gray-50 rounded-2xl p-6">
                                  <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <h4 className="text-xl font-bold text-gray-800">
                                      {stage.stage}
                                    </h4>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                      {stage.duration}
                                    </span>
                                  </div>
                                  <p className="text-gray-600 mb-4">{stage.description}</p>

                                  {/* Skills */}
                                  <div className="mb-4">
                                    <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                      <Zap className="w-4 h-4 text-yellow-500" />
                                      Key Skills
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                      {stage.skills.map((skill) => (
                                        <span
                                          key={skill}
                                          className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-gray-600"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Resources */}
                                  <div>
                                    <h5 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                      <BookOpen className="w-4 h-4 text-blue-500" />
                                      Recommended Resources
                                    </h5>
                                    <ul className="space-y-1">
                                      {stage.resources.map((resource) => (
                                        <li
                                          key={resource}
                                          className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-2"
                                        >
                                          <ArrowRight className="w-3 h-3" />
                                          {resource}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Roadmap Footer */}
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                          <button
                            onClick={() => setSelectedCareer(null)}
                            className="text-gray-600 hover:text-gray-800 font-medium flex items-center gap-2"
                          >
                            <ChevronLeft className="w-5 h-5" />
                            Back to Results
                          </button>
                          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold transition hover:shadow-lg flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            Start Learning Path
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}


