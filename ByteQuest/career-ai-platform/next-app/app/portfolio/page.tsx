'use client'

import { useState, useMemo } from 'react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'
import { 
  Search, 
  Filter, 
  Clock, 
  BarChart3, 
  Code2, 
  Database, 
  Globe, 
  Bot,
  Cpu,
  Layout,
  ShoppingCart,
  ChevronRight,
  Star,
  CheckCircle2,
  Circle,
  Play,
  BookOpen,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react'

// TypeScript Types
type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced'
type ProjectCategory = 'Data Analysis' | 'Machine Learning' | 'Web Development' | 'Database' | 'API Development' | 'All'

interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  difficulty: DifficultyLevel
  duration: string
  skills: string[]
  progress: number
  totalSteps: number
  completedSteps: number
  icon: React.ReactNode
  color: string
  featured?: boolean
}

interface ProgressStats {
  totalProjects: number
  completedProjects: number
  inProgressProjects: number
  totalHours: number
  skillsAcquired: number
}

// Sample Projects Data
const projects: Project[] = [
  {
    id: '1',
    title: 'Data Analysis Dashboard',
    description: 'Build an interactive data visualization dashboard using Python, Pandas, and Streamlit. Analyze real-world datasets and create compelling visualizations.',
    category: 'Data Analysis',
    difficulty: 'Intermediate',
    duration: '3-4 weeks',
    skills: ['Python', 'Pandas', 'Streamlit', 'Data Visualization', 'Matplotlib'],
    progress: 65,
    totalSteps: 8,
    completedSteps: 5,
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    featured: true
  },
  {
    id: '2',
    title: 'Machine Learning Prediction Model',
    description: 'Develop a predictive model using scikit-learn to solve real-world classification or regression problems. Learn feature engineering and model evaluation.',
    category: 'Machine Learning',
    difficulty: 'Advanced',
    duration: '4-6 weeks',
    skills: ['Python', 'scikit-learn', 'NumPy', 'Pandas', 'Model Evaluation'],
    progress: 30,
    totalSteps: 10,
    completedSteps: 3,
    icon: <Cpu className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    featured: true
  },
  {
    id: '3',
    title: 'REST API Development',
    description: 'Build a robust REST API using Flask or FastAPI. Implement authentication, CRUD operations, and documentation with Swagger/OpenAPI.',
    category: 'API Development',
    difficulty: 'Intermediate',
    duration: '2-3 weeks',
    skills: ['Python', 'Flask/FastAPI', 'REST Architecture', 'JWT Auth', 'Swagger'],
    progress: 0,
    totalSteps: 6,
    completedSteps: 0,
    icon: <Code2 className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: '4',
    title: 'Database Design Project',
    description: 'Design and implement a relational database schema. Practice normalization, indexing, and complex SQL queries for real-world scenarios.',
    category: 'Database',
    difficulty: 'Intermediate',
    duration: '2-3 weeks',
    skills: ['SQL', 'Database Design', 'Normalization', 'PostgreSQL/MySQL', 'Indexing'],
    progress: 80,
    totalSteps: 7,
    completedSteps: 5,
    icon: <Database className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500'
  },
  {
    id: '5',
    title: 'Frontend Portfolio Site',
    description: 'Create a stunning personal portfolio website using React and TypeScript. Implement responsive design and modern animations.',
    category: 'Web Development',
    difficulty: 'Beginner',
    duration: '2-3 weeks',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Responsive Design', 'Framer Motion'],
    progress: 45,
    totalSteps: 5,
    completedSteps: 2,
    icon: <Layout className="w-6 h-6" />,
    color: 'from-cyan-500 to-blue-500',
    featured: true
  },
  {
    id: '6',
    title: 'E-commerce Website',
    description: 'Build a full-stack e-commerce platform with product catalog, shopping cart, and checkout functionality.',
    category: 'Web Development',
    difficulty: 'Advanced',
    duration: '6-8 weeks',
    skills: ['Next.js', 'Node.js', 'MongoDB', 'Stripe API', 'Redux/Context API'],
    progress: 15,
    totalSteps: 12,
    completedSteps: 2,
    icon: <ShoppingCart className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: '7',
    title: 'Chatbot Application',
    description: 'Develop an intelligent chatbot using NLP libraries or API integration. Implement conversation flows and context management.',
    category: 'Machine Learning',
    difficulty: 'Intermediate',
    duration: '3-4 weeks',
    skills: ['Python', 'NLP', 'OpenAI API', 'Dialogflow', 'Flask'],
    progress: 0,
    totalSteps: 8,
    completedSteps: 0,
    icon: <Bot className="w-6 h-6" />,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: '8',
    title: 'Web Scraping Tool',
    description: 'Create a web scraping application to extract data from websites. Handle dynamic content and store data efficiently.',
    category: 'Data Analysis',
    difficulty: 'Beginner',
    duration: '1-2 weeks',
    skills: ['Python', 'BeautifulSoup', 'Selenium', 'Requests', 'JSON/CSV'],
    progress: 100,
    totalSteps: 4,
    completedSteps: 4,
    icon: <Globe className="w-6 h-6" />,
    color: 'from-teal-500 to-green-500'
  }
]

// Project Templates Library
const projectTemplates = [
  {
    id: 'template-1',
    title: 'Starter Template',
    description: 'Basic project structure with linting and testing setup',
    category: 'Web Development',
    downloads: 1240
  },
  {
    id: 'template-2',
    title: 'Data Science Template',
    description: 'Jupyter notebook setup with common data science libraries',
    category: 'Data Analysis',
    downloads: 890
  },
  {
    id: 'template-3',
    title: 'API Template',
    description: 'FastAPI boilerplate with authentication and database',
    category: 'API Development',
    downloads: 650
  }
]

// Difficulty Badge Component
const DifficultyBadge = ({ level }: { level: DifficultyLevel }) => {
  const colors = {
    Beginner: 'bg-green-100 text-green-700 border-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Advanced: 'bg-red-100 text-red-700 border-red-200'
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[level]}`}>
      {level}
    </span>
  )
}

// Progress Bar Component
const ProgressBar = ({ progress, size = 'md' }: { progress: number; size?: 'sm' | 'md' | 'lg' }) => {
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  }

  return (
    <div className={`w-full ${heightClasses[size]} bg-gray-200 rounded-full overflow-hidden`}>
      <div 
        className={`h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// Project Card Component
const ProjectCard = ({ 
  project, 
  onStart 
}: { 
  project: Project; 
  onStart: (id: string) => void 
}) => {
  const isCompleted = project.progress === 100
  const isInProgress = project.progress > 0 && project.progress < 100

  return (
    <div className="group relative bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300">
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-semibold rounded-full">
            <Star className="w-3 h-3" />
            Featured
          </span>
        </div>
      )}

      {/* Card Header with Icon */}
      <div className={`h-32 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white">
          {project.icon}
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full" />
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <DifficultyBadge level={project.difficulty} />
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {project.duration}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.skills.slice(0, 3).map((skill, idx) => (
            <span 
              key={idx}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-md">
              +{project.skills.length - 3}
            </span>
          )}
        </div>

        {/* Progress Section */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Completed
                </>
              ) : isInProgress ? (
                <>
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  {project.completedSteps} / {project.totalSteps} steps
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4 text-gray-400" />
                  Not started
                </>
              )}
            </span>
            <span className="font-semibold text-gray-900">{project.progress}%</span>
          </div>
          <ProgressBar progress={project.progress} />
        </div>

        {/* Action Button */}
        <button
          onClick={() => onStart(project.id)}
          className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
            isCompleted 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : isInProgress
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-[1.02]'
              : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
          }`}
        >
          {isCompleted ? (
            <>
              <Award className="w-4 h-4" />
              View Certificate
            </>
          ) : isInProgress ? (
            <>
              <Play className="w-4 h-4" />
              Continue Project
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Start Project
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// Progress Dashboard Component
const ProgressDashboard = ({ stats }: { stats: ProgressStats }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-6 md:p-8 text-white shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Your Progress Dashboard</h2>
          <p className="text-blue-100 text-sm">Track your learning journey</p>
        </div>
        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
          <BarChart3 className="w-7 h-7 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-3xl font-bold mb-1">{stats.totalProjects}</div>
          <div className="text-blue-100 text-xs">Total Projects</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-3xl font-bold mb-1 text-green-300">{stats.completedProjects}</div>
          <div className="text-blue-100 text-xs">Completed</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-3xl font-bold mb-1 text-yellow-300">{stats.inProgressProjects}</div>
          <div className="text-blue-100 text-xs">In Progress</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="text-3xl font-bold mb-1">{stats.totalHours}</div>
          <div className="text-blue-100 text-xs">Hours Spent</div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-300" />
            <span className="text-sm">Skills Acquired: <strong>{stats.skillsAcquired}</strong></span>
          </div>
          <button className="text-sm bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition flex items-center gap-1">
            View Details
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Template Card Component
const TemplateCard = ({ template }: { template: typeof projectTemplates[0] }) => {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
          <BookOpen className="w-5 h-5" />
        </div>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Zap className="w-3 h-3" />
          {template.downloads} uses
        </span>
      </div>
      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
        {template.title}
      </h4>
      <p className="text-xs text-gray-600 mb-3">{template.description}</p>
      <button className="w-full py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
        Use Template
      </button>
    </div>
  )
}

// Main Page Component
export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  // Categories for filtering
  const categories: (ProjectCategory | 'All')[] = ['All', 'Data Analysis', 'Machine Learning', 'Web Development', 'Database', 'API Development']

  // Calculate stats
  const stats: ProgressStats = useMemo(() => {
    const completed = projects.filter(p => p.progress === 100).length
    const inProgress = projects.filter(p => p.progress > 0 && p.progress < 100).length
    const totalHours = projects.reduce((acc, p) => acc + (parseInt(p.duration) * 10), 0)
    const uniqueSkills = new Set(projects.flatMap(p => p.skills)).size

    return {
      totalProjects: projects.length,
      completedProjects: completed,
      inProgressProjects: inProgress,
      totalHours,
      skillsAcquired: uniqueSkills
    }
  }, [])

  // Filter projects
  useMemo(() => {
    let filtered = projects

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.skills.some(s => s.toLowerCase().includes(query))
      )
    }

    setFilteredProjects(filtered)
  }, [selectedCategory, searchQuery])

  // Handle project start/continue
  const handleProjectAction = (projectId: string) => {
    console.log(`Starting/continuing project ${projectId}`)
    // Navigate to project detail page or open modal
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-8 pb-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Project Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Build real-world projects to showcase your skills and accelerate your career growth
            </p>
          </div>

          {/* Progress Dashboard */}
          <ProgressDashboard stats={stats} />
        </section>

        {/* Search and Filter Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects by name, description, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600 font-medium">Filter:</span>
              </div>
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'All' ? 'All Projects' : `${selectedCategory} Projects`}
            </h2>
            <span className="text-gray-500 text-sm">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onStart={handleProjectAction}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </section>

        {/* Project Templates Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Project Templates Library</h2>
                <p className="text-gray-400">Jumpstart your projects with pre-built templates</p>
              </div>
              <button className="mt-4 md:mt-0 bg-white text-gray-900 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Browse All Templates
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Full Stack Developer', 'Data Scientist', 'Machine Learning Engineer'].map((path, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{path}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  A curated collection of projects to master {path.toLowerCase()} skills
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">8 projects • 12 weeks</span>
                  <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
