import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Contact {
  name: string
  title: string
  email: string
  phone: string
  location: string
}

export interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
}

export interface Project {
  name: string
  description: string
  technologies: string[]
}

export interface Resume {
  contact: Contact
  summary: string
  experience: Experience[]
  education: Education[]
  skills: string[]
  projects: Project[]
}

type ResumeStore = {
  resume: Resume
  updateContact: (contact: Contact) => void
  updateSummary: (summary: string) => void
  updateExperience: (experience: Experience[]) => void
  updateEducation: (education: Education[]) => void
  updateSkills: (skills: string[]) => void
  updateProjects: (projects: Project[]) => void
}

const initialResume: Resume = {
  contact: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialResume,
      updateContact: (contact) =>
        set((state) => ({
          resume: { ...state.resume, contact },
        })),
      updateSummary: (summary) =>
        set((state) => ({
          resume: { ...state.resume, summary },
        })),
      updateExperience: (experience) =>
        set((state) => ({
          resume: { ...state.resume, experience },
        })),
      updateEducation: (education) =>
        set((state) => ({
          resume: { ...state.resume, education },
        })),
      updateSkills: (skills) =>
        set((state) => ({
          resume: { ...state.resume, skills },
        })),
      updateProjects: (projects) =>
        set((state) => ({
          resume: { ...state.resume, projects },
        })),
    }),
    {
      name: 'resume-storage',
      skipHydration: true,
    }
  )
) 