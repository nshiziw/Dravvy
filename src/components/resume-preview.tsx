'use client'

import { useResumeStore } from '@/store/useResumeStore'

export function ResumePreview() {
  const resume = useResumeStore((state) => state.resume)
  const styling = useResumeStore((state) => state.styling)

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    switch (styling.dateFormat) {
      case 'MM/DD/YYYY':
        return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
      case 'DD/MM/YYYY':
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
      case 'Month DD, YYYY':
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      case 'DD Month YYYY':
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      default:
        return dateString;
    }
  };

  const renderDivider = () => {
    switch (styling.sectionDivider.type) {
      case 'line':
        return <div className="w-full h-px my-4" style={{ backgroundColor: styling.sectionDivider.color }} />;
      case 'double-line':
        return (
          <div className="space-y-1 my-4">
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
    <div className="bg-white rounded-lg shadow p-6" style={{ fontFamily: styling.fontFamily }}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{resume.contact.name}</h1>
          <div className="text-sm text-gray-600 space-x-2">
            {resume.contact.phone && (
              styling.showLinks ? (
                <a href={`tel:${resume.contact.phone}`} className="hover:text-blue-600 transition-colors">
                  {resume.contact.phone}
                </a>
              ) : (
                <span>{resume.contact.phone}</span>
              )
            )}
            {resume.contact.phone && resume.contact.email && <span>•</span>}
            {resume.contact.email && (
              styling.showLinks ? (
                <a href={`mailto:${resume.contact.email}`} className="hover:text-blue-600 transition-colors">
                  {resume.contact.email}
                </a>
              ) : (
                <span>{resume.contact.email}</span>
              )
            )}
            {resume.contact.email && resume.contact.linkedin && <span>•</span>}
            {resume.contact.linkedin && (
              styling.showLinks ? (
                <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  LinkedIn
                </a>
              ) : (
                <span>LinkedIn</span>
              )
            )}
          </div>
          <div className="text-sm text-gray-600 space-x-2">
            {resume.contact.github && (
              styling.showLinks ? (
                <a href={resume.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  GitHub
                </a>
              ) : (
                <span>GitHub</span>
              )
            )}
            {resume.contact.github && resume.contact.website && <span>•</span>}
            {resume.contact.website && (
              styling.showLinks ? (
                <a href={resume.contact.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  Portfolio
                </a>
              ) : (
                <span>Portfolio</span>
              )
            )}
            {(resume.contact.website || resume.contact.github) && resume.contact.location && <span>•</span>}
            {resume.contact.location && (
              <span>{resume.contact.location}</span>
            )}
          </div>
        </div>

        {renderDivider()}

        <div>
          <h4 className="font-medium text-gray-900">Summary</h4>
          <p className="text-sm text-gray-600">{resume.summary}</p>
        </div>
        
        {resume.experience.length > 0 && (
          <>
            {renderDivider()}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Experience</h4>
              {resume.experience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <h5 className="font-semibold text-gray-800">{exp.jobTitle}</h5>
                    <span className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {exp.isPresent ? 'Present' : formatDate(exp.endDate)}
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
          </>
        )}

        {resume.education.length > 0 && (
          <>
            {renderDivider()}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Education</h4>
              {resume.education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <h5 className="font-semibold text-gray-800">{edu.degree}</h5>
                    <span className="text-sm text-gray-600">
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

        {resume.projects.length > 0 && (
          <>
            {renderDivider()}
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

        {resume.skills.length > 0 && (
          <>
            {renderDivider()}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Skills</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resume.skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">{skill.name}</span>
                      {styling.showSkillProficiency && skill.proficiency !== undefined && (
                        <span className="text-sm text-gray-600">{skill.proficiency}%</span>
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

        {resume.certifications.length > 0 && (
          <>
            {renderDivider()}
            <div className="mt-6">
              <h2 className="text-xl font-bold">Certifications</h2>
              <div className="mt-2 space-y-2">
                {resume.certifications.map((cert, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{cert.title}</h3>
                      <p className="text-gray-600">{cert.issuer}</p>
                    </div>
                    <p className="text-gray-600">{formatDate(cert.issueDate)}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {resume.awards.length > 0 && (
          <>
            {renderDivider()}
            <div className="mt-6">
              <h2 className="text-xl font-bold">Awards</h2>
              <div className="mt-2 space-y-2">
                {resume.awards.map((award, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{award.title}</h3>
                      <p className="text-gray-600">{award.institution}</p>
                    </div>
                    <p className="text-gray-600">{formatDate(award.date)}</p>
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