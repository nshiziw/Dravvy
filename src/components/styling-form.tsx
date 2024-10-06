"use client";

import * as React from 'react'
import type { JSX } from 'react'
import { useResumeStore } from "@/store/useResumeStore"
import type { ResumeData } from '@/types/resume'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const serifFonts = [
  { name: "Times New Roman", value: "Times New Roman" },
  { name: "Georgia", value: "Georgia" },
  { name: "Cambria", value: "Cambria" },
  { name: "Garamond", value: "Garamond" },
] as const

const sansSerifFonts = [
  { name: "Calibri", value: "Calibri" },
  { name: "Helvetica", value: "Helvetica" },
  { name: "Arial", value: "Arial" },
  { name: "Roboto", value: "Roboto" },
  { name: "Lato", value: "Lato" },
  { name: "Open Sans", value: "Open Sans" },
] as const

const dateFormats = [
  { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
  { label: "Month DD, YYYY", value: "Month DD, YYYY" },
  { label: "DD Month YYYY", value: "DD Month YYYY" },
] as const

const dividerTypes = [
  { label: "None", value: "none" },
  { label: "Line", value: "line" },
  { label: "Double Line", value: "double-line" },
  { label: "Dashes", value: "dashes" },
] as const

export function StylingForm(): JSX.Element {
  const [previewText, setPreviewText] = React.useState(
    "The quick brown fox jumps over the lazy dog"
  )
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)

  const style = useResumeStore((state: { style: ResumeData['style'] }) => state.style)
  const updateStyle = useResumeStore((state: { updateStyle: (style: ResumeData['style']) => void }) => state.updateStyle)

  const handleSaveStyles = () => {
    setIsSubmitting(true)
    // The styles are already being saved in real-time, but we'll add a success message
    setSubmitSuccess(true)
    setIsSubmitting(false)
    setTimeout(() => setSubmitSuccess(false), 3000)
  }

  const handleStyleUpdate = (update: Partial<ResumeData['style']>) => {
    if (update.theme && !['modern', 'classic', 'minimal'].includes(update.theme)) {
      console.error('Invalid theme selected')
      return
    }
    updateStyle({ ...style, ...update })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Theme Selection */}
        <div className="space-y-2">
          <Label>Theme</Label>
          <Select
            value={style.theme}
            onValueChange={(value: ResumeData['style']['theme']) => handleStyleUpdate({ theme: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <Label>Font Size</Label>
          <Input
            type="number"
            value={style.fontSize}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStyleUpdate({ fontSize: Number(e.target.value) })}
            min={8}
            max={16}
            step={0.5}
          />
        </div>

        {/* Line Spacing */}
        <div className="space-y-2">
          <Label>Line Spacing</Label>
          <Input
            type="number"
            value={style.spacing}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStyleUpdate({ spacing: Number(e.target.value) })}
            min={1}
            max={2}
            step={0.05}
          />
        </div>

        {/* Color */}
        <div className="space-y-2">
          <Label>Accent Color</Label>
          <Input
            type="color"
            value={style.color}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleStyleUpdate({ color: e.target.value })}
          />
        </div>
      </div>

      {submitSuccess && (
        <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg">
          Styles saved successfully!
        </div>
      )}

      <Button
        onClick={handleSaveStyles}
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Saving...' : 'Save Styles'}
      </Button>
    </div>
  )
}
