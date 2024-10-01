'use client'

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { useResumeStore } from '@/store/useResumeStore'

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 5,
  },
  header: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  }
})



interface Experience {
  jobTitle: string
  company: string
  location: string
}

interface Contact {
  name: string
  email: string
  phone: string
  location: string
}

interface Resume {
  contact: Contact
  summary?: string
  experience?: Experience[]
}

export function ResumePDF() {
  try {
    const resume = useResumeStore.getState().resume as Resume

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>{resume.contact.name}</Text>
            <Text style={styles.text}>{resume.contact.email}</Text>
            <Text style={styles.text}>{resume.contact.phone}</Text>
            <Text style={styles.text}>{resume.contact.location}</Text>
          </View>

          {resume.summary && (
            <View style={styles.section}>
              <Text style={styles.title}>Summary</Text>
              <Text style={styles.text}>{resume.summary}</Text>
            </View>
          )}

          {resume.experience && resume.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.title}>Experience</Text>
              {resume.experience.map((exp, index) => (
                <View key={index} style={styles.section}>
                  <Text style={styles.text}>{exp.jobTitle}</Text>
                  <Text style={styles.text}>{exp.company}</Text>
                  <Text style={styles.text}>{exp.location}</Text>
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    )
  } catch (error) {
    console.error('Error in ResumePDF:', error)
    return null
  }
}