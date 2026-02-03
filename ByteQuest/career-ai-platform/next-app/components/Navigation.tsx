'use client'

import Link from 'next/link'
import { useState } from 'react'
import { GraduationCap, Menu, X, Globe, User } from 'lucide-react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<{ name: string } | null>(null)

  return (
    <>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 md:hidden">
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-xl">Menu</span>
            <button onClick={() => setMobileMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/assessment/" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
              Assessment
            </Link>
            <Link href="/portfolio/" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
              Portfolio
            </Link>
            <Link href="/job-readiness/" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>
              Job Readiness
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="bg-white/95 shadow-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CB-AI
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link href="/#features" className="text-gray-700 hover:text-blue-600 px-4 py-2 font-medium transition">
                Features
              </Link>
              <Link href="/assessment/" className="text-gray-700 hover:text-blue-600 px-4 py-2 font-medium transition">
                Assessment
              </Link>
              <Link href="/portfolio/" className="text-gray-700 hover:text-blue-600 px-4 py-2 font-medium transition">
                Portfolio
              </Link>
              <Link href="/job-readiness/" className="text-gray-700 hover:text-blue-600 px-4 py-2 font-medium transition">
                Job Readiness
              </Link>
              <Link 
                href="/assessment/" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition hover:shadow-lg"
              >
                Start Assessment
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600 px-4 py-2 font-medium transition hidden sm:block">
                <Globe className="w-5 h-5" />
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium transition hover:shadow-lg flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
              <button 
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
