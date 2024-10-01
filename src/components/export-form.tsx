"use client";

import { useState } from 'react'
import { useResumeStore } from '@/store/useResumeStore'
import { useHydration } from '@/hooks/useHydration'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import { Document, Packer, Paragraph } from 'docx'
import { pdf } from '@react-pdf/renderer'
import { ResumePDF } from './resume-pdf'
import { FileIcon, FileTextIcon } from 'lucide-react'

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export function ExportForm() {
  const hydrated = useHydration()
  const [format, setFormat] = useState<'pdf' | 'docx'>('pdf')
  const [loading, setLoading] = useState(false)
  const resume = useResumeStore((state) => state.resume)
  const styling = useResumeStore((state) => state.styling)

  if (!hydrated) {
    return null
  }

  const handleWordExport = async () => {
    try {
      setLoading(true)
      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                size: {
                  width: 11906, // A4 width in twips (1/20th of a point)
                  height: 16838, // A4 height in twips
                },
                margin: {
                  top: 1440, // 1 inch in twips
                  right: 1440,
                  bottom: 1440,
                  left: 1440,
                },
              },
            },
            children: [
              // Header/Contact Section
              new Paragraph({
                text: resume.contact.name,
                heading: 'Title',
                alignment: 'center',
                spacing: { after: 200 },
              }),
              new Paragraph({
                text: `${resume.contact.email} • ${resume.contact.phone} • ${resume.contact.location}`,
                alignment: 'center',
                spacing: { after: 200 },
              }),
              resume.contact.linkedin && new Paragraph({
                text: `LinkedIn: ${resume.contact.linkedin}`,
                alignment: 'center',
              }),
              (resume.contact.github || resume.contact.website) && new Paragraph({
                text: [
                  resume.contact.github && `GitHub: ${resume.contact.github}`,
                  resume.contact.website && `Portfolio: ${resume.contact.website}`,
                ].filter(Boolean).join(' • '),
                alignment: 'center',
                spacing: { after: 400 },
              }),

              // Summary Section
              resume.summary && [
                new Paragraph({
                  text: 'Professional Summary',
                  heading: 'Heading2',
                  spacing: { after: 200 },
                }),
                new Paragraph({
                  text: resume.summary,
                  spacing: { after: 400 },
                }),
              ],

              // Experience Section
              resume.experience.length > 0 && [
                new Paragraph({
                  text: 'Experience',
                  heading: 'Heading2',
                  spacing: { after: 200 },
                }),
                ...resume.experience.map(exp => [
                  new Paragraph({
                    text: exp.jobTitle,
                    bold: true,
                    spacing: { after: 100 },
                  }),
                  new Paragraph({
                    text: `${exp.company} • ${exp.location}`,
                    spacing: { after: 100 },
                  }),
                  new Paragraph({
                    text: `${formatDate(exp.startDate)} - ${exp.isPresent ? 'Present' : formatDate(exp.endDate)}`,
                    spacing: { after: 200 },
                  }),
                  ...exp.description.map(desc => new Paragraph({
                    text: `• ${desc}`,
                    indent: { left: 360 }, // 0.25 inch indent
                    spacing: { after: 100 },
                  })),
                ]).flat(),
              ],

              // Education Section
              resume.education.length > 0 && [
                new Paragraph({
                  text: 'Education',
                  heading: 'Heading2',
                  spacing: { after: 200 },
                }),
                ...resume.education.map(edu => [
                  new Paragraph({
                    text: edu.degree,
                    bold: true,
                    spacing: { after: 100 },
                  }),
                  new Paragraph({
                    text: `${edu.institution} • ${edu.location}`,
                    spacing: { after: 100 },
                  }),
                  new Paragraph({
                    text: `${formatDate(edu.startDate)} - ${edu.isExpected ? `Expected ${formatDate(edu.expectedDate)}` : formatDate(edu.endDate)}`,
                    spacing: { after: 200 },
                  }),
                ]).flat(),
              ],

              // Skills Section
              resume.skills.length > 0 && [
                new Paragraph({
                  text: 'Skills',
                  heading: 'Heading2',
                  spacing: { after: 200 },
                }),
                new Paragraph({
                  text: resume.skills.map(skill => 
                    `${skill.name}${styling.showSkillProficiency && skill.proficiency ? ` (${skill.proficiency}%)` : ''}`
                  ).join(' • '),
                  spacing: { after: 400 },
                }),
              ],

              // Projects Section
              resume.projects.length > 0 && [
                new Paragraph({
                  text: 'Projects',
                  heading: 'Heading2',
                  spacing: { after: 200 },
                }),
                ...resume.projects.map(project => [
                  new Paragraph({
                    text: project.name,
                    bold: true,
                    spacing: { after: 100 },
                  }),
                  new Paragraph({
                    text: project.description,
                    spacing: { after: 100 },
                  }),
                  new Paragraph({
                    text: project.technologies.join(' • '),
                    spacing: { after: 100 },
                  }),
                  styling.showLinks && (project.githubLink || project.demoLink) && new Paragraph({
                    text: [
                      project.githubLink && `GitHub: ${project.githubLink}`,
                      project.demoLink && `Demo: ${project.demoLink}`,
                    ].filter(Boolean).join(' • '),
                    spacing: { after: 200 },
                  }),
                ]).flat(),
              ],
            ].filter(Boolean).flat(),
          }
        ]
      })

      const blob = await Packer.toBlob(doc)
      saveAs(blob, `${resume.contact.name.toLowerCase().replace(/\s+/g, '-')}-resume.docx`)
      toast.success('Word document downloaded successfully!')
    } catch (error) {
      console.error('Error generating Word document:', error)
      toast.error('Error generating Word document')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <RadioGroup
        value={format}
        onValueChange={(value) => setFormat(value as 'pdf' | 'docx')}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <RadioGroupItem
            value="pdf"
            id="pdf"
            className="peer sr-only"
          />
          <Label
            htmlFor="pdf"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <FileIcon className="mb-3 h-6 w-6" />
            PDF
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value="docx"
            id="docx"
            className="peer sr-only"
          />
          <Label
            htmlFor="docx"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <FileTextIcon className="mb-3 h-6 w-6" />
            Word
          </Label>
        </div>
      </RadioGroup>

      {format === 'pdf' ? (
        <Button
          className="w-full"
          onClick={async () => {
            try {
              const blob = await pdf(<ResumePDF />).toBlob()
              saveAs(blob, `${resume.contact.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`)
              toast.success('PDF downloaded successfully!')
            } catch (error) {
              console.error('Error generating PDF:', error)
              toast.error('Error generating PDF')
            }
          }}
        >
          Download PDF
        </Button>
      ) : (
        <Button
          className="w-full"
          onClick={handleWordExport}
          disabled={loading}
        >
          {loading ? 'Generating Word...' : 'Download Word'}
        </Button>
      )}
    </div>
  )
} 