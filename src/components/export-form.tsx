

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-md"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.div
            className={cn(
              "absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 rounded-2xl blur-xl transition-opacity",
              isHovered ? "opacity-70" : "opacity-40"
            )}
            animate={{
              scale: loading ? [1, 1.02, 1] : isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 2, repeat: loading ? Infinity : 0 }}
          />

          <motion.button
            onClick={handleExport}
            disabled={loading}
            className={cn(
              "relative w-full px-8 py-4 text-lg font-medium text-white",
              "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600",
              "rounded-xl backdrop-blur-sm shadow-2xl",
              "border border-white/10",
              "transform transition-all duration-300",
              "hover:shadow-fuchsia-500/25 hover:border-white/25",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "group"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <motion.div
                    className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent font-semibold">
                    Crafting Your Resume...
                  </span>
                </>
              ) : (
                <>
                  <motion.svg
                    className="w-6 h-6 text-white/90 group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
}

interface ResumeState {
  resume: Resume
}

export function ExportForm() {
  const hydrated = useHydration()
  const [loading, setLoading] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const resume = useResumeStore((state: ResumeState) => state.resume)

  if (!hydrated) {
    return null
  }
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
                    text: project.link,
                    spacing: { after: 200 },
                  }),
                ]).flat(),
              ],
            ],
          },
        ])

        const packer = new Packer()
        const docx = await packer.pack(doc)
        saveAs(docx, `${resume.contact.name.toLowerCase().replace(/\s+/g, '-')}-resume.docx`)
        toast.success('Word document downloaded successfully!')
      } catch (error) {
        console.error('Error generating Word document:', error)
        toast.error('Error generating Word document')
      } finally {
        setLoading(false)
      }
    }

  const handleExport = async () => {
    try {
      setLoading(true)
      const doc = <ResumePDF />
      const blob = await pdf(doc).toBlob()
      saveAs(blob, `${resume.contact.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`)
      toast.success('Resume exported successfully! 🎉', {
        style: {
          background: '#10B981',
          color: '#fff',
        },
      })
    } catch (error: unknown) {
      console.error('Error exporting resume:', error)
      toast.error('Could not generate PDF. Please try again.', {
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <motion.button
          onClick={handleExport}
          disabled={loading}
          className="relative px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-lg
            shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                "use client";

import { useState } from 'react'
import { useResumeStore } from '@/store/useResumeStore'
import { useHydration } from '@/hooks/useHydration'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import { pdf } from '@react-pdf/renderer'
import { ResumePDF } from './resume-pdf'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FileIcon } from 'lucide-react'

interface Resume {
  contact: {
    name: string
  }
}

interface ResumeState {
  resume: Resume
}

export function ExportForm() {
  const hydrated = useHydration()
  const [loading, setLoading] = useState(false)
  const resume = useResumeStore((state: ResumeState) => state.resume)

  if (!hydrated) {
    return null
  }

  const handleExport = async () => {
    try {
      setLoading(true)
      const doc = <ResumePDF />
      const blob = await pdf(doc).toBlob()
      saveAs(blob, `${resume.contact.name.toLowerCase().replace(/\s+/g, '-')}-resume.pdf`)
      toast.success('Resume exported successfully! 🎉', {
        style: {
          background: '#10B981',
          color: '#fff',
        },
      })
    } catch (error: unknown) {
      console.error('Error exporting resume:', error)
      toast.error('Could not generate PDF. Please try again.', {
        style: {
          background: '#EF4444',
          color: '#fff',
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <motion.div className="relative w-full max-w-md">
        <Button
          className="w-full"
          onClick={handleExport}
          disabled={loading}
        >
          <span className="flex items-center gap-2">
            {loading ? (
              <>
                <motion.div
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <FileIcon className="w-5 h-5" />
                <span>Export as PDF</span>
              </>
            )}
          </span>
        </Button>
        {!loading && (
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-lg blur opacity-30"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        )}
      </motion.div>
    </div>
  )
}
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Export as PDF</span>
              </>
            )}
          </span>
        </motion.button>
        {!loading && (
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-lg blur opacity-30"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        )}
      </motion.div>
      <RadioGroup value={format} onValueChange={setFormat}>
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
          onClick={handleExport}
          disabled={loading}
        >
          {loading ? 'Generating PDF...' : 'Download PDF'}
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