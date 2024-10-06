export type ContactInfo = {
  fullName: string
  email: string
  phone: string
  location: string
  website?: string
  linkedin?: string
}

export type Experience = {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

export type Education = {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

export type Project = {
  id: string
  name: string
  description: string[]
  technologies: string[]
  link?: string
}

export type Skill = {
  id: string
  category: string
  skills: string[]
}

export type Certification = {
  id: string
  name: string
  issuer: string
  date: string
  link?: string
}

export type Award = {
  id: string
  title: string
  issuer: string
  date: string
  description: string
}

export type ResumeStyle = {
  theme: 'modern' | 'classic' | 'minimal'
  fontSize: number
  spacing: number
  color: string
}

export type ResumeData = {
  contact: ContactInfo
  summary: string
  experience: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  certifications: Certification[]
  awards: Award[]
  style: ResumeStyle
} 