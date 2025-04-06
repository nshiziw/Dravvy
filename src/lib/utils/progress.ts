import { Resume } from '@/store/useResumeStore'

export const calculateProgress = (resume: Resume): number => {
  const sections = [
    resume.contact.name && resume.contact.email && resume.contact.phone ? 1 : 0,
    resume.summary ? 1 : 0,
    resume.skills.length >= 3 ? 1 : 0,
    resume.experience.length > 0 ? 1 : 0,
    resume.education.length > 0 ? 1 : 0,
    resume.projects.length > 0 ? 1 : 0,
  ]

  return Math.round((sections.reduce((a, b) => a + b) / sections.length) * 100)
}

export const getProgressMessage = (progress: number): string => {
  if (progress === 0) return 'Start building your resume!'
  if (progress < 25) return 'Keep going! You\'re just getting started.'
  if (progress < 50) return 'Making good progress!'
  if (progress < 75) return 'Almost there!'
  if (progress < 100) return 'Just a few more details needed!'
  return 'Perfect! Your resume is complete!'
} 