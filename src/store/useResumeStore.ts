import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Contact = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

type Experience = {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  description: string[];
}

type Education = {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  expectedDate: string;
  isExpected: boolean;
}

type Skill = {
  name: string;
  proficiency?: number;
}

type Certification = {
  title: string;
  issuer: string;
  issueDate: string;
}

export type Award = {
  title: string;
  institution: string;
  date: string;
}

type Language = {
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';
}

type Project = {
  name: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
}

type Volunteer = {
  role: string;
  organization: string;
  date: string;
  description: string;
}

type Reference = {
  name: string;
  relationship: string;
  company: string;
  email: string;
  phone: string;
}

type Styling = {
  showSkillProficiency: boolean;
  fontFamily: string;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'Month DD, YYYY' | 'DD Month YYYY';
  sectionDivider: {
    type: 'none' | 'line' | 'double-line' | 'dashes';
    color: string;
  };
}

export type Resume = {
  contact: Contact;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
  awards: Award[];
  languages: Language[];
  hobbies: string[];
  projects: Project[];
  volunteer: Volunteer[];
  references: Reference[];
}

type ResumeStore = {
  resume: Resume
  activeSection: number
  styling: Styling
  updateContact: (contact: Contact) => void
  updateSummary: (summary: string) => void
  updateExperience: (experience: Experience[]) => void
  updateEducation: (education: Education[]) => void
  updateSkills: (skills: Array<{
    name: string;
    proficiency?: number;
  }>) => void
  updateCertifications: (certifications: Certification[]) => void
  updateAwards: (awards: Award[]) => void
  updateLanguages: (languages: Language[]) => void
  updateHobbies: (hobbies: string[]) => void
  updateProjects: (projects: Project[]) => void
  updateVolunteer: (volunteer: Volunteer[]) => void
  updateReferences: (references: Reference[]) => void
  setActiveSection: (section: number) => void
  updateStyling: (styling: Partial<Styling>) => void
}

const initialStyling: Styling = {
  showSkillProficiency: true,
  fontFamily: 'Arial',
  dateFormat: 'Month DD, YYYY',
  sectionDivider: {
    type: 'line',
    color: '#000000',
  },
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
  certifications: [],
  awards: [],
  languages: [],
  hobbies: [],
  projects: [],
  volunteer: [],
  references: [],
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialResume,
      activeSection: 0,
      styling: initialStyling,
      updateContact: (contact) => set((state) => ({ resume: { ...state.resume, contact } })),
      updateSummary: (summary) => set((state) => ({ resume: { ...state.resume, summary } })),
      updateExperience: (experience) => set((state) => ({ resume: { ...state.resume, experience } })),
      updateEducation: (education) => set((state) => ({ resume: { ...state.resume, education } })),
      updateSkills: (skills) => set((state) => ({ resume: { ...state.resume, skills } })),
      updateCertifications: (certifications) => set((state) => ({ resume: { ...state.resume, certifications } })),
      updateAwards: (awards) => set((state) => ({ resume: { ...state.resume, awards } })),
      updateLanguages: (languages) => set((state) => ({ resume: { ...state.resume, languages } })),
      updateHobbies: (hobbies) => set((state) => ({ resume: { ...state.resume, hobbies } })),
      updateProjects: (projects) => set((state) => ({ resume: { ...state.resume, projects } })),
      updateVolunteer: (volunteer) => set((state) => ({ resume: { ...state.resume, volunteer } })),
      updateReferences: (references) => set((state) => ({ resume: { ...state.resume, references } })),
      setActiveSection: (section) => set({ activeSection: section }),
      updateStyling: (styling) => set((state) => ({ styling: { ...state.styling, ...styling } })),
    }),
    {
      name: 'resume-storage',
      skipHydration: true,
    }
  )
) 