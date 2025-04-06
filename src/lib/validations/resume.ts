import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
})

export const experienceSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().min(1, 'Description is required'),
})

export const educationSchema = z.object({
  institution: z.string().min(1, 'Institution name is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field of study is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
})

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  proficiency: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']).optional(),
})

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
})

export const resumeSchema = z.object({
  contact: contactSchema,
  summary: z.string().min(1, 'Summary is required'),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema).min(3, 'At least three skills are required'),
  projects: z.array(projectSchema).min(1, 'At least one project is required'),
}) 