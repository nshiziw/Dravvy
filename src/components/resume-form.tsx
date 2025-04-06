'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema } from '@/lib/validations/resume'
import { useResumeStore, type Resume } from '@/store/useResumeStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useState, useEffect } from 'react'

interface ResumeFormProps {
  section: 'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'projects'
}

export function ResumeForm({ section }: ResumeFormProps) {
  const { resume, updateContact, updateSummary, updateExperience, updateEducation, updateSkills, updateProjects } = useResumeStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    console.log('Form mounted with section:', section)
    console.log('Current resume state:', resume)
  }, [section, resume])

  const form = useForm<Resume>({
    resolver: zodResolver(resumeSchema),
    defaultValues: resume,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted')
    
    try {
      setIsSubmitting(true)
      setError(null)
      
      const formData = form.getValues()
      console.log('Form data:', formData)
      
      if (section === 'contact') {
        console.log('Updating contact:', formData.contact)
        updateContact(formData.contact)
      } else if (section === 'summary') {
        console.log('Updating summary:', formData.summary)
        updateSummary(formData.summary)
      } else if (section === 'experience') {
        console.log('Updating experience:', formData.experience)
        updateExperience(formData.experience)
      } else if (section === 'education') {
        console.log('Updating education:', formData.education)
        updateEducation(formData.education)
      } else if (section === 'skills') {
        console.log('Updating skills:', formData.skills)
        updateSkills(formData.skills)
      } else if (section === 'projects') {
        console.log('Updating projects:', formData.projects)
        updateProjects(formData.projects)
      }
      
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error('Error saving form:', error)
      setError('Failed to save changes. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (section === 'contact') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...form.register('contact.name')}
              placeholder="John Doe"
            />
            {form.formState.errors.contact?.name && (
              <p className="text-sm text-red-500">
                {form.formState.errors.contact.name.message?.toString()}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Professional Title</Label>
            <Input
              id="title"
              {...form.register('contact.title')}
              placeholder="Software Engineer"
            />
            {form.formState.errors.contact?.title && (
              <p className="text-sm text-red-500">
                {form.formState.errors.contact.title.message?.toString()}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register('contact.email')}
              placeholder="john@example.com"
            />
            {form.formState.errors.contact?.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.contact.email.message?.toString()}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              {...form.register('contact.phone')}
              placeholder="+1 (555) 000-0000"
            />
            {form.formState.errors.contact?.phone && (
              <p className="text-sm text-red-500">
                {form.formState.errors.contact.phone.message?.toString()}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...form.register('contact.location')}
              placeholder="City, Country"
            />
            {form.formState.errors.contact?.location && (
              <p className="text-sm text-red-500">
                {form.formState.errors.contact.location.message?.toString()}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
          {submitSuccess && (
            <p className="text-sm text-green-500 text-center">
              Changes saved successfully!
            </p>
          )}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}
        </div>
      </form>
    )
  }

  if (section === 'summary') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            {...form.register('summary')}
            placeholder="Write a brief summary of your professional experience..."
            rows={4}
          />
          {form.formState.errors.summary && (
            <p className="text-sm text-red-500">
              {form.formState.errors.summary.message?.toString()}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
          {submitSuccess && (
            <p className="text-sm text-green-500 text-center">
              Changes saved successfully!
            </p>
          )}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}
        </div>
      </form>
    )
  }

  if (section === 'experience') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {resume.experience.map((_, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input
                    id={`company-${index}`}
                    {...form.register(`experience.${index}.company`)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input
                    id={`position-${index}`}
                    {...form.register(`experience.${index}.position`)}
                    placeholder="Job Title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    type="date"
                    {...form.register(`experience.${index}.startDate`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    type="date"
                    {...form.register(`experience.${index}.endDate`)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  {...form.register(`experience.${index}.description`)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const currentExperience = form.getValues('experience') || []
              form.setValue('experience', [
                ...currentExperience,
                {
                  company: '',
                  position: '',
                  startDate: '',
                  endDate: '',
                  description: '',
                },
              ])
            }}
          >
            Add Experience
          </Button>
        </div>
        <div className="space-y-2">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
          {submitSuccess && (
            <p className="text-sm text-green-500 text-center">
              Changes saved successfully!
            </p>
          )}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}
        </div>
      </form>
    )
  }

  if (section === 'education') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {resume.education.map((_, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`institution-${index}`}>Institution</Label>
                  <Input
                    id={`institution-${index}`}
                    {...form.register(`education.${index}.institution`)}
                    placeholder="University Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`degree-${index}`}>Degree</Label>
                  <Input
                    id={`degree-${index}`}
                    {...form.register(`education.${index}.degree`)}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`field-${index}`}>Field of Study</Label>
                  <Input
                    id={`field-${index}`}
                    {...form.register(`education.${index}.field`)}
                    placeholder="Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    type="date"
                    {...form.register(`education.${index}.startDate`)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    type="date"
                    {...form.register(`education.${index}.endDate`)}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const currentEducation = form.getValues('education') || []
              form.setValue('education', [
                ...currentEducation,
                {
                  institution: '',
                  degree: '',
                  field: '',
                  startDate: '',
                  endDate: '',
                },
              ])
            }}
          >
            Add Education
          </Button>
        </div>
        <div className="space-y-2">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
          {submitSuccess && (
            <p className="text-sm text-green-500 text-center">
              Changes saved successfully!
            </p>
          )}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}
        </div>
      </form>
    )
  }

  if (section === 'skills') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const currentSkills = form.getValues('skills') || []
                      form.setValue(
                        'skills',
                        currentSkills.filter((_, i) => i !== index)
                      )
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Input
              id="newSkill"
              placeholder="Add a skill"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  const input = e.target as HTMLInputElement
                  const newSkill = input.value.trim()
                  if (newSkill) {
                    const currentSkills = form.getValues('skills') || []
                    form.setValue('skills', [...currentSkills, newSkill])
                    input.value = ''
                  }
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const input = document.getElementById('newSkill') as HTMLInputElement
                const newSkill = input.value.trim()
                if (newSkill) {
                  const currentSkills = form.getValues('skills') || []
                  form.setValue('skills', [...currentSkills, newSkill])
                  input.value = ''
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
          {submitSuccess && (
            <p className="text-sm text-green-500 text-center">
              Changes saved successfully!
            </p>
          )}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}
        </div>
      </form>
    )
  }

  if (section === 'projects') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {resume.projects.map((_, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`name-${index}`}>Project Name</Label>
                <Input
                  id={`name-${index}`}
                  {...form.register(`projects.${index}.name`)}
                  placeholder="Project Name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`description-${index}`}>Description</Label>
                <Textarea
                  id={`description-${index}`}
                  {...form.register(`projects.${index}.description`)}
                  placeholder="Describe the project and your role..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="flex flex-wrap gap-2">
                  {form.watch(`projects.${index}.technologies`)?.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const currentTechs = form.getValues(`projects.${index}.technologies`) || []
                          form.setValue(
                            `projects.${index}.technologies`,
                            currentTechs.filter((_, i) => i !== techIndex)
                          )
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a technology"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        const input = e.target as HTMLInputElement
                        const newTech = input.value.trim()
                        if (newTech) {
                          const currentTechs = form.getValues(`projects.${index}.technologies`) || []
                          form.setValue(`projects.${index}.technologies`, [...currentTechs, newTech])
                          input.value = ''
                        }
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const input = document.querySelector(`input[placeholder="Add a technology"]`) as HTMLInputElement
                      const newTech = input.value.trim()
                      if (newTech) {
                        const currentTechs = form.getValues(`projects.${index}.technologies`) || []
                        form.setValue(`projects.${index}.technologies`, [...currentTechs, newTech])
                        input.value = ''
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              const currentProjects = form.getValues('projects') || []
              form.setValue('projects', [
                ...currentProjects,
                {
                  name: '',
                  description: '',
                  technologies: [],
                },
              ])
            }}
          >
            Add Project
          </Button>
        </div>
        <div className="space-y-2">
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
          {submitSuccess && (
            <p className="text-sm text-green-500 text-center">
              Changes saved successfully!
            </p>
          )}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}
        </div>
      </form>
    )
  }

  return null
} 