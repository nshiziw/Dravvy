import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
  github: z.string().url('Invalid URL').optional().or(z.literal('')),
  photo: z.string().optional(),
})

export const experienceSchema = z.object({
  position: z.string().min(1, 'Position is required'),
  company: z.string().min(1, 'Company is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.date(),
  endDate: z.union([z.date(), z.literal('Present')]),
  description: z.array(z.string().min(1, 'Description is required')),
})

export const educationSchema = z.object({
  degree: z.string().min(1, 'Degree is required'),
  institution: z.string().min(1, 'Institution is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.date(),
  endDate: z.union([z.date(), z.literal('Expected')]),
})

export const skillSchema = z.object({
  name: z.string().min(1, 'Skill name is required'),
  proficiency: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']).optional(),
})

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  technologies: z.array(z.string().min(1, 'Technology is required')),
  link: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export const resumeSchema = z.object({
  contact: contactSchema,
  summary: z.string().min(1, 'Summary is required'),
  experience: z.array(experienceSchema).min(1, 'At least one experience is required'),
  education: z.array(educationSchema).min(1, 'At least one education is required'),
  skills: z.array(skillSchema).min(3, 'At least three skills are required'),
  projects: z.array(projectSchema).min(1, 'At least one project is required'),
}) 