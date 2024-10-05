import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Contact = {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
};

type Experience = {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  description: string[];
};

type Education = {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  expectedDate: string;
  isExpected: boolean;
};

type Styling = {
  showSkillProficiency: boolean;
  fontFamily: string;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'Month DD, YYYY' | 'DD Month YYYY';
  sectionDivider: {
    type: 'none' | 'line' | 'double-line' | 'dashes';
    color: string;
  };
  showLinks: boolean;
};

export type Resume = {
  contact: Contact;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: { name: string; proficiency?: number }[];
  certifications: { title: string; issuer: string; issueDate: string }[];
  awards: { title: string; institution: string; date: string }[];
  languages: { name: string; proficiency: string }[];
  hobbies: string[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    githubLink?: string;
    demoLink?: string;
  }[];
  volunteer: { role: string; organization: string; date: string; description: string }[];
  references: { name: string; relationship: string; company: string; email: string; phone: string }[];
};

type ResumeStore = {
  resume: Resume;
  activeSection: number;
  styling: Styling;
  updateContact: (contact: Contact) => void;
  updateExperience: (experience: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  setActiveSection: (section: number) => void;
  updateStyling: (styling: Partial<Styling>) => void;
  updateSummary: (summary: string) => void;
  updateSkills: (skills: { name: string; proficiency?: number }[]) => void;
  updateProjects: (projects: { name: string; description: string; technologies: string[]; githubLink?: string; demoLink?: string }[]) => void;
  updateCertifications: (certifications: { title: string; issuer: string; issueDate: string }[]) => void;
  updateAwards: (awards: { title: string; institution: string; date: string }[]) => void;
};

const initialStyling: Styling = {
  showSkillProficiency: true,
  fontFamily: 'Arial',
  dateFormat: 'Month DD, YYYY',
  sectionDivider: {
    type: 'line',
    color: '#000000',
  },
  showLinks: true,
};

const initialResume: Resume = {
  contact: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
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
};

const storage = typeof window !== 'undefined'
  ? createJSONStorage(() => localStorage)
  : createJSONStorage(() => ({
      getItem: () => null,
      setItem: () => {
        console.warn('Storage is not available in this environment.');
      },
      removeItem: () => {
        console.warn('Storage is not available in this environment.');
      },
    }));

const validateContact = (contact: Contact) => {
  if (!contact.name || !contact.email || !contact.phone) {
    console.error('Invalid contact information');
    return false;
  }
  return true;
};

const validateExperience = (experience: Experience[]) => {
  return experience.every((exp) => exp.jobTitle && exp.company && exp.startDate);
};

const validateEducation = (education: Education[]) => {
  return education.every((edu) => edu.degree && edu.institution && edu.startDate);
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: initialResume,
      activeSection: 0,
      styling: initialStyling,
      updateContact: (contact: Contact) => {
        try {
          if (!validateContact(contact)) return;
          set((state) => ({ resume: { ...state.resume, contact } }));
        } catch (error) {
          console.error('Failed to update contact:', error);
        }
      },
      updateExperience: (experience: Experience[]) => {
        try {
          if (!validateExperience(experience)) {
            console.error('Invalid experience data');
            return;
          }
          set((state) => ({ resume: { ...state.resume, experience } }));
        } catch (error) {
          console.error('Failed to update experience:', error);
        }
      },
      updateEducation: (education: Education[]) => {
        try {
          if (!validateEducation(education)) {
            console.error('Invalid education data');
            return;
          }
          set((state) => ({ resume: { ...state.resume, education } }));
        } catch (error) {
          console.error('Failed to update education:', error);
        }
      },
      setActiveSection: (section: number) => {
        set(() => ({ activeSection: section }));
      },
      updateStyling: (styling: Partial<Styling>) => {
        set((state) => ({ styling: { ...state.styling, ...styling } }));
      },
      updateSummary: (summary: string) => {
        set((state) => ({ resume: { ...state.resume, summary } }));
      },
      updateSkills: (skills: { name: string; proficiency?: number }[]) => {
        set((state) => ({ resume: { ...state.resume, skills } }));
      },
      updateProjects: (projects: { name: string; description: string; technologies: string[]; githubLink?: string; demoLink?: string }[]) => {
        set((state) => ({ resume: { ...state.resume, projects } }));
      },
      updateCertifications: (certifications: { title: string; issuer: string; issueDate: string }[]) => {
        set((state) => ({ resume: { ...state.resume, certifications } }));
      },
      updateAwards: (awards: { title: string; institution: string; date: string }[]) => {
        set((state) => ({ resume: { ...state.resume, awards } }));
      },
    }),
    {
      name: 'resume-storage',
      storage,
      skipHydration: true,
    }
  )
);

export type { Styling, Contact };