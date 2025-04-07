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
  section: 'contact' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'awards'
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

  if (section === 'contact') {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <div className="mt-1 flex items-center space-x-4">
              {form.watch('contact.profilePicture') ? (
                <img
                  src={form.watch('contact.profilePicture')}
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      form.setValue('contact.profilePicture', reader.result as string);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              {...form.register('contact.name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              {...form.register('contact.title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...form.register('contact.email')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              {...form.register('contact.phone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input
              type="url"
              {...form.register('contact.website')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="https://your-website.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
            <input
              type="url"
              {...form.register('contact.linkedin')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">GitHub</label>
            <input
              type="url"
              {...form.register('contact.github')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="https://github.com/your-username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              {...form.register('contact.location')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
              required
            />
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
      <form onSubmit={handleSkillsSubmit} className="space-y-6">
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Skill {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Skill Name</label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Proficiency (Optional)</label>
                  <div className="mt-1 flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.proficiency || 0}
                      onChange={(e) => handleSkillChange(index, 'proficiency', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {skill.proficiency || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">New Skill</label>
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
              />
            </div>
            <div className="w-32">
              <label className="block text-sm font-medium text-gray-700">Proficiency</label>
              <input
                type="number"
                min="0"
                max="100"
                value={newProficiency}
                onChange={(e) => setNewProficiency(e.target.value)}
                placeholder="0-100"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
              />
            </div>
            <button
              type="button"
              onClick={addSkill}
              className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>

        <div className="flex justify-end">
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

  if (section === 'certifications') {
    return (
      <form onSubmit={handleCertificationSubmit} className="space-y-6">
        <div className="space-y-4">
          {certifications.map((certification, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Certification {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={certification.title}
                    onChange={(e) => handleCertificationChange(index, 'title', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Issuer</label>
                  <input
                    type="text"
                    value={certification.issuer}
                    onChange={(e) => handleCertificationChange(index, 'issuer', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                  <input
                    type="date"
                    value={certification.issueDate}
                    onChange={(e) => handleCertificationChange(index, 'issueDate', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
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
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Certification
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

  if (section === 'awards') {
    return (
      <form onSubmit={handleAwardSubmit} className="space-y-6">
        <div className="space-y-4">
          {awards.map((award, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Award {index + 1}</h3>
                <button
                  type="button"
                  onClick={() => removeAward(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={award.title}
                    onChange={(e) => handleAwardChange(index, 'title', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Institution</label>
                  <input
                    type="text"
                    value={award.institution}
                    onChange={(e) => handleAwardChange(index, 'institution', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={award.date}
                    onChange={(e) => handleAwardChange(index, 'date', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 bg-white"
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
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Award
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