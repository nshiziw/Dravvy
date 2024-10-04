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

  const handleWordExport = async () => {
    try {
      setLoading(true);
      // Word export logic
    } catch (error) {
      console.error('Error generating Word document:', error);
      toast.error('Error generating Word document');
    } finally {
      setLoading(false);
    }
  };

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