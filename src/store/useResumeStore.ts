import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Contact {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
  github?: string
  photo?: string
}

export interface Experience {
  position: string
  company: string
  location: string
  startDate: Date
  endDate: Date | 'Present'
  description: string[]
}

export interface Education {
  degree: string
  institution: string
  location: string
  startDate: Date
  endDate: Date | 'Expected'
}

export interface Skill {
  name: string
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export interface Resume {
  contact: Contact
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  link?: string
}

interface ResumeStore {
  resume: Resume
  setResume: (resume: Resume) => void
  updateContact: (contact: Contact) => void
  updateSummary: (summary: string) => void
  addExperience: (experience: Experience) => void
  removeExperience: (index: number) => void
  addEducation: (education: Education) => void
  removeEducation: (index: number) => void
  addSkill: (skill: Skill) => void
  removeSkill: (index: number) => void
  addProject: (project: Project) => void
  removeProject: (index: number) => void
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
      setResume: (resume) => set({ resume }),
      updateContact: (contact) =>
        set((state) => ({
          resume: { ...state.resume, contact },
        })),
      updateSummary: (summary) =>
        set((state) => ({
          resume: { ...state.resume, summary },
        })),
      addExperience: (experience) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [...state.resume.experience, experience],
          },
        })),
      removeExperience: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((_, i) => i !== index),
          },
        })),
      addEducation: (education) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [...state.resume.education, education],
          },
        })),
      removeEducation: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((_, i) => i !== index),
          },
        })),
      addSkill: (skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: [...state.resume.skills, skill],
          },
        })),
      removeSkill: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.filter((_, i) => i !== index),
          },
        })),
      addProject: (project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [...state.resume.projects, project],
          },
        })),
      removeProject: (index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((_, i) => i !== index),
          },
        })),
    }),
    {
      name: 'resume-storage',
    }
  )
) 