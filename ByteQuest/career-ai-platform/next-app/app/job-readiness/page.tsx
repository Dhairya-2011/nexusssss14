'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import Modal from '../../components/Modal'
import { 
  FileText, 
  Mic, 
  Briefcase, 
  Download, 
  Plus, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Clock,
  Play,
  CheckCircle,
  AlertCircle,
  Target,
  TrendingUp,
  Award,
  Building2,
  Calendar,
  Save,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Star,
  MessageSquare,
  BarChart3,
  Filter,
  Search,
  ChevronDown,
  MoreHorizontal,
  RotateCcw,
  Mic2,
  Send,
  ThumbsUp,
  Lightbulb
} from 'lucide-react'

// Types
interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    fieldOfStudy: string
    graduationDate: string
  }>
  skills: string[]
}

interface InterviewQuestion {
  id: number
  category: 'Technical' | 'Behavioral' | 'Situational'
  role: string
  question: string
  tips: string[]
  sampleAnswer: string
}

interface JobApplication {
  id: string
  company: string
  position: string
  status: 'Applied' | 'Interview' | 'Offer' | 'Rejected'
  dateApplied: string
  notes: string
  salary: string
  location: string
}

interface InterviewSession {
  questionId: number
  answer: string
  feedback: string
  rating: number
}

// Mock Interview Questions Database
const interviewQuestions: InterviewQuestion[] = [
  // Technical Questions
  { id: 1, category: 'Technical', role: 'Software Engineer', question: 'Explain the difference between REST and GraphQL APIs.', tips: ['Mention data fetching efficiency', 'Discuss schema definition', 'Talk about over-fetching vs under-fetching'], sampleAnswer: 'REST uses multiple endpoints with fixed data structures, while GraphQL uses a single endpoint where clients specify exactly what data they need...' },
  { id: 2, category: 'Technical', role: 'Software Engineer', question: 'What is the time complexity of binary search?', tips: ['Explain O(log n)', 'Discuss the divide-and-conquer approach', 'Mention prerequisite of sorted data'], sampleAnswer: 'Binary search has O(log n) time complexity because it halves the search space with each iteration...' },
  { id: 3, category: 'Technical', role: 'Data Analyst', question: 'How would you handle missing data in a dataset?', tips: ['Mention different strategies', 'Discuss imputation techniques', 'Talk about when to remove data'], sampleAnswer: 'I would first analyze the pattern of missingness, then choose between removal, mean/median imputation, or advanced techniques like KNN imputation...' },
  { id: 4, category: 'Technical', role: 'Product Manager', question: 'How do you prioritize features in a product roadmap?', tips: ['Mention frameworks like RICE', 'Discuss user impact vs effort', 'Talk about stakeholder alignment'], sampleAnswer: 'I use the RICE framework (Reach, Impact, Confidence, Effort) combined with strategic goals and user feedback to prioritize features...' },
  { id: 5, category: 'Technical', role: 'UX Designer', question: 'Walk me through your design process.', tips: ['Mention user research', 'Discuss iteration', 'Include testing phases'], sampleAnswer: 'I follow a user-centered design process: research → ideation → prototyping → testing → iteration, always validating with real users...' },
  { id: 6, category: 'Technical', role: 'DevOps Engineer', question: 'Explain CI/CD and its benefits.', tips: ['Define the terms', 'Mention automation', 'Discuss deployment frequency'], sampleAnswer: 'CI/CD is Continuous Integration and Continuous Deployment, automating code integration, testing, and deployment to enable faster, reliable releases...' },
  { id: 7, category: 'Technical', role: 'Data Scientist', question: 'What is the bias-variance tradeoff?', tips: ['Define both terms', 'Discuss model complexity', 'Mention overfitting/underfitting'], sampleAnswer: 'The bias-variance tradeoff describes the tension between model simplicity (high bias) and sensitivity to training data (high variance)...' },
  { id: 8, category: 'Technical', role: 'Frontend Developer', question: 'Explain how Virtual DOM works in React.', tips: ['Mention reconciliation', 'Discuss performance benefits', 'Compare with real DOM'], sampleAnswer: 'Virtual DOM is a lightweight JavaScript representation of the actual DOM. React compares differences and updates only changed elements...' },
  
  // Behavioral Questions
  { id: 9, category: 'Behavioral', role: 'All Roles', question: 'Tell me about a time you faced a conflict with a team member.', tips: ['Use STAR method', 'Focus on resolution', 'Show emotional intelligence'], sampleAnswer: 'In my previous role, I disagreed with a teammate about implementation approach. I scheduled a 1:1, listened to their concerns, and we found a hybrid solution...' },
  { id: 10, category: 'Behavioral', role: 'All Roles', question: 'Describe a situation where you had to meet a tight deadline.', tips: ['Show prioritization skills', 'Mention time management', 'Discuss the outcome'], sampleAnswer: 'When our client moved up a deadline by two weeks, I prioritized features, communicated with stakeholders, and led the team to deliver on time through focused sprints...' },
  { id: 11, category: 'Behavioral', role: 'All Roles', question: 'How do you handle criticism or negative feedback?', tips: ['Show growth mindset', 'Mention active listening', 'Discuss implementation'], sampleAnswer: 'I view feedback as a growth opportunity. I listen actively, ask clarifying questions, create an action plan, and follow up to show improvement...' },
  { id: 12, category: 'Behavioral', role: 'All Roles', question: 'Tell me about a time you failed and what you learned.', tips: ['Be honest', 'Focus on lessons learned', 'Show resilience'], sampleAnswer: 'Early in my career, I underestimated project scope. The lesson taught me to break down tasks better and communicate risks early. Now I always build in buffer time...' },
  { id: 13, category: 'Behavioral', role: 'All Roles', question: 'Describe how you work under pressure.', tips: ['Show stress management', 'Mention focus techniques', 'Give specific example'], sampleAnswer: 'I thrive under pressure by breaking tasks into manageable chunks, prioritizing ruthlessly, and maintaining open communication with stakeholders...' },
  { id: 14, category: 'Behavioral', role: 'All Roles', question: 'How do you stay updated with industry trends?', tips: ['Mention specific resources', 'Show continuous learning', 'Discuss application'], sampleAnswer: 'I follow industry blogs, attend webinars, participate in online communities, and dedicate Friday afternoons to learning new technologies...' },
  { id: 15, category: 'Behavioral', role: 'All Roles', question: 'Tell me about a time you demonstrated leadership.', tips: ['Use STAR method', 'Show initiative', 'Mention team impact'], sampleAnswer: 'When our team lead was out sick during a critical sprint, I stepped up to coordinate daily standups and remove blockers, ensuring we met our deadline...' },
  { id: 16, category: 'Behavioral', role: 'All Roles', question: 'How do you handle multiple competing priorities?', tips: ['Show organization skills', 'Mention communication', 'Discuss delegation'], sampleAnswer: 'I use Eisenhower Matrix to categorize tasks, communicate priorities with stakeholders, and focus on high-impact activities while managing expectations...' },
  
  // Situational Questions
  { id: 17, category: 'Situational', role: 'All Roles', question: 'What would you do if you disagree with your manager\'s decision?', tips: ['Show respect', 'Mention constructive dialogue', 'Discuss when to escalate'], sampleAnswer: 'I would request a private meeting to understand their perspective, present data-driven concerns respectfully, and ultimately support the final decision...' },
  { id: 18, category: 'Situational', role: 'All Roles', question: 'How would you handle a project falling behind schedule?', tips: ['Show problem-solving', 'Mention communication', 'Discuss resource reallocation'], sampleAnswer: 'I would immediately assess bottlenecks, communicate with stakeholders about revised timeline, consider scope reduction or resource addition, and implement daily check-ins...' },
  { id: 19, category: 'Situational', role: 'All Roles', question: 'A key team member resigns mid-project. What do you do?', tips: ['Show calm under pressure', 'Mention knowledge transfer', 'Discuss team morale'], sampleAnswer: 'I would ensure proper knowledge transfer, redistribute work based on strengths, communicate transparently with the team, and initiate hiring process while managing scope...' },
  { id: 20, category: 'Situational', role: 'All Roles', question: 'How would you onboard a new team member remotely?', tips: ['Show organization', 'Mention buddy system', 'Discuss documentation'], sampleAnswer: 'I would create a structured 30-60-90 day plan, assign a buddy, schedule regular check-ins, provide comprehensive documentation, and ensure social integration through virtual coffee chats...' }
]

const resumeTemplates = [
  { id: 'professional', name: 'Professional', color: 'bg-blue-600', description: 'Clean and traditional' },
  { id: 'creative', name: 'Creative', color: 'bg-purple-600', description: 'Modern and unique' },
  { id: 'technical', name: 'Technical', color: 'bg-green-600', description: 'Skills-focused' },
  { id: 'executive', name: 'Executive', color: 'bg-gray-800', description: 'Leadership-oriented' }
]

const jobRoles = ['Software Engineer', 'Data Analyst', 'Product Manager', 'UX Designer', 'DevOps Engineer', 'Data Scientist', 'Frontend Developer', 'Marketing Manager']

export default function JobReadinessPage() {
  // Stats
  const [stats, setStats] = useState({
    totalApplications: 24,
    interviewsCompleted: 18,
    successRate: 75,
    offersReceived: 3
  })

  // Resume Builder State
  const [selectedTemplate, setSelectedTemplate] = useState('professional')
  const [showResumeModal, setShowResumeModal] = useState(false)
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: []
  })
  const [activeResumeSection, setActiveResumeSection] = useState('personal')
  const [newSkill, setNewSkill] = useState('')

  // Mock Interview State
  const [selectedRole, setSelectedRole] = useState('Software Engineer')
  const [selectedCategory, setSelectedCategory] = useState<'Technical' | 'Behavioral' | 'Situational'>('Technical')
  const [isInterviewActive, setIsInterviewActive] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [interviewSession, setInterviewSession] = useState<InterviewSession[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [showAnswerInput, setShowAnswerInput] = useState(false)
  const [timer, setTimer] = useState(180) // 3 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  // Job Tracker State
  const [applications, setApplications] = useState<JobApplication[]>([
    { id: '1', company: 'TechCorp', position: 'Software Engineer', status: 'Interview', dateApplied: '2026-01-15', notes: 'First round completed', salary: '$120k - $150k', location: 'San Francisco, CA' },
    { id: '2', company: 'DataFlow Inc', position: 'Data Analyst', status: 'Applied', dateApplied: '2026-01-20', notes: 'Waiting for response', salary: '$90k - $110k', location: 'Remote' },
    { id: '3', company: 'DesignHub', position: 'UX Designer', status: 'Offer', dateApplied: '2026-01-10', notes: 'Offer received, negotiating', salary: '$100k - $130k', location: 'New York, NY' },
    { id: '4', company: 'CloudScale', position: 'DevOps Engineer', status: 'Rejected', dateApplied: '2026-01-05', notes: 'Position filled internally', salary: '$110k - $140k', location: 'Austin, TX' }
  ])
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null)
  const [newApplication, setNewApplication] = useState<Partial<JobApplication>>({
    status: 'Applied',
    dateApplied: new Date().toISOString().split('T')[0]
  })
  const [filterStatus, setFilterStatus] = useState<string>('All')

  // Filter questions based on selection
  const filteredQuestions = interviewQuestions.filter(q => 
    (selectedRole === 'All Roles' || q.role === selectedRole || q.role === 'All Roles') &&
    q.category === selectedCategory
  )

  const currentQuestion = filteredQuestions[currentQuestionIndex]

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1)
      }, 1000)
    } else if (timer === 0) {
      setIsTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timer])

  // Resume Builder Functions
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { 
        id: Date.now().toString(), 
        company: '', 
        position: '', 
        startDate: '', 
        endDate: '', 
        description: '' 
      }]
    }))
  }

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { 
        id: Date.now().toString(), 
        institution: '', 
        degree: '', 
        fieldOfStudy: '', 
        graduationDate: '' 
      }]
    }))
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }))
  }

  const downloadResume = () => {
    const resumeText = `
${resumeData.personalInfo.fullName}
${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}
LinkedIn: ${resumeData.personalInfo.linkedin}

SUMMARY
${resumeData.personalInfo.summary}

EXPERIENCE
${resumeData.experience.map(exp => `
${exp.position} at ${exp.company}
${exp.startDate} - ${exp.endDate}
${exp.description}
`).join('')}

EDUCATION
${resumeData.education.map(edu => `
${edu.degree} in ${edu.fieldOfStudy}
${edu.institution}, ${edu.graduationDate}
`).join('')}

SKILLS
${resumeData.skills.join(', ')}
`
    const blob = new Blob([resumeText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resumeData.personalInfo.fullName || 'Resume'}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Interview Functions
  const startInterview = () => {
    setIsInterviewActive(true)
    setCurrentQuestionIndex(0)
    setCurrentAnswer('')
    setInterviewSession([])
    setTimer(180)
    setShowFeedback(false)
  }

  const submitAnswer = () => {
    const feedback = generateFeedback(currentAnswer, currentQuestion)
    const newSession: InterviewSession = {
      questionId: currentQuestion.id,
      answer: currentAnswer,
      feedback,
      rating: Math.floor(Math.random() * 3) + 3 // Random rating 3-5 for demo
    }
    setInterviewSession(prev => [...prev, newSession])
    setShowFeedback(true)
  }

  const generateFeedback = (answer: string, question: InterviewQuestion) => {
    const answerLength = answer.length
    if (answerLength < 50) return 'Your answer is quite brief. Try to provide more detail and specific examples.'
    if (answerLength > 500) return 'Great detailed answer! You covered multiple aspects of the question well.'
    return 'Good answer! Consider adding more specific examples or quantifiable results.'
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setCurrentAnswer('')
      setShowFeedback(false)
      setTimer(180)
      setIsTimerRunning(false)
    } else {
      setIsInterviewActive(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Job Tracker Functions
  const saveApplication = () => {
    if (editingApplication) {
      setApplications(prev => prev.map(app => 
        app.id === editingApplication.id ? { ...app, ...newApplication } as JobApplication : app
      ))
    } else {
      const application: JobApplication = {
        id: Date.now().toString(),
        company: newApplication.company || '',
        position: newApplication.position || '',
        status: newApplication.status as JobApplication['status'] || 'Applied',
        dateApplied: newApplication.dateApplied || new Date().toISOString().split('T')[0],
        notes: newApplication.notes || '',
        salary: newApplication.salary || '',
        location: newApplication.location || ''
      }
      setApplications(prev => [...prev, application])
    }
    setShowApplicationModal(false)
    setEditingApplication(null)
    setNewApplication({ status: 'Applied', dateApplied: new Date().toISOString().split('T')[0] })
  }

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id))
  }

  const editApplication = (app: JobApplication) => {
    setEditingApplication(app)
    setNewApplication(app)
    setShowApplicationModal(true)
  }

  const filteredApplications = filterStatus === 'All' 
    ? applications 
    : applications.filter(app => app.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Interview': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Offer': return 'bg-green-100 text-green-800 border-green-200'
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusCount = (status: string) => {
    return applications.filter(app => app.status === status).length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Job Readiness Center
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Everything you need to land your dream job. Build your resume, practice interviews, and track applications.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Dashboard */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-bold text-blue-900">{stats.totalApplications}</span>
              </div>
              <p className="text-blue-700 font-medium">Applications Sent</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <Mic className="w-8 h-8 text-purple-600" />
                <span className="text-3xl font-bold text-purple-900">{stats.interviewsCompleted}</span>
              </div>
              <p className="text-purple-700 font-medium">Mock Interviews</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-bold text-green-900">{stats.successRate}%</span>
              </div>
              <p className="text-green-700 font-medium">Success Rate</p>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <Award className="w-8 h-8 text-yellow-600" />
                <span className="text-3xl font-bold text-yellow-900">{stats.offersReceived}</span>
              </div>
              <p className="text-yellow-700 font-medium">Offers Received</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Resume Builder Section */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">Resume Builder</h2>
                  <p className="text-blue-100 text-sm">Create professional resumes</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Template Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Choose Template</h3>
                <div className="grid grid-cols-2 gap-3">
                  {resumeTemplates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-xl border-2 transition-all text-left ${
                        selectedTemplate === template.id 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className={`w-8 h-8 ${template.color} rounded-lg mb-2`} />
                      <p className="font-semibold text-sm">{template.name}</p>
                      <p className="text-xs text-gray-500">{template.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Preview */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-700">Live Preview</h4>
                  <button 
                    onClick={() => setShowResumeModal(true)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4" />
                    Full Preview
                  </button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <h5 className="font-bold text-lg mb-1">
                    {resumeData.personalInfo.fullName || 'Your Name'}
                  </h5>
                  <p className="text-sm text-gray-600 mb-2">
                    {resumeData.personalInfo.email || 'email@example.com'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {resumeData.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                    {resumeData.skills.length === 0 && (
                      <span className="text-xs text-gray-400">No skills added yet</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <Edit3 className="w-5 h-5" />
                  Edit Resume
                </button>
                <button
                  onClick={downloadResume}
                  className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </button>
              </div>
            </div>
          </section>

          {/* Mock Interview Section */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
              <div className="flex items-center gap-3">
                <Mic className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">Mock Interview</h2>
                  <p className="text-purple-100 text-sm">Practice with AI feedback</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {!isInterviewActive ? (
                <>
                  {/* Role Selection */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Select Job Role</h3>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {jobRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  {/* Category Selection */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Question Category</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Technical', 'Behavioral', 'Situational'] as const).map(cat => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`p-3 rounded-xl text-sm font-medium transition ${
                            selectedCategory === cat
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question Preview */}
                  <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2">Sample Questions</h4>
                    <ul className="space-y-2">
                      {filteredQuestions.slice(0, 3).map((q, i) => (
                        <li key={q.id} className="text-sm text-purple-800 flex items-start gap-2">
                          <span className="text-purple-600 font-bold">{i + 1}.</span>
                          {q.question}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-purple-600 mt-3">
                      + {filteredQuestions.length - 3} more questions available
                    </p>
                  </div>

                  <button
                    onClick={startInterview}
                    className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Start Practice Session
                  </button>
                </>
              ) : (
                <>
                  {/* Active Interview */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Question</span>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-sm font-bold">
                          {currentQuestionIndex + 1} / {filteredQuestions.length}
                        </span>
                      </div>
                      <div className={`flex items-center gap-2 text-lg font-mono font-bold ${
                        timer < 30 ? 'text-red-600' : 'text-gray-700'
                      }`}>
                        <Clock className="w-5 h-5" />
                        {formatTime(timer)}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all"
                        style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
                      />
                    </div>

                    {/* Question */}
                    <div className="bg-purple-50 rounded-xl p-4 mb-4 border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                          {currentQuestion.category}
                        </span>
                      </div>
                      <p className="text-lg font-medium text-gray-900">{currentQuestion.question}</p>
                    </div>

                    {!showFeedback ? (
                      <>
                        {/* Answer Input */}
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setIsTimerRunning(!isTimerRunning)}
                              className={`flex-1 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                                isTimerRunning 
                                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                                  : 'bg-green-100 text-green-700 hover:bg-green-200'
                              }`}
                            >
                              {isTimerRunning ? <><AlertCircle className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start Timer</>}
                            </button>
                            <button
                              onClick={() => setTimer(180)}
                              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <textarea
                            value={currentAnswer}
                            onChange={(e) => setCurrentAnswer(e.target.value)}
                            placeholder="Type your answer here... (or use the microphone to record)"
                            className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          />
                          
                          <div className="flex gap-3">
                            <button
                              onClick={() => setShowAnswerInput(!showAnswerInput)}
                              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
                            >
                              <Mic2 className="w-4 h-4" />
                              {showAnswerInput ? 'Hide Tips' : 'Show Tips'}
                            </button>
                            <button
                              onClick={submitAnswer}
                              disabled={!currentAnswer.trim()}
                              className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Send className="w-4 h-4" />
                              Submit Answer
                            </button>
                          </div>

                          {showAnswerInput && (
                            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                              <div className="flex items-center gap-2 mb-2">
                                <Lightbulb className="w-5 h-5 text-yellow-600" />
                                <h4 className="font-semibold text-yellow-900">Interview Tips</h4>
                              </div>
                              <ul className="space-y-1">
                                {currentQuestion.tips.map((tip, i) => (
                                  <li key={i} className="text-sm text-yellow-800 flex items-start gap-2">
                                    <span className="text-yellow-600">•</span>
                                    {tip}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Feedback */}
                        <div className="space-y-4">
                          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                            <div className="flex items-center gap-2 mb-3">
                              <ThumbsUp className="w-5 h-5 text-green-600" />
                              <h4 className="font-semibold text-green-900">Feedback</h4>
                            </div>
                            <p className="text-green-800 mb-3">{interviewSession[interviewSession.length - 1]?.feedback}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-green-700">Rating:</span>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < (interviewSession[interviewSession.length - 1]?.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                            <h4 className="font-semibold text-blue-900 mb-2">Sample Answer</h4>
                            <p className="text-sm text-blue-800">{currentQuestion.sampleAnswer}</p>
                          </div>

                          <div className="flex gap-3">
                            <button
                              onClick={() => setIsInterviewActive(false)}
                              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
                            >
                              End Session
                            </button>
                            <button
                              onClick={nextQuestion}
                              className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2"
                            >
                              {currentQuestionIndex < filteredQuestions.length - 1 ? (
                                <><ChevronRight className="w-5 h-5" /> Next Question</>
                              ) : (
                                <><CheckCircle className="w-5 h-5" /> Finish</>
                              )}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Job Application Tracker Section */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
              <div className="flex items-center gap-3">
                <Briefcase className="w-8 h-8" />
                <div>
                  <h2 className="text-2xl font-bold">Application Tracker</h2>
                  <p className="text-green-100 text-sm">Manage your job search</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Pipeline View */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">Application Pipeline</h3>
                  <button 
                    onClick={() => {
                      setEditingApplication(null)
                      setNewApplication({ status: 'Applied', dateApplied: new Date().toISOString().split('T')[0] })
                      setShowApplicationModal(true)
                    }}
                    className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-2 text-center">
                  {['Applied', 'Interview', 'Offer', 'Rejected'].map(status => (
                    <div key={status} className="bg-gray-50 rounded-lg p-2">
                      <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold mb-1 ${
                        status === 'Applied' ? 'bg-blue-500 text-white' :
                        status === 'Interview' ? 'bg-yellow-500 text-white' :
                        status === 'Offer' ? 'bg-green-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {getStatusCount(status)}
                      </div>
                      <p className="text-xs text-gray-600">{status}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filter */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="All">All Applications</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {filteredApplications.map(app => (
                  <div key={app.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{app.position}</h4>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {app.company}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => editApplication(app)}
                          className="p-1 text-gray-500 hover:text-blue-600 transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteApplication(app.id)}
                          className="p-1 text-gray-500 hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {app.dateApplied}
                      </span>
                    </div>
                    
                    {app.notes && (
                      <p className="text-xs text-gray-600 mt-2 bg-white p-2 rounded border border-gray-200">
                        {app.notes}
                      </p>
                    )}
                  </div>
                ))}
                
                {filteredApplications.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No applications found</p>
                    <p className="text-sm">Add your first application above</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Resume Builder Modal */}
      <Modal 
        isOpen={showResumeModal} 
        onClose={() => setShowResumeModal(false)}
        title="Resume Builder"
        maxWidth="900px"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Form Sections */}
          <div className="md:col-span-2 space-y-4">
            {/* Section Tabs */}
            <div className="flex gap-2 border-b border-gray-200">
              {['personal', 'experience', 'education', 'skills'].map(section => (
                <button
                  key={section}
                  onClick={() => setActiveResumeSection(section)}
                  className={`px-4 py-2 font-medium capitalize transition border-b-2 ${
                    activeResumeSection === section
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Personal Info Form */}
            {activeResumeSection === 'personal' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.fullName}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, fullName: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={resumeData.personalInfo.email}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, email: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) => setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.location}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, location: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                  <textarea
                    value={resumeData.personalInfo.summary}
                    onChange={(e) => setResumeData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, summary: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                    placeholder="Brief summary of your professional background..."
                  />
                </div>
              </div>
            )}

            {/* Experience Form */}
            {activeResumeSection === 'experience' && (
              <div className="space-y-4">
                {resumeData.experience.map((exp, index) => (
                  <div key={exp.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800">Experience #{index + 1}</h4>
                      <button
                        onClick={() => setResumeData(prev => ({
                          ...prev,
                          experience: prev.experience.filter(e => e.id !== exp.id)
                        }))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience]
                          newExp[index].company = e.target.value
                          setResumeData(prev => ({ ...prev, experience: newExp }))
                        }}
                        className="w-full p-3 border border-gray-300 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="Position"
                        value={exp.position}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience]
                          newExp[index].position = e.target.value
                          setResumeData(prev => ({ ...prev, experience: newExp }))
                        }}
                        className="w-full p-3 border border-gray-300 rounded-xl"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => {
                            const newExp = [...resumeData.experience]
                            newExp[index].startDate = e.target.value
                            setResumeData(prev => ({ ...prev, experience: newExp }))
                          }}
                          className="w-full p-3 border border-gray-300 rounded-xl"
                        />
                        <input
                          type="text"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) => {
                            const newExp = [...resumeData.experience]
                            newExp[index].endDate = e.target.value
                            setResumeData(prev => ({ ...prev, experience: newExp }))
                          }}
                          className="w-full p-3 border border-gray-300 rounded-xl"
                        />
                      </div>
                      <textarea
                        placeholder="Description"
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience]
                          newExp[index].description = e.target.value
                          setResumeData(prev => ({ ...prev, experience: newExp }))
                        }}
                        className="w-full p-3 border border-gray-300 rounded-xl h-24 resize-none"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addExperience}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Experience
                </button>
              </div>
            )}

            {/* Education Form */}
            {activeResumeSection === 'education' && (
              <div className="space-y-4">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-semibold text-gray-800">Education #{index + 1}</h4>
                      <button
                        onClick={() => setResumeData(prev => ({
                          ...prev,
                          education: prev.education.filter(e => e.id !== edu.id)
                        }))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education]
                          newEdu[index].institution = e.target.value
                          setResumeData(prev => ({ ...prev, education: newEdu }))
                        }}
                        className="w-full p-3 border border-gray-300 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education]
                          newEdu[index].degree = e.target.value
                          setResumeData(prev => ({ ...prev, education: newEdu }))
                        }}
                        className="w-full p-3 border border-gray-300 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="Field of Study"
                        value={edu.fieldOfStudy}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education]
                          newEdu[index].fieldOfStudy = e.target.value
                          setResumeData(prev => ({ ...prev, education: newEdu }))
                        }}
                        className="w-full p-3 border border-gray-300 rounded-xl"
                      />
                      <input
                        type="text"
                        placeholder="Graduation Date"
                        value={edu.graduationDate}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education]
                          newEdu[index].graduationDate = e.target.value
                          setResumeData(prev => ({ ...prev, education: newEdu }))
                        }}
                        className="w-full p-3 border border-gray-300 rounded-xl"
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={addEducation}
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add Education
                </button>
              </div>
            )}

            {/* Skills Form */}
            {activeResumeSection === 'skills' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a skill (e.g., JavaScript, Project Management)"
                    className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={addSkill}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
                {resumeData.skills.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No skills added yet</p>
                )}
              </div>
            )}
          </div>

          {/* Live Preview */}
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-4">Live Preview</h3>
            <div className="bg-white rounded-lg shadow-sm p-6 min-h-[600px]">
              <div className={`border-b-2 pb-4 mb-4 ${
                selectedTemplate === 'professional' ? 'border-blue-600' :
                selectedTemplate === 'creative' ? 'border-purple-600' :
                selectedTemplate === 'technical' ? 'border-green-600' :
                'border-gray-800'
              }`}>
                <h2 className="text-2xl font-bold text-gray-900">
                  {resumeData.personalInfo.fullName || 'Your Name'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {resumeData.personalInfo.email && `${resumeData.personalInfo.email} • `}
                  {resumeData.personalInfo.phone && `${resumeData.personalInfo.phone} • `}
                  {resumeData.personalInfo.location}
                </p>
                {resumeData.personalInfo.linkedin && (
                  <p className="text-sm text-blue-600 mt-1">{resumeData.personalInfo.linkedin}</p>
                )}
              </div>

              {resumeData.personalInfo.summary && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Summary</h3>
                  <p className="text-sm text-gray-700">{resumeData.personalInfo.summary}</p>
                </div>
              )}

              {resumeData.experience.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Experience</h3>
                  {resumeData.experience.map((exp, i) => (
                    <div key={i} className="mb-3">
                      <p className="font-semibold text-gray-900">{exp.position}</p>
                      <p className="text-sm text-gray-600">{exp.company}</p>
                      <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                      <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {resumeData.education.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Education</h3>
                  {resumeData.education.map((edu, i) => (
                    <div key={i} className="mb-2">
                      <p className="font-semibold text-gray-900">{edu.degree} in {edu.fieldOfStudy}</p>
                      <p className="text-sm text-gray-600">{edu.institution}, {edu.graduationDate}</p>
                    </div>
                  ))}
                </div>
              )}

              {resumeData.skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">Skills</h3>
                  <p className="text-sm text-gray-700">{resumeData.skills.join(' • ')}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowResumeModal(false)}
            className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              setShowResumeModal(false)
              downloadResume()
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </button>
        </div>
      </Modal>

      {/* Application Modal */}
      <Modal
        isOpen={showApplicationModal}
        onClose={() => {
          setShowApplicationModal(false)
          setEditingApplication(null)
        }}
        title={editingApplication ? 'Edit Application' : 'Add New Application'}
        maxWidth="500px"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              value={newApplication.company || ''}
              onChange={(e) => setNewApplication(prev => ({ ...prev, company: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Company Name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              value={newApplication.position || ''}
              onChange={(e) => setNewApplication(prev => ({ ...prev, position: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Job Title"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={newApplication.status}
                onChange={(e) => setNewApplication(prev => ({ ...prev, status: e.target.value as JobApplication['status'] }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Applied</label>
              <input
                type="date"
                value={newApplication.dateApplied}
                onChange={(e) => setNewApplication(prev => ({ ...prev, dateApplied: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
            <input
              type="text"
              value={newApplication.salary || ''}
              onChange={(e) => setNewApplication(prev => ({ ...prev, salary: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="e.g., $80k - $100k"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={newApplication.location || ''}
              onChange={(e) => setNewApplication(prev => ({ ...prev, location: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="City, State or Remote"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={newApplication.notes || ''}
              onChange={(e) => setNewApplication(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 resize-none"
              placeholder="Add any notes about this application..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => {
              setShowApplicationModal(false)
              setEditingApplication(null)
            }}
            className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={saveApplication}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {editingApplication ? 'Save Changes' : 'Add Application'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
