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
import { ContactForm } from './contact-form'
import { SummaryForm } from './summary-form'

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
  const summary = useResumeStore((state: { summary: string }) => state.summary)
  const updateContact = useResumeStore((state: { updateContact: (contact: ResumeData['contact']) => void }) => state.updateContact)
  const updateSummary = useResumeStore((state: { updateSummary: (summary: string) => void }) => state.updateSummary)
  
  const storeAddExperience = useResumeStore((state: { addExperience: (experience: Omit<Experience, 'id'>) => void }) => state.addExperience)
  const storeUpdateExperience = useResumeStore((state: { updateExperience: (experience: Experience) => void }) => state.updateExperience)
  const storeRemoveExperience = useResumeStore((state: { removeExperience: (id: string) => void }) => state.removeExperience)
  
  const storeAddEducation = useResumeStore((state: { addEducation: (education: Omit<Education, 'id'>) => void }) => state.addEducation)
  const storeUpdateEducation = useResumeStore((state: { updateEducation: (education: Education) => void }) => state.updateEducation)
  const storeRemoveEducation = useResumeStore((state: { removeEducation: (id: string) => void }) => state.removeEducation)
  
  const storeAddSkill = useResumeStore((state: { addSkill: (skill: Omit<Skill, 'id'>) => void }) => state.addSkill)
  const storeUpdateSkill = useResumeStore((state: { updateSkill: (skill: Skill) => void }) => state.updateSkill)
  const storeRemoveSkill = useResumeStore((state: { removeSkill: (id: string) => void }) => state.removeSkill)
  
  const storeAddProject = useResumeStore((state: { addProject: (project: Omit<Project, 'id'>) => void }) => state.addProject)
  const storeUpdateProject = useResumeStore((state: { updateProject: (project: Project) => void }) => state.updateProject)
  const storeRemoveProject = useResumeStore((state: { removeProject: (id: string) => void }) => state.removeProject)
  
  const storeAddCertification = useResumeStore((state: { addCertification: (certification: Omit<Certification, 'id'>) => void }) => state.addCertification)
  const storeUpdateCertification = useResumeStore((state: { updateCertification: (certification: Certification) => void }) => state.updateCertification)
  const storeRemoveCertification = useResumeStore((state: { removeCertification: (id: string) => void }) => state.removeCertification)
  
  const storeAddAward = useResumeStore((state: { addAward: (award: Omit<Award, 'id'>) => void }) => state.addAward)
  const storeUpdateAward = useResumeStore((state: { updateAward: (award: Award) => void }) => state.updateAward)
  const storeRemoveAward = useResumeStore((state: { removeAward: (id: string) => void }) => state.removeAward)

  const handleAddExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: []
    }
    storeAddExperience(newExperience)
  }

  const handleRemoveExperience = (id: string) => {
    storeRemoveExperience(id)
  }

  const handleExperienceChange = (experience: Experience) => {
    storeUpdateExperience(experience)
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
    educations.forEach(education => storeUpdateEducation(education))
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
    projects.forEach(project => storeUpdateProject(project))
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
    skills.forEach(skill => storeUpdateSkill(skill))
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
    certifications.forEach(certification => storeUpdateCertification(certification))
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
    awards.forEach(award => storeUpdateAward(award))
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

  const handleSubmit = async (e: React.FormEvent) => {
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
          experiences.forEach(experience => storeUpdateExperience(experience))
          break
        case 'education':
          educations.forEach(education => storeUpdateEducation(education))
          break
        case 'skills':
          skills.forEach(skill => storeUpdateSkill(skill))
          break
        case 'projects':
          projects.forEach(project => storeUpdateProject(project))
          break
        case 'certifications':
          certifications.forEach(certification => storeUpdateCertification(certification))
          break
        case 'awards':
          awards.forEach(award => storeUpdateAward(award))
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
      {section === 'contact' && <ContactForm />}
      {section === 'summary' && <SummaryForm />}

      {section === 'experience' && (
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="p-4 space-y-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Experience {index + 1}</h3>
                <Button
                  type="button"
                  onClick={() => handleRemoveExperience(exp.id)}
                  variant="outline"
                  className="text-red-600 hover:text-white hover:bg-red-600"
                >
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`company-${index}`} className={labelStyles}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    value={exp.company}
                    onChange={(e) => handleExperienceChange({ ...exp, company: e.target.value })}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`position-${index}`} className={labelStyles}>Position</Label>
                  <Input
                    id={`position-${index}`}
                    value={exp.position}
                    onChange={(e) => handleExperienceChange({ ...exp, position: e.target.value })}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`startDate-${index}`} className={labelStyles}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange({ ...exp, startDate: e.target.value })}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`endDate-${index}`} className={labelStyles}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange({ ...exp, endDate: e.target.value })}
                    className={inputStyles}
                    disabled={exp.current}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className={labelStyles}>Description Points (max 5)</Label>
                {exp.description.map((desc, descIndex) => (
                  <div key={descIndex} className="flex items-center gap-2">
                    <Input
                      value={desc}
                      readOnly
                      className={inputStyles}
                    />
                    <Button
                      type="button"
                      onClick={() => handleExperienceChange({ ...exp, description: exp.description.filter((_, i) => i !== descIndex) })}
                      variant="outline"
                      className="text-red-600 hover:text-white hover:bg-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                {exp.description.length < 5 && (
                  <div className="flex items-center gap-2">
                    <Input
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className={inputStyles}
                      placeholder="Add a description point"
                    />
                    <Button
                      type="button"
                      onClick={() => handleExperienceChange({ ...exp, description: [...exp.description, newDescription.trim()] })}
                    >
                      Add
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddExperience}
            className="w-full"
          >
            Add Experience
          </Button>
        </div>
      )}

      {section === 'education' && (
        <div className="space-y-6">
          {educations.map((edu, index) => (
            <div key={edu.id} className="p-4 space-y-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Education {index + 1}</h3>
                <Button
                  type="button"
                  onClick={() => storeRemoveEducation(edu.id)}
                  variant="outline"
                  className="text-red-600 hover:text-white hover:bg-red-600"
                >
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`school-${index}`} className={labelStyles}>School</Label>
                  <Input
                    id={`school-${index}`}
                    value={edu.school}
                    onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`degree-${index}`} className={labelStyles}>Degree</Label>
                  <Input
                    id={`degree-${index}`}
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`field-${index}`} className={labelStyles}>Field of Study</Label>
                  <Input
                    id={`field-${index}`}
                    value={edu.field}
                    onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`startDate-${index}`} className={labelStyles}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`endDate-${index}`} className={labelStyles}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    type="date"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`gpa-${index}`} className={labelStyles}>GPA</Label>
                  <Input
                    id={`gpa-${index}`}
                    value={edu.gpa}
                    onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                    className={inputStyles}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={addEducation}
            className="w-full"
          >
            Add Education
          </Button>
        </div>
      )}

      {section === 'skills' && (
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <div key={skill.id} className="p-4 space-y-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Skill {index + 1}</h3>
                <Button
                  type="button"
                  onClick={() => storeRemoveSkill(skill.id)}
                  variant="outline"
                  className="text-red-600 hover:text-white hover:bg-red-600"
                >
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`category-${index}`} className={labelStyles}>Category</Label>
                  <Input
                    id={`category-${index}`}
                    value={skill.category}
                    onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`skills-${index}`} className={labelStyles}>Skills</Label>
                  <Textarea
                    id={`skills-${index}`}
                    value={skill.skills.join('\n')}
                    onChange={(e) => handleSkillChange(index, 'skills', e.target.value.split('\n'))}
                    className={textareaStyles}
                    rows={3}
                    placeholder="Enter skills separated by new lines"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={addSkill}
            className="w-full"
          >
            Add Skill
          </Button>
        </div>
      )}

      {section === 'projects' && (
        <div className="space-y-6">
          {projects.map((project, index) => (
            <div key={project.id} className="p-4 space-y-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Project {index + 1}</h3>
                <Button
                  type="button"
                  onClick={() => storeRemoveProject(project.id)}
                  variant="outline"
                  className="text-red-600 hover:text-white hover:bg-red-600"
                >
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`name-${index}`} className={labelStyles}>Name</Label>
                  <Input
                    id={`name-${index}`}
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`link-${index}`} className={labelStyles}>Link</Label>
                  <Input
                    id={`link-${index}`}
                    value={project.link}
                    onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`description-${index}`} className={labelStyles}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={project.description.join('\n')}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value.split('\n'))}
                    className={textareaStyles}
                    rows={3}
                    placeholder="Enter description points separated by new lines"
                  />
                </div>
                <div>
                  <Label htmlFor={`technologies-${index}`} className={labelStyles}>Technologies</Label>
                  <Textarea
                    id={`technologies-${index}`}
                    value={project.technologies.join('\n')}
                    onChange={(e) => handleProjectChange(index, 'technologies', e.target.value.split('\n'))}
                    className={textareaStyles}
                    rows={3}
                    placeholder="Enter technologies separated by new lines"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={addProject}
            className="w-full"
          >
            Add Project
          </Button>
        </div>
      )}

      {section === 'certifications' && (
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="p-4 space-y-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Certification {index + 1}</h3>
                <Button
                  type="button"
                  onClick={() => storeRemoveCertification(cert.id)}
                  variant="outline"
                  className="text-red-600 hover:text-white hover:bg-red-600"
                >
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`name-${index}`} className={labelStyles}>Name</Label>
                  <Input
                    id={`name-${index}`}
                    value={cert.name}
                    onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`issuer-${index}`} className={labelStyles}>Issuer</Label>
                  <Input
                    id={`issuer-${index}`}
                    value={cert.issuer}
                    onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`date-${index}`} className={labelStyles}>Date</Label>
                  <Input
                    id={`date-${index}`}
                    type="date"
                    value={cert.date}
                    onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`link-${index}`} className={labelStyles}>Link</Label>
                  <Input
                    id={`link-${index}`}
                    value={cert.link}
                    onChange={(e) => handleCertificationChange(index, 'link', e.target.value)}
                    className={inputStyles}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={addCertification}
            className="w-full"
          >
            Add Certification
          </Button>
        </div>
      )}

      {section === 'awards' && (
        <div className="space-y-6">
          {awards.map((award, index) => (
            <div key={award.id} className="p-4 space-y-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Award {index + 1}</h3>
                <Button
                  type="button"
                  onClick={() => storeRemoveAward(award.id)}
                  variant="outline"
                  className="text-red-600 hover:text-white hover:bg-red-600"
                >
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`title-${index}`} className={labelStyles}>Title</Label>
                  <Input
                    id={`title-${index}`}
                    value={award.title}
                    onChange={(e) => handleAwardChange(index, 'title', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`issuer-${index}`} className={labelStyles}>Issuer</Label>
                  <Input
                    id={`issuer-${index}`}
                    value={award.issuer}
                    onChange={(e) => handleAwardChange(index, 'issuer', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`date-${index}`} className={labelStyles}>Date</Label>
                  <Input
                    id={`date-${index}`}
                    type="date"
                    value={award.date}
                    onChange={(e) => handleAwardChange(index, 'date', e.target.value)}
                    className={inputStyles}
                  />
                </div>
                <div>
                  <Label htmlFor={`description-${index}`} className={labelStyles}>Description</Label>
                  <Textarea
                    id={`description-${index}`}
                    value={award.description}
                    onChange={(e) => handleAwardChange(index, 'description', e.target.value)}
                    className={textareaStyles}
                    rows={3}
                    placeholder="Enter a brief description of the award"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            onClick={addAward}
            className="w-full"
          >
            Add Award
          </Button>
        </div>
      )}

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
        variant="default"
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}