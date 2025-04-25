'use client'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useResumeStore } from '@/store/useResumeStore'

export function SummaryForm() {
  const summary = useResumeStore((state: { summary: string }) => state.summary)
  const updateSummary = useResumeStore((state: { updateSummary: (summary: string) => void }) => state.updateSummary)

  return (
    <div>
      <Label htmlFor="summary">Professional Summary</Label>
      <Textarea
        id="summary"
        value={summary}
        onChange={(e) => updateSummary(e.target.value)}
        rows={6}
        placeholder="Write a brief summary of your professional background and career objectives..."
      />
    </div>
  )
} 