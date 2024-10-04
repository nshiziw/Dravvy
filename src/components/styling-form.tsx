"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const serifFonts = [
  { name: "Times New Roman", value: "Times New Roman" },
  { name: "Georgia", value: "Georgia" },
  { name: "Cambria", value: "Cambria" },
  { name: "Garamond", value: "Garamond" },
];

const sansSerifFonts = [
  { name: "Calibri", value: "Calibri" },
  { name: "Helvetica", value: "Helvetica" },
  { name: "Arial", value: "Arial" },
  { name: "Roboto", value: "Roboto" },
  { name: "Lato", value: "Lato" },
  { name: "Open Sans", value: "Open Sans" },
];

const dateFormats = [
  { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
  { label: "Month DD, YYYY", value: "Month DD, YYYY" },
  { label: "DD Month YYYY", value: "DD Month YYYY" },
];

const dividerTypes = [
  { label: "None", value: "none" },
  { label: "Line", value: "line" },
  { label: "Double Line", value: "double-line" },
  { label: "Dashes", value: "dashes" },
];

export function StylingForm() {
  const { styling, updateStyling } = useResumeStore();
  const [previewText, setPreviewText] = useState(
    "The quick brown fox jumps over the lazy dog"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSaveStyles = () => {
    setIsSubmitting(true);
    // The styles are already being saved in real-time, but we'll add a success message
    setSubmitSuccess(true);
    setIsSubmitting(false);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const handleStylingUpdate = (update: Partial<Styling>) => {
    if (update.fontFamily && ![...serifFonts, ...sansSerifFonts].some(font => font.value === update.fontFamily)) {
      console.error('Invalid font family selected');
      return;
    }
    if (update.dateFormat && !dateFormats.some(format => format.value === update.dateFormat)) {
      console.error('Invalid date format selected');
      return;
    }
    updateStyling(update);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Skill Proficiency Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="show-proficiency">Show Skill Proficiency</Label>
          <Switch
            id="show-proficiency"
            checked={styling.showSkillProficiency}
            onCheckedChange={(checked) =>
              updateStyling({ showSkillProficiency: checked })
            }
          />
        </div>

        {/* Show Links Toggle */}
        <div className="flex items-center justify-between">
          <Label htmlFor="show-links">Show Links</Label>
          <Switch
            id="show-links"
            checked={styling.showLinks}
            onCheckedChange={(checked) =>
              updateStyling({ showLinks: checked })
            }
          />
        </div>

        {/* Font Selection */}
        <div className="space-y-2">
          <Label>Font Family</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-gray-500">Serif Fonts</Label>
              <Select
                value={styling.fontFamily}
                onValueChange={(value) => updateStyling({ fontFamily: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a serif font" />
                </SelectTrigger>
                <SelectContent>
                  {serifFonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-gray-500">Sans-Serif Fonts</Label>
              <Select
                value={styling.fontFamily}
                onValueChange={(value) => updateStyling({ fontFamily: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a sans-serif font" />
                </SelectTrigger>
                <SelectContent>
                  {sansSerifFonts.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      {font.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Font Preview */}
          <div className="mt-4 p-4 border rounded-lg">
            <Label className="text-sm text-gray-500 mb-2">Preview</Label>
            <div className="text-lg" style={{ fontFamily: styling.fontFamily }}>
              {previewText}
            </div>
            <Input
              type="text"
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="mt-2"
              placeholder="Type to preview the font"
            />
          </div>
        </div>

        {/* Date Format */}
        <div className="space-y-2">
          <Label>Date Format</Label>
          <Select
            value={styling.dateFormat}
            onValueChange={(value) =>
              updateStyling({ dateFormat: value as any })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select date format" />
            </SelectTrigger>
            <SelectContent>
              {dateFormats.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Section Divider */}
        <div className="space-y-2">
          <Label>Section Divider</Label>
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={styling.sectionDivider.type}
              onValueChange={(value) =>
                updateStyling({
                  sectionDivider: {
                    ...styling.sectionDivider,
                    type: value as any,
                  },
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select divider type" />
              </SelectTrigger>
              <SelectContent>
                {dividerTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={styling.sectionDivider.color}
                onChange={(e) =>
                  updateStyling({
                    sectionDivider: {
                      ...styling.sectionDivider,
                      color: e.target.value,
                    },
                  })
                }
                className="w-12 h-12 p-1"
              />
              <span className="text-sm text-gray-500">Divider Color</span>
            </div>
          </div>
          {/* Divider Preview */}
          <div className="mt-4 p-4 border rounded-lg">
            <Label className="text-sm text-gray-500 mb-2">Preview</Label>
            <div className="h-8 flex items-center justify-center">
              {styling.sectionDivider.type === "none" ? (
                <div className="text-sm text-gray-400">No divider</div>
              ) : styling.sectionDivider.type === "line" ? (
                <div
                  className="w-full h-px"
                  style={{ backgroundColor: styling.sectionDivider.color }}
                />
              ) : styling.sectionDivider.type === "double-line" ? (
                <div className="space-y-1 w-full">
                  <div
                    className="w-full h-px"
                    style={{ backgroundColor: styling.sectionDivider.color }}
                  />
                  <div
                    className="w-full h-px"
                    style={{ backgroundColor: styling.sectionDivider.color }}
                  />
                </div>
              ) : (
                <div className="flex gap-1">
                  {Array(10)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-px"
                        style={{
                          backgroundColor: styling.sectionDivider.color,
                        }}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button
          onClick={handleSaveStyles}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Styles'}
        </Button>
      </div>
      
      {submitSuccess && (
        <p className="text-sm text-green-600 text-center">
          Styles saved successfully! The preview will reflect these changes.
        </p>
      )}
    </div>
  );
}
