'use client'

import { useResumeStore } from '@/store/useResumeStore'
import { calculateProgress, getProgressMessage } from '@/lib/utils/progress'
import { Progress } from '@/components/ui/progress'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

const sections = [
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
  { id: 'export', label: 'Export Resume' },
]

export function ProgressTracker() {
  const resume = useResumeStore((state) => state.resume)
  const progress = calculateProgress(resume)
  const message = getProgressMessage(progress)
  const activeSection = useResumeStore((state) => state.activeSection)
  const setActiveSection = useResumeStore((state) => state.setActiveSection)

  const handleStepClick = (index: number) => {
    try {
      setActiveSection(index);
    } catch (error) {
      console.error('Failed to set active section:', error);
    }
  }

  const isSectionCompleted = (sectionId: string) => {
    switch (sectionId) {
      case 'contact':
        return !!resume.contact?.name;
      case 'summary':
        return !!resume.summary;
      case 'experience':
        return (resume.experience?.length || 0) > 0;
      case 'education':
        return (resume.education?.length || 0) > 0;
      case 'skills':
        return (resume.skills?.length || 0) > 0;
      case 'projects':
        return (resume.projects?.length || 0) > 0;
      case 'certifications':
        return (resume.certifications?.length || 0) > 0;
      case 'awards':
        return (resume.awards?.length || 0) > 0;
      case 'styling':
      case 'preview':
      case 'export':
        return true; // Mark these as always completed
      default:
        return false;
    }
  }

  const getStepStatus = (index: number) => {
    if (isSectionCompleted(sections[index].id)) return 'completed'
    if (index === activeSection) return 'active'
    return 'pending'
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Resume Progress</h2>
          <span className="text-sm font-medium text-gray-600">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
          <div className="flex justify-between relative">
            {sections.map((section, index) => {
              const status = getStepStatus(index)
              return (
                <motion.div
                  key={section.id}
                  className="flex flex-col items-center cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => handleStepClick(index)}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mb-2 relative z-10 transition-transform duration-200 ease-in-out transform group-hover:scale-110",
                    status === 'completed' && "bg-green-500 group-hover:bg-green-600",
                    status === 'active' && "bg-blue-500 group-hover:bg-blue-600",
                    status === 'pending' && "bg-gray-200 group-hover:bg-gray-300"
                  )}>
                    {status === 'completed' ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : (
                      <span className={cn(
                        "text-sm font-medium",
                        status === 'active' ? "text-white" : "text-gray-600"
                      )}>
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <p className={cn(
                    "text-xs font-medium text-center max-w-[100px] transition-colors duration-200",
                    status === 'completed' && "text-green-600 group-hover:text-green-700",
                    status === 'active' && "text-blue-600 group-hover:text-blue-700",
                    status === 'pending' && "text-gray-600 group-hover:text-gray-700"
                  )}>
                    {section.label}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  )
}