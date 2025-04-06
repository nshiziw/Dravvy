'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resumeSchema } from '@/lib/validations/resume'
import { useResumeStore, type Resume } from '@/store/useResumeStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export function ResumeForm() {
  const { resume, updateContact, updateSummary } = useResumeStore()
  const form = useForm<Resume>({
    resolver: zodResolver(resumeSchema),
    defaultValues: resume,
  })

  const onSubmit = (data: Resume) => {
    updateContact(data.contact)
    updateSummary(data.summary)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...form.register('contact.name')}
                placeholder="John Doe"
              />
              {form.formState.errors.contact?.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.contact.name.message?.toString()}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                {...form.register('contact.title')}
                placeholder="Software Engineer"
              />
              {form.formState.errors.contact?.title && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.contact.title.message?.toString()}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register('contact.email')}
                placeholder="john@example.com"
              />
              {form.formState.errors.contact?.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.contact.email.message?.toString()}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...form.register('contact.phone')}
                placeholder="+1 (555) 000-0000"
              />
              {form.formState.errors.contact?.phone && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.contact.phone.message?.toString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Professional Summary</h2>
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
        </div>

        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  )
} 