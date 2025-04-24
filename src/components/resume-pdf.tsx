'use client'

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'
import { useResumeStore } from '@/store/useResumeStore'
import { useHydration } from '@/hooks/useHydration'

// Register fonts with local files
Font.register({
  family: 'Arial',
  fonts: [
    {
      src: '/fonts/arial.ttf',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/arialbd.ttf',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/ariali.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
})

Font.register({
  family: 'Times New Roman',
  fonts: [
    {
      src: '/fonts/times.ttf',
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/timesbd.ttf',
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      src: '/fonts/timesi.ttf',
      fontWeight: 'normal',
      fontStyle: 'italic',
    },
  ],
})

// Fallback system font
Font.register({
  family: 'Fallback',
  src: 'https://fonts.cdnfonts.com/s/29107/ARIAL.woff',
})

// A4 size in points (72 points per inch)
const A4_WIDTH = 595.28
const A4_HEIGHT = 841.89
const MARGIN = 40

const styles = StyleSheet.create({
  page: {
    padding: MARGIN,
    fontFamily: 'Arial',
    width: A4_WIDTH,
    height: A4_HEIGHT,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contact: {
    fontSize: 10,
    color: '#4B5563',
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 4,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#4B5563',
  },
  description: {
    fontSize: 10,
    marginTop: 4,
    color: '#4B5563',
  },
  bullet: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#EFF6FF',
    padding: '4 8',
    borderRadius: 4,
    color: '#1D4ED8',
  },
})

export function ResumePDF() {
  const hydrated = useHydration()
  const store = useResumeStore.getState()

  if (!hydrated) {
    return null
  }

  const { resume, styling } = store

  const fontFamily = styling.fontFamily === 'Times New Roman' ? 'Times New Roman' : 'Arial'

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

  return (
    <Document>
      <Page size="A4" style={[styles.page, { fontFamily }]}>
        {/* Header/Contact Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.contact.name}</Text>
          <Text style={styles.contact}>
            {resume.contact.email} • {resume.contact.phone} • {resume.contact.location}
          </Text>
          {resume.contact.linkedin && (
            <Text style={styles.contact}>
              LinkedIn: {resume.contact.linkedin}
            </Text>
          )}
          {(resume.contact.github || resume.contact.website) && (
            <Text style={styles.contact}>
              {resume.contact.github && `GitHub: ${resume.contact.github}`}
              {resume.contact.github && resume.contact.website && ' • '}
              {resume.contact.website && `Portfolio: ${resume.contact.website}`}
            </Text>
          )}
        </View>

        {/* Summary Section */}
        {resume.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>{resume.summary}</Text>
          </View>
        )}

        {/* Experience Section */}
        {resume.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {resume.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                <Text style={styles.itemSubtitle}>
                  {exp.company} • {exp.location}
                </Text>
                <Text style={styles.itemSubtitle}>
                  {formatDate(exp.startDate)} - {exp.isPresent ? 'Present' : formatDate(exp.endDate)}
                </Text>
                {exp.description.map((desc, i) => (
                  <View key={i} style={styles.bullet}>
                    <Text style={styles.bulletPoint}>•</Text>
                    <Text style={styles.bulletText}>{desc}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {resume.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resume.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.itemTitle}>{edu.degree}</Text>
                <Text style={styles.itemSubtitle}>
                  {edu.institution} • {edu.location}
                </Text>
                <Text style={styles.itemSubtitle}>
                  {formatDate(edu.startDate)} - {edu.isExpected ? `Expected ${formatDate(edu.expectedDate)}` : formatDate(edu.endDate)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {resume.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsGrid}>
              {resume.skills.map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill.name} {styling.showSkillProficiency && skill.proficiency ? `(${skill.proficiency}%)` : ''}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Projects Section */}
        {resume.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resume.projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.itemTitle}>{project.name}</Text>
                <Text style={styles.description}>{project.description}</Text>
                <View style={[styles.skillsGrid, { marginTop: 4 }]}>
                  {project.technologies.map((tech, i) => (
                    <Text key={i} style={styles.skill}>{tech}</Text>
                  ))}
                </View>
                {styling.showLinks && (
                  <Text style={[styles.description, { marginTop: 4 }]}>
                    {project.githubLink && `GitHub: ${project.githubLink}`}
                    {project.githubLink && project.demoLink && ' • '}
                    {project.demoLink && `Demo: ${project.demoLink}`}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications Section */}
        {resume.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {resume.certifications.map((cert, index) => (
              <View key={index} style={{ marginBottom: 6 }}>
                <Text style={styles.itemTitle}>{cert.title}</Text>
                <Text style={styles.itemSubtitle}>
                  {cert.issuer} • {formatDate(cert.issueDate)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Awards Section */}
        {resume.awards.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards</Text>
            {resume.awards.map((award, index) => (
              <View key={index} style={{ marginBottom: 6 }}>
                <Text style={styles.itemTitle}>{award.title}</Text>
                <Text style={styles.itemSubtitle}>
                  {award.institution} • {formatDate(award.date)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  )
} 