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
import { PDFDownloadLink } from '@react-pdf/renderer'
import { ResumePDF } from './resume-pdf'
import { FileIcon, FileTextIcon } from 'lucide-react'

export function ExportForm() {
  const hydrated = useHydration()
  const [format, setFormat] = useState<'pdf' | 'docx'>('pdf')
  const { resume } = useResumeStore()

  if (!hydrated) {
    return null
  }

  const handleWordExport = async () => {
    try {
      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: resume.contact.name,
                heading: 'Title'
              }),
              new Paragraph({
                text: resume.contact.email
              }),
              // Add more sections here
            ]
          }
        ]
      })

      const blob = await Packer.toBlob(doc)
      saveAs(blob, 'resume.docx')
      toast.success('Word document exported successfully!')
    } catch (error) {
      console.error('Error exporting Word document:', error)
      toast.error('Failed to export Word document')
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
        <PDFDownloadLink
          document={<ResumePDF />}
          fileName="resume.pdf"
          className="w-full"
        >
          {({ loading }) => (
            <Button className="w-full" disabled={loading}>
              {loading ? 'Generating PDF...' : 'Download PDF'}
            </Button>
          )}
        </PDFDownloadLink>
      ) : (
        <Button
          className="w-full"
          onClick={handleWordExport}
        >
          Download Word
        </Button>
      )}
    </div>
  )
} 