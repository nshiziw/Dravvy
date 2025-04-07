'use client'

import { useResumeStore } from '@/store/useResumeStore'

export function ResumePreview() {
  const resume = useResumeStore((state) => state.resume)

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-gray-900">{resume.contact.name}</h3>
          <p className="text-sm text-gray-600">{resume.contact.title}</p>
        </div>
        <div className="text-sm text-gray-600">
          <p>{resume.contact.email}</p>
          <p>{resume.contact.phone}</p>
          <p>{resume.contact.location}</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">Summary</h4>
          <p className="text-sm text-gray-600">{resume.summary}</p>
        </div>
        
        {resume.experience.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Experience</h4>
            {resume.experience.map((exp, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <h5 className="font-semibold text-gray-800">{exp.jobTitle}</h5>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.isPresent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  {exp.description.map((point, pointIndex) => (
                    <li key={pointIndex}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {resume.education.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Education</h4>
            {resume.education.map((edu, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <h5 className="font-semibold text-gray-800">{edu.degree}</h5>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.isExpected ? `Expected ${edu.expectedDate}` : edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{edu.institution}</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {resume.projects.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Projects</h4>
            {resume.projects.map((project, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <h5 className="font-semibold text-gray-800">{project.name}</h5>
                </div>
                <p className="text-sm text-gray-600">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm">
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demoLink && (
                    <a 
                      href={project.demoLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {resume.skills.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Skills</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resume.skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{skill.name}</span>
                    {skill.proficiency !== undefined && (
                      <span className="text-sm text-gray-600">{skill.proficiency}%</span>
                    )}
                  </div>
                  {skill.proficiency !== undefined && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.certifications.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Certifications</h2>
            <div className="mt-2 space-y-2">
              {resume.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{cert.title}</h3>
                    <p className="text-gray-600">{cert.issuer}</p>
                  </div>
                  <p className="text-gray-600">{cert.issueDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.awards.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold">Awards</h2>
            <div className="mt-2 space-y-2">
              {resume.awards.map((award, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{award.title}</h3>
                    <p className="text-gray-600">{award.institution}</p>
                  </div>
                  <p className="text-gray-600">{award.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 