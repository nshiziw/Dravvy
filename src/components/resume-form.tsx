'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema } from '@/lib/validations/resume'
import { useResumeStore } from '@/store/useResumeStore'
import type { ResumeData, Experience, Education, Skill, Project, Certification, Language, Reference } from '@/types/resume'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Card } from "@/components/ui/card"
import { useUIStore } from "@/store/useUIStore"
import { languageSchema, referenceSchema } from "@/lib/validations/resume"
import { nanoid } from "nanoid"

interface ResumeFormProps {
  section: 'basic' | 'work' | 'education' | 'skills' | 'certifications' | 'projects' | 'languages' | 'references'
}

const inputStyles = "w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out placeholder-gray-400 outline-none"
const textareaStyles = "w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out placeholder-gray-400 resize-none outline-none"
const labelStyles = "block text-sm font-medium text-gray-700 mb-1.5"
const checkboxStyles = "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200 outline-none"
const buttonStyles = "px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

function MainResumeForm({ section }: ResumeFormProps) {
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

  const [languages, setLanguages] = React.useState<Language[]>([])

  const [references, setReferences] = React.useState<Reference[]>([])

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
  
  const storeAddLanguage = useResumeStore((state: { addLanguage: (language: Omit<Language, 'id'>) => void }) => state.addLanguage)
  const storeUpdateLanguage = useResumeStore((state: { updateLanguage: (language: Language) => void }) => state.updateLanguage)
  const storeRemoveLanguage = useResumeStore((state: { removeLanguage: (id: string) => void }) => state.removeLanguage)
  
  const storeAddReference = useResumeStore((state: { addReference: (reference: Omit<Reference, 'id'>) => void }) => state.addReference)
  const storeUpdateReference = useResumeStore((state: { updateReference: (reference: Reference) => void }) => state.updateReference)
  const storeRemoveReference = useResumeStore((state: { removeReference: (id: string) => void }) => state.removeReference)

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
    toast.success('Education updated successfully')
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
    toast.success('Projects updated successfully')
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
    toast.success('Skills updated successfully')
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
    toast.success('Certifications updated successfully')
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  const addLanguage = () => {
    setLanguages([...languages, {
      id: crypto.randomUUID(),
      language: '',
      proficiency: 'basic'
    }])
  }

  const handleLanguageChange = (index: number, field: keyof Language, value: string) => {
    const updatedLanguages = [...languages]
    updatedLanguages[index] = {
      ...updatedLanguages[index],
      [field]: value
    }
    setLanguages(updatedLanguages)
  }

  const handleLanguageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    languages.forEach(language => storeUpdateLanguage(language))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    toast.success('Languages updated successfully')
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  const addReference = () => {
    setReferences([...references, {
      id: crypto.randomUUID(),
      name: '',
      relationship: '',
      email: '',
      phone: ''
    }])
  }

  const handleReferenceChange = (index: number, field: keyof Reference, value: string) => {
    const updatedReferences = [...references]
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value
    }
    setReferences(updatedReferences)
  }

  const handleReferenceSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    references.forEach(reference => storeUpdateReference(reference))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    toast.success('References updated successfully')
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
        case 'basic':
          if (!validateContact(contact)) {
            throw new Error('Please fill in all required fields')
          }
          updateContact(contact)
          break
        case 'work':
          experiences.forEach(experience => {
            if (!experience.company || !experience.position || !experience.startDate || !experience.endDate || experience.description.length < 2) {
              throw new Error('Please fill in all required fields')
            }
          })
          experiences.forEach(experience => storeUpdateExperience(experience))
          break
        case 'education':
          educations.forEach(education => {
            if (!education.school || !education.degree || !education.field || !education.startDate || !education.endDate) {
              throw new Error('Please fill in all required fields')
            }
          })
          educations.forEach(education => storeUpdateEducation(education))
          break
        case 'skills':
          skills.forEach(skill => {
            if (!skill.category || skill.skills.length === 0) {
              throw new Error('Please fill in all required fields')
            }
          })
          skills.forEach(skill => storeUpdateSkill(skill))
          break
        case 'certifications':
          certifications.forEach(certification => {
            if (!certification.name || !certification.issuer || !certification.date) {
              throw new Error('Please fill in all required fields')
            }
          })
          certifications.forEach(certification => storeUpdateCertification(certification))
          break
        case 'projects':
          projects.forEach(project => {
            if (!project.name || project.description.length === 0 || project.technologies.length === 0) {
              throw new Error('Please fill in all required fields')
            }
          })
          projects.forEach(project => storeUpdateProject(project))
          break
        case 'languages':
          languages.forEach(language => {
            if (!language.language || !language.proficiency) {
              throw new Error('Please fill in all required fields')
            }
          })
          languages.forEach(language => storeUpdateLanguage(language))
          break
        case 'references':
          references.forEach(reference => {
            if (!reference.name || !reference.relationship || !reference.email || !reference.phone) {
              throw new Error('Please fill in all required fields')
            }
          })
          references.forEach(reference => storeUpdateReference(reference))
          break
      }

      setSubmitSuccess(true)
      toast.success('Data saved successfully')
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {section === 'basic' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName" className={labelStyles}>
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              value={contact.fullName}
              onChange={(e) => updateContact({ ...contact, fullName: e.target.value })}
              className={inputStyles}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className={labelStyles}>
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={contact.email}
              onChange={(e) => updateContact({ ...contact, email: e.target.value })}
              className={inputStyles}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone" className={labelStyles}>
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={contact.phone}
              onChange={(e) => updateContact({ ...contact, phone: e.target.value })}
              className={inputStyles}
              required
            />
          </div>
          <div>
            <Label htmlFor="location" className={labelStyles}>
              Location <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              type="text"
              value={contact.location}
              onChange={(e) => updateContact({ ...contact, location: e.target.value })}
              className={inputStyles}
              required
            />
          </div>
          <div>
            <Label htmlFor="website" className={labelStyles}>
              Website
            </Label>
            <Input
              id="website"
              type="url"
              value={contact.website}
              onChange={(e) => updateContact({ ...contact, website: e.target.value })}
              className={inputStyles}
            />
          </div>
          <div>
            <Label htmlFor="linkedin" className={labelStyles}>
              LinkedIn
            </Label>
            <Input
              id="linkedin"
              type="url"
              value={contact.linkedin}
              onChange={(e) => updateContact({ ...contact, linkedin: e.target.value })}
              className={inputStyles}
            />
          </div>
          <div>
            <Label htmlFor="github" className={labelStyles}>
              GitHub
            </Label>
            <Input
              id="github"
              type="url"
              value={contact.github}
              onChange={(e) => updateContact({ ...contact, github: e.target.value })}
              className={inputStyles}
            />
          </div>
          <div>
            <Label htmlFor="summary" className={labelStyles}>
              Summary <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => updateSummary(e.target.value)}
              className={textareaStyles}
              rows={4}
              required
            />
          </div>
        </div>
      )}

      {section === 'work' && (
        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="p-4 space-y-4 border rounded-lg">
              <div>
                <Label htmlFor={`company-${index}`} className={labelStyles}>
                  Company <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`company-${index}`}
                  type="text"
                  value={experience.company}
                  onChange={(e) => handleExperienceChange({ ...experience, company: e.target.value })}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`position-${index}`} className={labelStyles}>
                  Position <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`position-${index}`}
                  type="text"
                  value={experience.position}
                  onChange={(e) => handleExperienceChange({ ...experience, position: e.target.value })}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`startDate-${index}`} className={labelStyles}>
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`startDate-${index}`}
                  type="date"
                  value={experience.startDate}
                  onChange={(e) => handleExperienceChange({ ...experience, startDate: e.target.value })}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${index}`} className={labelStyles}>
                  End Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`endDate-${index}`}
                  type="date"
                  value={experience.endDate}
                  onChange={(e) => handleExperienceChange({ ...experience, endDate: e.target.value })}
                  className={inputStyles}
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`current-${index}`}
                  checked={experience.current}
                  onChange={(e) => handleExperienceChange({ ...experience, current: e.target.checked })}
                  className={checkboxStyles}
                />
                <Label htmlFor={`current-${index}`} className="ml-2">
                  Currently working here
                </Label>
              </div>
              <div>
                <Label htmlFor={`description-${index}`} className={labelStyles}>
                  Description <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  {experience.description.map((desc, descIndex) => (
                    <div key={descIndex} className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={desc}
                        onChange={(e) => {
                          const updatedDescription = [...experience.description]
                          updatedDescription[descIndex] = e.target.value
                          handleExperienceChange({ ...experience, description: updatedDescription })
                        }}
                        className={inputStyles}
                        required
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const updatedDescription = experience.description.filter((_, i) => i !== descIndex)
                          handleExperienceChange({ ...experience, description: updatedDescription })
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  {experience.description.length < 4 && (
                    <Button
                      type="button"
                      onClick={() => {
                        handleExperienceChange({ ...experience, description: [...experience.description, ''] })
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Add Description Point
                    </Button>
                  )}
                </div>
              </div>
              <Button
                type="button"
                onClick={() => handleRemoveExperience(experience.id)}
                variant="outline"
                size="sm"
              >
                Remove Experience
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={handleAddExperience}
            variant="outline"
            size="sm"
          >
            Add Experience
          </Button>
        </div>
      )}

      {section === 'education' && (
        <div className="space-y-4">
          {educations.map((education, index) => (
            <div key={education.id} className="p-4 space-y-4 border rounded-lg">
              <div>
                <Label htmlFor={`school-${index}`} className={labelStyles}>
                  School <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`school-${index}`}
                  type="text"
                  value={education.school}
                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`degree-${index}`} className={labelStyles}>
                  Degree <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`degree-${index}`}
                  type="text"
                  value={education.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`field-${index}`} className={labelStyles}>
                  Field of Study <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`field-${index}`}
                  type="text"
                  value={education.field}
                  onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`startDate-${index}`} className={labelStyles}>
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`startDate-${index}`}
                  type="date"
                  value={education.startDate}
                  onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`endDate-${index}`} className={labelStyles}>
                  End Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`endDate-${index}`}
                  type="date"
                  value={education.endDate}
                  onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`gpa-${index}`} className={labelStyles}>
                  GPA
                </Label>
                <Input
                  id={`gpa-${index}`}
                  type="text"
                  value={education.gpa}
                  onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                  className={inputStyles}
                />
              </div>
              <Button
                type="button"
                onClick={() => storeRemoveEducation(education.id)}
                variant="outline"
                size="sm"
              >
                Remove Education
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addEducation}
            variant="outline"
            size="sm"
          >
            Add Education
          </Button>
        </div>
      )}

      {section === 'skills' && (
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={skill.id} className="p-4 space-y-4 border rounded-lg">
              <div>
                <Label htmlFor={`category-${index}`} className={labelStyles}>
                  Category <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`category-${index}`}
                  type="text"
                  value={skill.category}
                  onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`skills-${index}`} className={labelStyles}>
                  Skills <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  {skill.skills.map((s, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={s}
                        onChange={(e) => {
                          const updatedSkills = [...skill.skills]
                          updatedSkills[skillIndex] = e.target.value
                          handleSkillChange(index, 'skills', updatedSkills)
                        }}
                        className={inputStyles}
                        required
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const updatedSkills = skill.skills.filter((_, i) => i !== skillIndex)
                          handleSkillChange(index, 'skills', updatedSkills)
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => {
                      handleSkillChange(index, 'skills', [...skill.skills, ''])
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Add Skill
                  </Button>
                </div>
              </div>
              <Button
                type="button"
                onClick={() => storeRemoveSkill(skill.id)}
                variant="outline"
                size="sm"
              >
                Remove Category
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addSkill}
            variant="outline"
            size="sm"
          >
            Add Category
          </Button>
        </div>
      )}

      {section === 'certifications' && (
        <div className="space-y-4">
          {certifications.map((certification, index) => (
            <div key={certification.id} className="p-4 space-y-4 border rounded-lg">
              <div>
                <Label htmlFor={`name-${index}`} className={labelStyles}>
                  Certification Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`name-${index}`}
                  type="text"
                  value={certification.name}
                  onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`issuer-${index}`} className={labelStyles}>
                  Issuer <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`issuer-${index}`}
                  type="text"
                  value={certification.issuer}
                  onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`date-${index}`} className={labelStyles}>
                  Issue Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`date-${index}`}
                  type="date"
                  value={certification.date}
                  onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`link-${index}`} className={labelStyles}>
                  Link
                </Label>
                <Input
                  id={`link-${index}`}
                  type="url"
                  value={certification.link}
                  onChange={(e) => handleCertificationChange(index, 'link', e.target.value)}
                  className={inputStyles}
                />
              </div>
              <Button
                type="button"
                onClick={() => storeRemoveCertification(certification.id)}
                variant="outline"
                size="sm"
              >
                Remove Certification
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addCertification}
            variant="outline"
            size="sm"
          >
            Add Certification
          </Button>
        </div>
      )}

      {section === 'projects' && (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={project.id} className="p-4 space-y-4 border rounded-lg">
              <div>
                <Label htmlFor={`name-${index}`} className={labelStyles}>
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`name-${index}`}
                  type="text"
                  value={project.name}
                  onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`description-${index}`} className={labelStyles}>
                  Description <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  {project.description.map((desc, descIndex) => (
                    <div key={descIndex} className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={desc}
                        onChange={(e) => {
                          const updatedDescription = [...project.description]
                          updatedDescription[descIndex] = e.target.value
                          handleProjectChange(index, 'description', updatedDescription)
                        }}
                        className={inputStyles}
                        required
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const updatedDescription = project.description.filter((_, i) => i !== descIndex)
                          handleProjectChange(index, 'description', updatedDescription)
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => {
                      handleProjectChange(index, 'description', [...project.description, ''])
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Add Description Point
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor={`technologies-${index}`} className={labelStyles}>
                  Technologies <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-2">
                  {project.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={tech}
                        onChange={(e) => {
                          const updatedTechnologies = [...project.technologies]
                          updatedTechnologies[techIndex] = e.target.value
                          handleProjectChange(index, 'technologies', updatedTechnologies)
                        }}
                        className={inputStyles}
                        required
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const updatedTechnologies = project.technologies.filter((_, i) => i !== techIndex)
                          handleProjectChange(index, 'technologies', updatedTechnologies)
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      className={inputStyles}
                      placeholder="Add technology"
                    />
                    <Button
                      type="button"
                      onClick={() => addTechnology(index)}
                      variant="outline"
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor={`link-${index}`} className={labelStyles}>
                  Link
                </Label>
                <Input
                  id={`link-${index}`}
                  type="url"
                  value={project.link}
                  onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                  className={inputStyles}
                />
              </div>
              <Button
                type="button"
                onClick={() => storeRemoveProject(project.id)}
                variant="outline"
                size="sm"
              >
                Remove Project
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addProject}
            variant="outline"
            size="sm"
          >
            Add Project
          </Button>
        </div>
      )}

      {section === 'languages' && (
        <div className="space-y-4">
          {languages.map((language, index) => (
            <div key={language.id} className="p-4 space-y-4 border rounded-lg">
              <div>
                <Label htmlFor={`language-${index}`} className={labelStyles}>
                  Language <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`language-${index}`}
                  type="text"
                  value={language.language}
                  onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`proficiency-${index}`} className={labelStyles}>
                  Proficiency <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={language.proficiency}
                  onValueChange={(value: Language['proficiency']) => handleLanguageChange(index, 'proficiency', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select proficiency level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="native">Native</SelectItem>
                    <SelectItem value="fluent">Fluent</SelectItem>
                    <SelectItem value="proficient">Proficient</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="button"
                onClick={() => storeRemoveLanguage(language.id)}
                variant="outline"
                size="sm"
              >
                Remove Language
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addLanguage}
            variant="outline"
            size="sm"
          >
            Add Language
          </Button>
        </div>
      )}

      {section === 'references' && (
        <div className="space-y-4">
          {references.map((reference, index) => (
            <div key={reference.id} className="p-4 space-y-4 border rounded-lg">
              <div>
                <Label htmlFor={`name-${index}`} className={labelStyles}>
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`name-${index}`}
                  type="text"
                  value={reference.name}
                  onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`relationship-${index}`} className={labelStyles}>
                  Relationship <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`relationship-${index}`}
                  type="text"
                  value={reference.relationship}
                  onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`email-${index}`} className={labelStyles}>
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={reference.email}
                  onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <div>
                <Label htmlFor={`phone-${index}`} className={labelStyles}>
                  Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={`phone-${index}`}
                  type="tel"
                  value={reference.phone}
                  onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>
              <Button
                type="button"
                onClick={() => storeRemoveReference(reference.id)}
                variant="outline"
                size="sm"
              >
                Remove Reference
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addReference}
            variant="outline"
            size="sm"
          >
            Add Reference
          </Button>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-500">
          {error}
        </div>
      )}

      {submitSuccess && (
        <div className="text-sm text-green-500">
          Data saved successfully
        </div>
      )}

      <Button
        type="submit"
        className={buttonStyles}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </form>
  )
}

function LanguageFormComponent() {
  const { languages, addLanguage, updateLanguage, removeLanguage } = useResumeStore()
  const form = useForm<Language>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      id: '',
      language: '',
      proficiency: 'basic'
    }
  })

  const onSubmit = (data: Omit<Language, 'id'>) => {
    const newLanguage = { ...data, id: nanoid() }
    addLanguage(newLanguage)
    form.reset()
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-2xl font-bold">Languages</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="language">Language</Label>
          <Input {...form.register("language")} placeholder="e.g., English" />
          {form.formState.errors.language && (
            <p className="text-sm text-red-500">{form.formState.errors.language.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="proficiency">Proficiency Level</Label>
          <Select
            onValueChange={(value) => form.setValue('proficiency', value as Language['proficiency'])}
            value={form.watch('proficiency')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select proficiency level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="native">Native</SelectItem>
              <SelectItem value="fluent">Fluent</SelectItem>
              <SelectItem value="proficient">Proficient</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
            </SelectContent>
          </Select>
          {form.formState.errors.proficiency && (
            <p className="text-sm text-red-500">{form.formState.errors.proficiency.message}</p>
          )}
        </div>
        <Button type="submit">Add Language</Button>
      </form>

      <div className="mt-6 space-y-4">
        {languages.map((language) => (
          <Card key={language.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{language.language}</p>
                <p className="text-sm text-gray-600">{language.proficiency}</p>
              </div>
              <Button variant="outline" onClick={() => removeLanguage(language.id)}>
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}

function ReferenceFormComponent() {
  const { references, addReference, updateReference, removeReference } = useResumeStore()
  const form = useForm<Reference>({
    resolver: zodResolver(referenceSchema),
    defaultValues: {
      id: '',
      name: '',
      relationship: '',
      email: '',
      phone: ''
    }
  })

  const onSubmit = (data: Omit<Reference, 'id'>) => {
    const newReference = { ...data, id: nanoid() }
    addReference(newReference)
    form.reset()
  }

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-2xl font-bold">References</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input {...form.register("name")} placeholder="e.g., John Doe" />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="relationship">Relationship</Label>
          <Input {...form.register("relationship")} placeholder="e.g., Former Manager" />
          {form.formState.errors.relationship && (
            <p className="text-sm text-red-500">{form.formState.errors.relationship.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input {...form.register("email")} type="email" placeholder="e.g., john@example.com" />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input {...form.register("phone")} placeholder="e.g., +1 234 567 8900" />
          {form.formState.errors.phone && (
            <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
          )}
        </div>
        <Button type="submit">Add Reference</Button>
      </form>

      <div className="mt-6 space-y-4">
        {references.map((reference) => (
          <Card key={reference.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{reference.name}</p>
                <p className="text-sm text-gray-600">{reference.relationship}</p>
                <p className="text-sm text-gray-600">{reference.email}</p>
                <p className="text-sm text-gray-600">{reference.phone}</p>
              </div>
              <Button variant="outline" onClick={() => removeReference(reference.id)}>
                Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}

export function ResumeForm({ section }: ResumeFormProps) {
  const { activeSection } = useUIStore()

  if (section === 'languages') {
    return <LanguageFormComponent />
  }

  if (section === 'references') {
    return <ReferenceFormComponent />
  }

  return <MainResumeForm section={section} />
}

export default ResumeForm