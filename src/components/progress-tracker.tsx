import { useResumeStore } from '@/store/useResumeStore'
import { calculateProgress, getProgressMessage } from '@/lib/utils/progress'
import { Progress } from '@/components/ui/progress'

export function ProgressTracker() {
  const resume = useResumeStore((state) => state.resume)
  const progress = calculateProgress(resume)
  const message = getProgressMessage(progress)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Resume Progress</h2>
          <span className="text-sm font-medium text-gray-600">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  )
} 