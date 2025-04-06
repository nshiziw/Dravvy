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

  const [experiences, setExperiences] = useState<Array<{
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isPresent: boolean;
    description: string[];
  }>>([]);

  const [newDescription, setNewDescription] = useState('');

  const [educations, setEducations] = useState<Array<{
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    expectedDate: string;
    isExpected: boolean;
  }>>([]);

  const [projects, setProjects] = useState<Array<{
    name: string;
    description: string;
    technologies: string[];
    githubLink?: string;
    demoLink?: string;
    hasGithubLink: boolean;
    hasDemoLink: boolean;
  }>>([]);

  const [newTechnology, setNewTechnology] = useState('');

  const addExperience = () => {
    setExperiences([...experiences, {
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isPresent: false,
      description: []
    }]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addDescriptionPoint = (expIndex: number) => {
    if (newDescription.trim() && experiences[expIndex].description.length < 5) {
      const updatedExperiences = [...experiences];
      updatedExperiences[expIndex].description.push(newDescription.trim());
      setExperiences(updatedExperiences);
      setNewDescription('');
    }
  };

  const removeDescriptionPoint = (expIndex: number, descIndex: number) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].description = updatedExperiences[expIndex].description.filter((_, i) => i !== descIndex);
    setExperiences(updatedExperiences);
  };

  const handleExperienceChange = (index: number, field: string, value: string | boolean) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    setExperiences(updatedExperiences);
  };

  const handleExperienceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateExperience(experiences);
    setIsSubmitting(true);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const addEducation = () => {
    setEducations([...educations, {
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      expectedDate: '',
      isExpected: false
    }]);
  };

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const handleEducationChange = (index: number, field: string, value: string | boolean) => {
    const updatedEducations = [...educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [field]: value
    };
    setEducations(updatedEducations);
  };

  const handleEducationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEducation(educations);
    setIsSubmitting(true);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const addProject = () => {
    setProjects([...projects, {
      name: '',
      description: '',
      technologies: [],
      githubLink: '',
      demoLink: '',
      hasGithubLink: false,
      hasDemoLink: false
    }]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleProjectChange = (index: number, field: string, value: string | string[]) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setProjects(updatedProjects);
  };

  const addTechnology = (projectIndex: number) => {
    if (newTechnology.trim()) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex].technologies.push(newTechnology.trim());
      setProjects(updatedProjects);
      setNewTechnology('');
    }
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].technologies = updatedProjects[projectIndex].technologies.filter((_, i) => i !== techIndex);
    setProjects(updatedProjects);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProjects(projects);
    setIsSubmitting(true);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

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
      <form onSubmit={handleExperienceSubmit} className="space-y-6">
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Title</label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                      disabled={exp.isPresent}
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exp.isPresent}
                        onChange={(e) => handleExperienceChange(index, 'isPresent', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-700">Present</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Description Points</label>
                <div className="mt-2 space-y-2">
                  {exp.description.map((point, descIndex) => (
                    <div key={descIndex} className="flex items-center space-x-2">
                      <span className="text-gray-500">•</span>
                      <span className="flex-grow">{point}</span>
                      <button
                        type="button"
                        onClick={() => removeDescriptionPoint(index, descIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  {exp.description.length < 5 && (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Add a description point"
                        className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => addDescriptionPoint(index)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Add
                      </button>
                    </div>
                  )}
                </div>
                {exp.description.length < 2 && (
                  <p className="mt-1 text-sm text-red-600">Add at least 2 description points</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addExperience}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Experience
          </button>
          <button
            type="submit"
            disabled={isSubmitting || experiences.some(exp => exp.description.length < 2)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {submitSuccess && (
          <p className="text-green-600">Changes saved successfully!</p>
        )}
        {error && (
          <p className="text-red-600">{error}</p>
        )}
      </form>
    )
  }

  if (section === 'education') {
    return (
      <form onSubmit={handleEducationSubmit} className="space-y-6">
        <div className="space-y-4">
          {educations.map((edu, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Education {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {edu.isExpected ? 'Expected Date' : 'End Date'}
                  </label>
                  <input
                    type="date"
                    value={edu.isExpected ? edu.expectedDate : edu.endDate}
                    onChange={(e) => handleEducationChange(index, edu.isExpected ? 'expectedDate' : 'endDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={edu.isExpected}
                    onChange={(e) => handleEducationChange(index, 'isExpected', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Expected</label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addEducation}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Education
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {submitSuccess && (
          <p className="text-green-600">Changes saved successfully!</p>
        )}
        {error && (
          <p className="text-red-600">{error}</p>
        )}
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
      <form onSubmit={handleProjectSubmit} className="space-y-6">
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Project {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={project.hasGithubLink}
                      onChange={(e) => handleProjectChange(index, 'hasGithubLink', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">Include GitHub Link</label>
                  </div>
                  {project.hasGithubLink && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">GitHub Link</label>
                      <input
                        type="url"
                        value={project.githubLink}
                        onChange={(e) => handleProjectChange(index, 'githubLink', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                        placeholder="https://github.com/username/project"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={project.hasDemoLink}
                      onChange={(e) => handleProjectChange(index, 'hasDemoLink', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">Include Live Demo Link</label>
                  </div>
                  {project.hasDemoLink && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Live Demo Link</label>
                      <input
                        type="url"
                        value={project.demoLink}
                        onChange={(e) => handleProjectChange(index, 'demoLink', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                        placeholder="https://project-demo.com"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Technologies</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(index, techIndex)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex">
                    <input
                      type="text"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTechnology(index);
                        }
                      }}
                      placeholder="Add a technology"
                      className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => addTechnology(index)}
                      className="px-3 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addProject}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Project
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {submitSuccess && (
          <p className="text-green-600">Changes saved successfully!</p>
        )}
        {error && (
          <p className="text-red-600">{error}</p>
        )}
      </form>
    )
  }

  return null
} 