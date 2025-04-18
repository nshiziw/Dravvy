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
import { StylingForm } from './styling-form'

interface ResumeFormProps {
  section: 'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'awards' | 'styling'
}

const inputStyles = "w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out placeholder-gray-400 outline-none"
const textareaStyles = "w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out placeholder-gray-400 resize-none outline-none"
const labelStyles = "block text-sm font-medium text-gray-700 mb-1.5"
const checkboxStyles = "h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200 outline-none"
const buttonStyles = "px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

type Project = {
  name: string;
  description: string;
  technologies: string[];
  githubLink?: string;
  demoLink?: string;
  hasGithubLink: boolean;
  hasDemoLink: boolean;
}

export function ResumeForm({ section }: ResumeFormProps) {
  const { resume, updateContact, updateSummary, updateExperience, updateEducation, updateSkills, updateProjects, updateCertifications, updateAwards } = useResumeStore()
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

  const [projects, setProjects] = useState<Array<Project>>([]);

  const [newTechnology, setNewTechnology] = useState('');

  const [skills, setSkills] = useState<Array<{
    name: string;
    proficiency?: number;
  }>>([]);

  const [newSkill, setNewSkill] = useState('');
  const [newProficiency, setNewProficiency] = useState('');

  const [certifications, setCertifications] = useState<Array<{
    title: string;
    issuer: string;
    issueDate: string;
  }>>([]);

  const [awards, setAwards] = useState<Array<{
    title: string;
    institution: string;
    date: string;
  }>>([]);

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
    setIsSubmitting(false);
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
    setIsSubmitting(false);
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

  const handleProjectChange = (index: number, field: keyof Project, value: string | string[] | boolean) => {
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
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, {
        name: newSkill.trim(),
        proficiency: newProficiency ? parseInt(newProficiency) : undefined
      }]);
      setNewSkill('');
      setNewProficiency('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillChange = (index: number, field: string, value: string | number) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    setSkills(updatedSkills);
  };

  const handleSkillsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSkills(skills);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const addCertification = () => {
    setCertifications([...certifications, {
      title: '',
      issuer: '',
      issueDate: ''
    }]);
  };

  const removeCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  const handleCertificationChange = (index: number, field: string, value: string) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [field]: value
    };
    setCertifications(updatedCertifications);
  };

  const handleCertificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCertifications(certifications);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const addAward = () => {
    setAwards([...awards, {
      title: '',
      institution: '',
      date: ''
    }]);
  };

  const removeAward = (index: number) => {
    setAwards(awards.filter((_, i) => i !== index));
  };

  const handleAwardChange = (index: number, field: string, value: string) => {
    const updatedAwards = [...awards];
    updatedAwards[index] = {
      ...updatedAwards[index],
      [field]: value
    };
    setAwards(updatedAwards);
  };

  const handleAwardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAwards(awards);
    setIsSubmitting(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = form.getValues();
    console.log('Form submitted:', formData);
    
    if (section === 'contact') {
      updateContact(formData.contact);
    } else if (section === 'summary') {
      updateSummary(formData.summary);
    }
    
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  if (section === 'styling') {
    return <StylingForm />
  }

  if (section === 'contact') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className={labelStyles}>Full Name</label>
            <input
              type="text"
              {...form.register('contact.name')}
              className={inputStyles}
              required
            />
          </div>
          <div>
            <label className={labelStyles}>Title</label>
            <input
              type="text"
              {...form.register('contact.title')}
              className={inputStyles}
              required
            />
          </div>
          <div>
            <label className={labelStyles}>Email</label>
            <input
              type="email"
              {...form.register('contact.email')}
              className={inputStyles}
              required
            />
          </div>
          <div>
            <label className={labelStyles}>Phone</label>
            <input
              type="tel"
              {...form.register('contact.phone')}
              className={inputStyles}
              required
            />
          </div>
          <div>
            <label className={labelStyles}>Website</label>
            <input
              type="url"
              {...form.register('contact.website')}
              className={inputStyles}
              placeholder="https://your-website.com"
            />
          </div>
          <div>
            <label className={labelStyles}>LinkedIn</label>
            <input
              type="url"
              {...form.register('contact.linkedin')}
              className={inputStyles}
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>
          <div>
            <label className={labelStyles}>GitHub</label>
            <input
              type="url"
              {...form.register('contact.github')}
              className={inputStyles}
              placeholder="https://github.com/your-username"
            />
          </div>
          <div>
            <label className={labelStyles}>Location</label>
            <input
              type="text"
              {...form.register('contact.location')}
              className={inputStyles}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Button 
            type="submit"
            className={buttonStyles}
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
          <Label htmlFor="summary" className={labelStyles}>Summary</Label>
          <Textarea
            id="summary"
            {...form.register('summary')}
            placeholder="Write a brief summary of your professional experience..."
            rows={4}
            className={textareaStyles}
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
            className={buttonStyles}
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
            <div key={index} className="p-6 border border-gray-200 rounded-lg space-y-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Experience {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelStyles}>Job Title</label>
                  <input
                    type="text"
                    value={exp.jobTitle}
                    onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>Company Name</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>Location</label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>Start Date</label>
                  <input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>End Date</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                      className={inputStyles}
                      disabled={exp.isPresent}
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exp.isPresent}
                        onChange={(e) => handleExperienceChange(index, 'isPresent', e.target.checked)}
                        className={checkboxStyles}
                      />
                      <label className="ml-2 block text-sm text-gray-700">Present</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className={labelStyles}>Description Points</label>
                <div className="mt-2 space-y-2">
                  {exp.description.map((point, descIndex) => (
                    <div key={descIndex} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                      <span className="text-gray-500">•</span>
                      <span className="flex-grow text-gray-900">{point}</span>
                      <button
                        type="button"
                        onClick={() => removeDescriptionPoint(index, descIndex)}
                        className="text-red-500 hover:text-red-700 text-sm"
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
                        className={inputStyles}
                      />
                      <button
                        type="button"
                        onClick={() => addDescriptionPoint(index)}
                        className={buttonStyles}
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
            className={buttonStyles}
          >
            Add Experience
          </button>
          <button
            type="submit"
            disabled={isSubmitting || experiences.some(exp => exp.description.length < 2)}
            className={buttonStyles}
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
            <div key={index} className="p-6 border border-gray-200 rounded-lg space-y-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Education {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelStyles}>Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>Location</label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>Start Date</label>
                  <input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>
                    {edu.isExpected ? 'Expected Date' : 'End Date'}
                  </label>
                  <input
                    type="date"
                    value={edu.isExpected ? edu.expectedDate : edu.endDate}
                    onChange={(e) => handleEducationChange(index, edu.isExpected ? 'expectedDate' : 'endDate', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={edu.isExpected}
                    onChange={(e) => handleEducationChange(index, 'isExpected', e.target.checked)}
                    className={checkboxStyles}
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
            className={buttonStyles}
          >
            Add Education
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonStyles}
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
      <form onSubmit={handleSkillsSubmit} className="space-y-6">
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg space-y-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Skill {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={labelStyles}>Skill Name</label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>Proficiency (Optional)</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.proficiency || 0}
                        onChange={(e) => handleSkillChange(index, 'proficiency', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:scale-110"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 ${skill.proficiency || 0}%, #e5e7eb ${skill.proficiency || 0}%)`
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-center w-16 h-8 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-600">
                        {skill.proficiency || 0}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <label className={labelStyles}>New Skill</label>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Enter skill name"
                className={inputStyles}
              />
            </div>
            <div className="w-32">
              <label className={labelStyles}>Proficiency</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newProficiency}
                  onChange={(e) => setNewProficiency(e.target.value)}
                  placeholder="0-100"
                  className={inputStyles}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  %
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={addSkill}
              className={buttonStyles}
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonStyles}
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

  if (section === 'projects') {
    return (
      <form onSubmit={handleProjectSubmit} className="space-y-6">
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg space-y-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Project {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={labelStyles}>Project Name</label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    className={textareaStyles}
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
                      className={checkboxStyles}
                    />
                    <label className="ml-2 block text-sm text-gray-700">Include GitHub Link</label>
                  </div>
                  {project.hasGithubLink && (
                    <div>
                      <label className={labelStyles}>GitHub Link</label>
                      <input
                        type="url"
                        value={project.githubLink}
                        onChange={(e) => handleProjectChange(index, 'githubLink', e.target.value)}
                        className={inputStyles}
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
                      className={checkboxStyles}
                    />
                    <label className="ml-2 block text-sm text-gray-700">Include Live Demo Link</label>
                  </div>
                  {project.hasDemoLink && (
                    <div>
                      <label className={labelStyles}>Live Demo Link</label>
                      <input
                        type="url"
                        value={project.demoLink}
                        onChange={(e) => handleProjectChange(index, 'demoLink', e.target.value)}
                        className={inputStyles}
                        placeholder="https://project-demo.com"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className={labelStyles}>Technologies</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors duration-200"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(index, techIndex)}
                          className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
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
                      className={inputStyles}
                    />
                    <button
                      type="button"
                      onClick={() => addTechnology(index)}
                      className={buttonStyles}
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
            className={buttonStyles}
          >
            Add Project
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonStyles}
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

  if (section === 'certifications') {
    return (
      <form onSubmit={handleCertificationSubmit} className="space-y-6">
        <div className="space-y-4">
          {certifications.map((certification, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg space-y-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Certification {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={labelStyles}>Title</label>
                  <input
                    type="text"
                    value={certification.title}
                    onChange={(e) => handleCertificationChange(index, 'title', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>Issuer</label>
                  <input
                    type="text"
                    value={certification.issuer}
                    onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>Issue Date</label>
                  <input
                    type="date"
                    value={certification.issueDate}
                    onChange={(e) => handleCertificationChange(index, 'issueDate', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addCertification}
            className={buttonStyles}
          >
            Add Certification
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonStyles}
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

  if (section === 'awards') {
    return (
      <form onSubmit={handleAwardSubmit} className="space-y-6">
        <div className="space-y-4">
          {awards.map((award, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg space-y-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Award {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeAward(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={labelStyles}>Title</label>
                  <input
                    type="text"
                    value={award.title}
                    onChange={(e) => handleAwardChange(index, 'title', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>Institution</label>
                  <input
                    type="text"
                    value={award.institution}
                    onChange={(e) => handleAwardChange(index, 'institution', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
                <div>
                  <label className={labelStyles}>Date</label>
                  <input
                    type="date"
                    value={award.date}
                    onChange={(e) => handleAwardChange(index, 'date', e.target.value)}
                    className={inputStyles}
                    required
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={addAward}
            className={buttonStyles}
          >
            Add Award
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={buttonStyles}
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

  if (section === 'styling') {
    return <StylingForm />
  }

  return null
} 