import type { ResumeData } from '@/types/resume'

export const calculateProgress = (resume: Partial<ResumeData>): number => {
  const sections = [
    // Basic Information
    resume.contact?.fullName && resume.contact?.email && resume.contact?.phone && resume.contact?.location ? 1 : 0,
    // Work Experience
    (resume.experience?.length || 0) > 0 ? 1 : 0,
    // Education
    (resume.education?.length || 0) > 0 ? 1 : 0,
    // Skills
    (resume.skills?.length || 0) > 0 ? 1 : 0,
    // Certifications
    (resume.certifications?.length || 0) > 0 ? 1 : 0,
    // Projects
    (resume.projects?.length || 0) > 0 ? 1 : 0,
    // Languages
    (resume.languages?.length || 0) > 0 ? 1 : 0,
    // References
    (resume.references?.length || 0) > 0 ? 1 : 0,
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