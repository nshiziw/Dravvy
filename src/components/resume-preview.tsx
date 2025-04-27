'use client'

import * as React from 'react'
import { useResumeStore } from '@/store/useResumeStore'
import type { ResumeData } from '@/types/resume'

const formatDate = (dateString: string) => {
  try {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    switch (styling.dateFormat) {
      case 'MM/YYYY':
        return date.toLocaleDateString('en-US', {
          month: '2-digit',
          year: 'numeric',
        });
      case 'MMM YYYY':
        return date.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });
      case 'MMMM YYYY':
        return date.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        });
      default:
        return date.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        });
    }
  } catch (error) {
    console.error('Invalid date format:', error);
    return dateString;
  }
};

// Helper function to get font size class
const getFontSizeClass = (type: 'heading' | 'subheading' | 'body') => {
  switch (styling.fontSize) {
    case 'small':
      return type === 'heading' ? 'text-xl' : type === 'subheading' ? 'text-base' : 'text-sm';
    case 'large':
      return type === 'heading' ? 'text-3xl' : type === 'subheading' ? 'text-xl' : 'text-base';
    default: // medium
      return type === 'heading' ? 'text-2xl' : type === 'subheading' ? 'text-lg' : 'text-sm';
  }
};

// Helper function to get spacing class
const getSpacingClass = () => {
  switch (styling.spacing) {
    case 'small':
      return 'space-y-4';
    case 'large':
      return 'space-y-8';
    default: // medium
      return 'space-y-6';
  }
};

export function ResumePreview(): JSX.Element {
  const contact = useResumeStore((state: { contact: ResumeData['contact'] }) => state.contact)
  const summary = useResumeStore((state: { summary: ResumeData['summary'] }) => state.summary)
  const experience = useResumeStore((state: { experience: ResumeData['experience'] }) => state.experience)
  const education = useResumeStore((state: { education: ResumeData['education'] }) => state.education)
  const skills = useResumeStore((state: { skills: ResumeData['skills'] }) => state.skills)
  const projects = useResumeStore((state: { projects: ResumeData['projects'] }) => state.projects)
  const languages = useResumeStore((state: { languages: ResumeData['languages'] }) => state.languages)
  const references = useResumeStore((state: { references: ResumeData['references'] }) => state.references)
  const styling = useResumeStore((state: { style: ResumeData['style'] }) => state.style)

  const renderDivider = () => {
    switch (styling.sectionDivider?.type) {
      case 'line':
        return <div className="w-full h-px my-4" style={{ backgroundColor: styling.sectionDivider.color }} />;
      case 'double-line':
        return (
          <div className="my-4 space-y-1">
            <div className="w-full h-px" style={{ backgroundColor: styling.sectionDivider.color }} />
            <div className="w-full h-px" style={{ backgroundColor: styling.sectionDivider.color }} />
          </div>
        );
      case 'dashes':
        return (
          <div className="flex gap-1 my-4">
            {Array(30).fill(0).map((_, i) => (
              <div key={i} className="w-2 h-px" style={{ backgroundColor: styling.sectionDivider.color }} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow" style={{ fontFamily: styling.fontFamily }}>
      <h2 className={`mb-4 font-semibold text-gray-900 ${getFontSizeClass('subheading')}`}>Preview</h2>
      <div className={getSpacingClass()}>
        <div className="space-y-2 text-center">
          <h1 className={`font-bold text-gray-900 ${getFontSizeClass('heading')}`}>{contact.name}</h1>
          <div className="space-x-2 text-sm text-gray-600">
            {contact.phone && (
              styling.showLinks ? (
                <a href={`tel:${contact.phone}`} className="transition-colors hover:text-blue-600">
                  {contact.phone}
                </a>
              ) : (
                <span>{contact.phone}</span>
              )
            )}
            {contact.phone && contact.email && <span>•</span>}
            {contact.email && (
              styling.showLinks ? (
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-blue-600">
                  {contact.email}
                </a>
              ) : (
                <span>{contact.email}</span>
              )
            )}
            {contact.email && contact.linkedin && <span>•</span>}
            {contact.linkedin && (
              styling.showLinks ? (
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600">
                  LinkedIn
                </a>
              ) : (
                <span>LinkedIn</span>
              )
            )}
          </div>
          <div className="space-x-2 text-sm text-gray-600">
            {contact.github && (
              styling.showLinks ? (
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600">
                  GitHub
                </a>
              ) : (
                <span>GitHub</span>
              )
            )}
            {contact.github && contact.website && <span>•</span>}
            {contact.website && (
              styling.showLinks ? (
                <a href={contact.website} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-600">
                  Portfolio
                </a>
              ) : (
                <span>Portfolio</span>
              )
            )}
            {(contact.website || contact.github) && contact.location && <span>•</span>}
            {contact.location && (
              <span>{contact.location}</span>
            )}
          </div>
        </div>

        {renderDivider()}

        <div>
          <h4 className={`font-medium text-gray-900 ${getFontSizeClass('subheading')}`}>Summary</h4>
          <p className={getFontSizeClass('body')}>{summary}</p>
        </div>
        
        {experience.length > 0 && (
          <>
            {renderDivider()}
            <div className={getSpacingClass()}>
              <h4 className={`font-medium text-gray-900 ${getFontSizeClass('subheading')}`}>Experience</h4>
              {experience.map((exp, index) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between">
                    <h5 className={`font-semibold text-gray-800 ${getFontSizeClass('subheading')}`}>{exp.jobTitle}</h5>
                    <span className={`text-gray-600 ${getFontSizeClass('body')}`}>
                      {formatDate(exp.startDate)} - {exp.isPresent ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{exp.company}</span>
                    <span>{exp.location}</span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
                    {exp.description.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}

        {education.length > 0 && (
          <>
            {renderDivider()}
            <div className={getSpacingClass()}>
              <h4 className={`font-medium text-gray-900 ${getFontSizeClass('subheading')}`}>Education</h4>
              {education.map((edu, index) => (
                <div key={edu.id} className="space-y-2">
                  <div className="flex justify-between">
                    <h5 className={`font-semibold text-gray-800 ${getFontSizeClass('subheading')}`}>{edu.degree}</h5>
                    <span className={`text-gray-600 ${getFontSizeClass('body')}`}>
                      {formatDate(edu.startDate)} - {edu.isExpected ? `Expected ${formatDate(edu.expectedDate)}` : formatDate(edu.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{edu.institution}</span>
                    <span>{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {projects.length > 0 && (
          <>
            {renderDivider()}
            <div className={getSpacingClass()}>
              <h4 className={`font-medium text-gray-900 ${getFontSizeClass('subheading')}`}>Projects</h4>
              {projects.map((project, index) => (
                <div key={project.id} className="space-y-2">
                  <div className="flex justify-between">
                    <h5 className={`font-semibold text-gray-800 ${getFontSizeClass('subheading')}`}>{project.name}</h5>
                  </div>
                  <p className={getFontSizeClass('body')}>{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 text-sm">
                    {project.githubLink && styling.showLinks && (
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                      >
                        GitHub
                      </a>
                    )}
                    {project.demoLink && styling.showLinks && (
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
          </>
        )}

        {skills.length > 0 && (
          <>
            {renderDivider()}
            <div className={getSpacingClass()}>
              <h4 className={`font-medium text-gray-900 ${getFontSizeClass('subheading')}`}>Skills</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {skills.map((skill, index) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium text-gray-800 ${getFontSizeClass('body')}`}>{skill.name}</span>
                      {styling.showSkillProficiency && skill.proficiency !== undefined && (
                        <span className={`text-gray-600 ${getFontSizeClass('body')}`}>{skill.proficiency}%</span>
                      )}
                    </div>
                    {styling.showSkillProficiency && skill.proficiency !== undefined && (
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
          </>
        )}

        {languages.length > 0 && (
          <>
            {renderDivider()}
            <div className={getSpacingClass()}>
              <h4 className={`font-medium text-gray-900 ${getFontSizeClass('subheading')}`}>Languages</h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {languages.map((language) => (
                  <div key={language.id} className="flex items-center justify-between">
                    <span className={`font-medium text-gray-800 ${getFontSizeClass('body')}`}>{language.name}</span>
                    <span className={`text-gray-600 ${getFontSizeClass('body')}`}>{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {references.length > 0 && (
          <>
            {renderDivider()}
            <div className={getSpacingClass()}>
              <h4 className={`font-medium text-gray-900 ${getFontSizeClass('subheading')}`}>References</h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {references.map((reference) => (
                  <div key={reference.id} className="space-y-2">
                    <h5 className={`font-semibold text-gray-800 ${getFontSizeClass('subheading')}`}>{reference.name}</h5>
                    <div className={`text-gray-600 ${getFontSizeClass('body')}`}>
                      <p>{reference.relationship}</p>
                      {styling.showLinks ? (
                        <>
                          <a href={`mailto:${reference.email}`} className="block transition-colors hover:text-blue-600">
                            {reference.email}
                          </a>
                          <a href={`tel:${reference.phone}`} className="transition-colors hover:text-blue-600">
                            {reference.phone}
                          </a>
                        </>
                      ) : (
                        <>
                          <p>{reference.email}</p>
                          <p>{reference.phone}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}