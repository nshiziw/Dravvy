'use client'

import { useState } from 'react'
import { ResumeForm } from '@/components/resume-form'
import { ResumePreview } from '@/components/resume-preview'
import { ProgressTracker } from '@/components/progress-tracker'
import { Button } from '@/components/ui/button'

type Section = {
  id: 'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'projects'
  label: string
}

const sections: Section[] = [
  { id: 'contact', label: 'Contact Information' },
  { id: 'summary', label: 'Professional Summary' },
  { id: 'experience', label: 'Work Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)

  const handleNext = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1)
    }
  }

  const handlePrevious = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1)
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProgressTracker />
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {sections[activeSection].label}
            </h2>
            <ResumeForm section={sections[activeSection].id} />
            <div className="flex justify-between mt-6">
              <Button
                onClick={handlePrevious}
                disabled={activeSection === 0}
                variant="outline"
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={activeSection === sections.length - 1}
                variant="outline"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <ResumePreview />
        </div>
      </div>
    </div>
  )
}
