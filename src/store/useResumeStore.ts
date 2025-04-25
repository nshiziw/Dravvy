import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type {
  ResumeData,
  ContactInfo,
  Experience,
  Education,
  Project,
  Skill,
  Certification,
  Award,
  ResumeStyle,
} from '@/types/resume';

interface ResumeState extends ResumeData {
  activeSection: number;
  setActiveSection: (section: number) => void;
  
  // Contact
  updateContact: (contact: ContactInfo) => void;
  
  // Summary
  updateSummary: (summary: string) => void;
  
  // Experience
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (experience: Experience) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;
  
  // Education
  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (education: Education) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;
  
  // Skills
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (skill: Skill) => void;
  removeSkill: (id: string) => void;
  reorderSkills: (startIndex: number, endIndex: number) => void;
  
  // Projects
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  removeProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
  
  // Certifications
  addCertification: (certification: Omit<Certification, 'id'>) => void;
  updateCertification: (certification: Certification) => void;
  removeCertification: (id: string) => void;
  reorderCertifications: (startIndex: number, endIndex: number) => void;
  
  // Awards
  addAward: (award: Omit<Award, 'id'>) => void;
  updateAward: (award: Award) => void;
  removeAward: (id: string) => void;
  reorderAwards: (startIndex: number, endIndex: number) => void;
  
  // Style
  updateStyle: (style: ResumeStyle) => void;
  
  // Reset
  resetStore: () => void;
}

const initialState: Omit<ResumeState, keyof Omit<ResumeState, keyof ResumeData | 'activeSection'>> = {
  activeSection: 0,
  contact: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  awards: [],
  style: {
    theme: 'modern',
    fontSize: 11,
    spacing: 1.15,
    color: '#2563eb',
  },
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      ...initialState,
      
      // Navigation
      setActiveSection: (section) => set({ activeSection: section }),
      
      // Contact
      updateContact: (contact) => set({ contact }),
      
      // Summary
      updateSummary: (summary) => set({ summary }),
      
      // Experience
      addExperience: (experience) =>
        set((state) => ({
          experience: [...state.experience, { ...experience, id: uuidv4() }],
        })),
      updateExperience: (experience) =>
        set((state) => ({
          experience: state.experience.map((exp) =>
            exp.id === experience.id ? experience : exp
          ),
        })),
      removeExperience: (id) =>
        set((state) => ({
          experience: state.experience.filter((exp) => exp.id !== id),
        })),
      reorderExperience: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.experience);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { experience: result };
        }),
      
      // Education
      addEducation: (education) =>
        set((state) => ({
          education: [...state.education, { ...education, id: uuidv4() }],
        })),
      updateEducation: (education) =>
        set((state) => ({
          education: state.education.map((edu) =>
            edu.id === education.id ? education : edu
          ),
        })),
      removeEducation: (id) =>
        set((state) => ({
          education: state.education.filter((edu) => edu.id !== id),
        })),
      reorderEducation: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.education);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { education: result };
        }),
      
      // Skills
      addSkill: (skill) =>
        set((state) => ({
          skills: [...state.skills, { ...skill, id: uuidv4() }],
        })),
      updateSkill: (skill) =>
        set((state) => ({
          skills: state.skills.map((s) => (s.id === skill.id ? skill : s)),
        })),
      removeSkill: (id) =>
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== id),
        })),
      reorderSkills: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.skills);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { skills: result };
        }),
      
      // Projects
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, { ...project, id: uuidv4() }],
        })),
      updateProject: (project) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === project.id ? project : p)),
        })),
      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
        })),
      reorderProjects: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.projects);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { projects: result };
        }),
      
      // Certifications
      addCertification: (certification) =>
        set((state) => ({
          certifications: [...state.certifications, { ...certification, id: uuidv4() }],
        })),
      updateCertification: (certification) =>
        set((state) => ({
          certifications: state.certifications.map((c) =>
            c.id === certification.id ? certification : c
          ),
        })),
      removeCertification: (id) =>
        set((state) => ({
          certifications: state.certifications.filter((c) => c.id !== id),
        })),
      reorderCertifications: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.certifications);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { certifications: result };
        }),
      
      // Awards
      addAward: (award) =>
        set((state) => ({
          awards: [...state.awards, { ...award, id: uuidv4() }],
        })),
      updateAward: (award) =>
        set((state) => ({
          awards: state.awards.map((a) => (a.id === award.id ? award : a)),
        })),
      removeAward: (id) =>
        set((state) => ({
          awards: state.awards.filter((a) => a.id !== id),
        })),
      reorderAwards: (startIndex, endIndex) =>
        set((state) => {
          const result = Array.from(state.awards);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { awards: result };
        }),
      
      // Style
      updateStyle: (style) => set({ style }),
      
      // Reset
      resetStore: () => set(initialState),
    }),
    {
      name: 'resume-store',
    }
  )
);