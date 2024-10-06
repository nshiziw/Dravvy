'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema } from '@/lib/validations/resume'
import { useResumeStore } from '@/store/useResumeStore'
import type { ResumeData, Experience, Education, Skill, Project, Certification, Award } from '@/types/resume'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { StylingForm } from './styling-form'
import { ExportForm } from './export-form'

interface ResumeFormProps {
  section: 'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'awards' | 'styling' | 'export'
}

const inputStyles = "w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out placeholder-gray-400 outline-none"
const textareaStyles = "w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out placeholder-gray-400 resize-none outline-none"
const labelStyles = "block text-sm font-medium text-gray-700 mb-1.5"
const checkboxStyles = "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200 outline-none"
const buttonStyles = "px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

export function ResumeForm({ section }: ResumeFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const [experiences, setExperiences] = React.useState<Experience[]>([])
  const [newDescription, setNewDescription] = React.useState('')

  const [educations, setEducations] = React.useState<Education[]>([])

  const [projects, setProjects] = React.useState<Project[]>([])
  const [newTechnology, setNewTechnology] = React.useState('')

  const [skills, setSkills] = React.useState<Skill[]>([])
  const [newSkill, setNewSkill] = React.useState('')

  const [certifications, setCertifications] = React.useState<Certification[]>([])

  const [awards, setAwards] = React.useState<Award[]>([])

  const contact = useResumeStore((state: { contact: ResumeData['contact'] }) => state.contact)
  const summary = useResumeStore((state: { summary: ResumeData['summary'] }) => state.summary)
  const updateContact = useResumeStore((state: { updateContact: (contact: ResumeData['contact']) => void }) => state.updateContact)
  const updateSummary = useResumeStore((state: { updateSummary: (summary: string) => void }) => state.updateSummary)
  const updateExperience = useResumeStore((state: { updateExperience: (experience: Experience[]) => void }) => state.updateExperience)
  const updateEducation = useResumeStore((state: { updateEducation: (education: Education[]) => void }) => state.updateEducation)
  const updateSkills = useResumeStore((state: { updateSkills: (skills: Skill[]) => void }) => state.updateSkills)
  const updateProjects = useResumeStore((state: { updateProjects: (projects: Project[]) => void }) => state.updateProjects)
  const updateCertifications = useResumeStore((state: { updateCertifications: (certifications: Certification[]) => void }) => state.updateCertifications)
  const updateAwards = useResumeStore((state: { updateAwards: (awards: Award[]) => void }) => state.updateAwards)

  const addExperience = () => {
    setExperiences([...experiences, {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: []
    }])
  }

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  const addDescriptionPoint = (expIndex: number) => {
    if (newDescription.trim() && experiences[expIndex].description.length < 5) {
      const updatedExperiences = [...experiences]
      updatedExperiences[expIndex].description.push(newDescription.trim())
      setExperiences(updatedExperiences)
      setNewDescription('')
    }
  }

  const removeDescriptionPoint = (expIndex: number, descIndex: number) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[expIndex].description = updatedExperiences[expIndex].description.filter((_, i) => i !== descIndex)
    setExperiences(updatedExperiences)
  }

  const handleExperienceChange = (index: number, field: keyof Experience, value: string | boolean) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    }
    setExperiences(updatedExperiences)
  }

  const handleExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateExperience(experiences)
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  const addEducation = () => {
    setEducations([...educations, {
      id: crypto.randomUUID(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: ''
    }])
  }

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index))
  }

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducations = [...educations]
    updatedEducations[index] = {
      ...updatedEducations[index],
      [field]: value
    }
    setEducations(updatedEducations)
  }

  const handleEducationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateEducation(educations)
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  const addProject = () => {
    setProjects([...projects, {
      id: crypto.randomUUID(),
      name: '',
      description: [],
      technologies: [],
      link: ''
    }])
  }

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  const handleProjectChange = (index: number, field: keyof Project, value: string | string[]) => {
    const updatedProjects = [...projects]
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    }
    setProjects(updatedProjects)
  }

  const addTechnology = (projectIndex: number) => {
    if (newTechnology.trim()) {
      const updatedProjects = [...projects]
      updatedProjects[projectIndex].technologies.push(newTechnology.trim())
      setProjects(updatedProjects)
      setNewTechnology('')
    }
  }

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const updatedProjects = [...projects]
    updatedProjects[projectIndex].technologies = updatedProjects[projectIndex].technologies.filter((_, i) => i !== techIndex)
    setProjects(updatedProjects)
  }

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProjects(projects)
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  const addSkill = () => {
    setSkills([...skills, {
      id: crypto.randomUUID(),
      category: '',
      skills: []
    }])
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleSkillChange = (index: number, field: keyof Skill, value: string | string[]) => {
    const updatedSkills = [...skills]
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    }
    setSkills(updatedSkills)
  }

  const handleSkillsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSkills(skills)
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  const addCertification = () => {
    setCertifications([...certifications, {
      id: crypto.randomUUID(),
      name: '',
      issuer: '',
      date: '',
      link: ''
    }])
  }

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index))
  }

  const handleCertificationChange = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = [...certifications]
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value
    }
    setCertifications(updatedCertifications)
  }

  const handleCertificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateCertifications(certifications)
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  const addAward = () => {
    setAwards([...awards, {
      id: crypto.randomUUID(),
      title: '',
      issuer: '',
      date: '',
      description: ''
    }])
  }

  const removeAward = (index: number) => {
    setAwards(awards.filter((_, i) => i !== index))
  }

  const handleAwardChange = (index: number, field: keyof Award, value: string) => {
    const updatedAwards = [...awards]
    updatedAwards[index] = {
      ...updatedAwards[index],
      [field]: value
    }
    setAwards(updatedAwards)
  }

  const handleAwardSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateAwards(awards)
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  const validateContact = (contact: ResumeData['contact']) => {
    if (!contact.fullName || !contact.email || !contact.phone || !contact.location) {
      return false
    }
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      switch (section) {
        case 'contact':
          if (!validateContact(contact)) {
            throw new Error('Please fill in all required fields')
          }
          updateContact(contact)
          break
        case 'summary':
          if (!summary) {
            throw new Error('Please provide a summary')
          }
          updateSummary(summary)
          break
        case 'experience':
          handleExperienceSubmit(e)
          break
        case 'education':
          handleEducationSubmit(e)
          break
        case 'skills':
          handleSkillsSubmit(e)
          break
        case 'projects':
          handleProjectSubmit(e)
          break
        case 'certifications':
          handleCertificationSubmit(e)
          break
        case 'awards':
          handleAwardSubmit(e)
          break
        case 'styling':
        case 'export':
          // These sections are handled by their respective components
          break
      }

      setIsSubmitting(false)
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      setIsSubmitting(false)
    }
  }

  if (section === 'styling') {
    return <StylingForm />
  }

  if (section === 'export') {
    return <ExportForm />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form content based on section */}
      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      {submitSuccess && (
        <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg">
          Changes saved successfully!
        </div>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        className={buttonStyles}
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}