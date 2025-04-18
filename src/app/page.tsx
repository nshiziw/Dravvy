'use client'

import { useState } from 'react'
import { ResumeForm } from '@/components/resume-form'
import { ResumePreview } from '@/components/resume-preview'
import { ProgressTracker } from '@/components/progress-tracker'
import { Button } from '@/components/ui/button'
import { useResumeStore } from '@/store/useResumeStore'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

type Section = {
  id: 'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'awards' | 'styling' | 'preview'
  label: string
}

const sections: Section[] = [
  { id: 'contact', label: 'Contact Information' },
  { id: 'summary', label: 'Professional Summary' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'awards', label: 'Awards' },
  { id: 'styling', label: 'Resume Styling' },
  { id: 'preview', label: 'Resume Preview' },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const setStoreActiveSection = useResumeStore((state) => state.setActiveSection)

  const handleNext = () => {
    if (activeSection < sections.length - 1) {
      const newSection = activeSection + 1
      setActiveSection(newSection)
      setStoreActiveSection(newSection)
    }
  }

  const handlePrevious = () => {
    if (activeSection > 0) {
      const newSection = activeSection - 1
      setActiveSection(newSection)
      setStoreActiveSection(newSection)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Dravvy</h1>
        <p className="mt-2 text-lg text-gray-600">
          Create your professional resume with ease
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-8">
          <ProgressTracker />
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {sections[activeSection].label}
            </h2>
            {sections[activeSection].id === 'preview' ? (
              <ResumePreview />
            ) : (
              <ResumeForm section={sections[activeSection].id} />
            )}
            <div className="flex justify-between mt-6">
              <Button
                onClick={handlePrevious}
                disabled={activeSection === 0}
                variant="outline"
                className="relative overflow-hidden group px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <ChevronLeftIcon className="h-5 w-5 relative z-10" />
                <span className="relative z-10">Previous</span>
                <span className="absolute inset-0 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Button>
              <Button
                onClick={handleNext}
                disabled={activeSection === sections.length - 1}
                variant="outline"
                className="relative overflow-hidden group px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span className="relative z-10">Next</span>
                <ChevronRightIcon className="h-5 w-5 relative z-10" />
                <span className="absolute inset-0 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
