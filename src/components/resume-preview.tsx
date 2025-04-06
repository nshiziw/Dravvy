'use client'

import { useResumeStore } from '@/store/useResumeStore'

export function ResumePreview() {
  const resume = useResumeStore((state) => state.resume)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-900">{resume.contact.name}</h3>
          <p className="text-sm text-gray-600">{resume.contact.title}</p>
        </div>
        <div className="text-sm text-gray-600">
          <p>{resume.contact.email}</p>
          <p>{resume.contact.phone}</p>
          <p>{resume.contact.location}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Summary</h4>
          <p className="text-sm text-gray-600">{resume.summary}</p>
        </div>
      </div>
    </div>
  )
} 