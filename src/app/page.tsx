import { ResumeForm } from '@/components/resume-form'
import { ResumePreview } from '@/components/resume-preview'
import { ProgressTracker } from '@/components/progress-tracker'

export default function Home() {
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
          <ResumeForm />
        </div>
        <div className="lg:col-span-1">
          <ResumePreview />
        </div>
      </div>
    </div>
  )
}
