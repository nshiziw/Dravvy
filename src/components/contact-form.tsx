'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useResumeStore } from '@/store/useResumeStore'
import type { ContactInfo } from '@/types/resume'

export function ContactForm() {
  const contact = useResumeStore((state: { contact: ContactInfo }) => state.contact)
  const updateContact = useResumeStore((state: { updateContact: (contact: ContactInfo) => void }) => state.updateContact)

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          value={contact.fullName}
          onChange={(e) => updateContact({ ...contact, fullName: e.target.value })}
          placeholder="John Doe"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={contact.email}
          onChange={(e) => updateContact({ ...contact, email: e.target.value })}
          placeholder="john@example.com"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={contact.phone}
          onChange={(e) => updateContact({ ...contact, phone: e.target.value })}
          placeholder="+1 (555) 123-4567"
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          type="text"
          value={contact.location}
          onChange={(e) => updateContact({ ...contact, location: e.target.value })}
          placeholder="City, State"
        />
      </div>
    </div>
  )
} 