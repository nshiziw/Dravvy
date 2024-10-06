import * as z from 'zod'

export const contactSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  location: z.string().min(1, 'Location is required'),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export const experienceSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  current: z.boolean(),
  description: z.array(z.string().min(1, 'Description is required')).min(1, 'At least one description point is required'),
})

export const educationSchema = z.object({
  school: z.string().min(1, 'School name is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field of study is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  gpa: z.string().optional(),
})

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.array(z.string().min(1, 'Description is required')).min(1, 'At least one description point is required'),
  technologies: z.array(z.string().min(1, 'Technology is required')).min(1, 'At least one technology is required'),
  link: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export const skillSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  skills: z.array(z.string().min(1, 'Skill is required')).min(1, 'At least one skill is required'),
})

export const certificationSchema = z.object({
  name: z.string().min(1, 'Certification name is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.string().min(1, 'Date is required'),
  link: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export const awardSchema = z.object({
  title: z.string().min(1, 'Award title is required'),
  issuer: z.string().min(1, 'Issuer is required'),
  date: z.string().min(1, 'Date is required'),
  description: z.string().min(1, 'Description is required'),
})

export const styleSchema = z.object({
  theme: z.enum(['modern', 'classic', 'minimal']),
  fontSize: z.number().min(8).max(14),
  spacing: z.number().min(1).max(2),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
})

export const resumeSchema = z.object({
  contact: contactSchema,
  summary: z.string().min(1, 'Summary is required'),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  skills: z.array(skillSchema).min(3, 'At least three skills are required'),
  projects: z.array(projectSchema).min(1, 'At least one project is required'),
}) 