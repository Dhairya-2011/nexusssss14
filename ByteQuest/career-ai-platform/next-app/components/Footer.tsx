'use client'

import Link from 'next/link'
import { GraduationCap, Twitter, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="text-blue-500 w-8 h-8" />
            </div>
            <h4 className="text-xl font-semibold mb-2">CB-AI</h4>
            <p className="text-gray-400 text-sm">Career-Based AI for All</p>
            <div className="mt-4 space-y-2">
              <Link href="/#features" className="text-gray-400 hover:text-white transition block">Features</Link>
              <Link href="/#how-it-works" className="text-gray-400 hover:text-white transition block">How It Works</Link>
              <Link href="/#personas" className="text-gray-400 hover:text-white transition block">Who It's For</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Product</h4>
            <div className="mt-4 space-y-2">
              <Link href="/assessment/" className="text-gray-400 hover:text-white transition block">Start Assessment</Link>
              <Link href="/portfolio/" className="text-gray-400 hover:text-white transition block">Portfolio</Link>
              <Link href="/job-readiness/" className="text-gray-400 hover:text-white transition block">Job Readiness</Link>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Resources</h4>
            <div className="mt-4 space-y-2">
              <a href="#" className="text-gray-400 hover:text-white transition block">Documentation</a>
              <a href="#" className="text-gray-400 hover:text-white transition block">API Access</a>
              <a href="#" className="text-gray-400 hover:text-white transition block">Support</a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Company</h4>
            <div className="mt-4 space-y-2">
              <p className="text-gray-400 mb-2">About Us</p>
              <p className="text-gray-400 mb-2">Privacy Policy</p>
              <p className="text-gray-400">Terms of Service</p>
              <p className="text-gray-400">Contact</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 mb-4">
            &copy; 2026 CB-AI Platform. Making career guidance accessible to everyone.
          </p>
          <div className="flex justify-center space-x-6 text-gray-500">
            <a href="#" className="hover:text-white transition flex items-center gap-2">
              <Twitter className="w-4 h-4" /> Twitter
            </a>
            <a href="#" className="hover:text-white transition flex items-center gap-2">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href="#" className="hover:text-white transition flex items-center gap-2">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
