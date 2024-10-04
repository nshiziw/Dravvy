'use client'

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { useResumeStore } from '@/store/useResumeStore'
import { Resume } from '@/store/useResumeStore'; // Use existing types

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: '#1F2937',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2px solid #3B82F6',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 12,
    borderBottom: '1px solid #E5E7EB',
    paddingBottom: 4,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 1.5,
  },
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 8,
  },
  bullet: {
    width: 3,
    height: 3,
    backgroundColor: '#3B82F6',
    borderRadius: 1.5,
    marginRight: 8,
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    color: '#374151',
    lineHeight: 1.5,
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  skillTag: {
    backgroundColor: '#EFF6FF',
    borderRadius: 4,
    padding: '4 8',
    marginRight: 8,
    marginBottom: 8,
    color: '#3B82F6',
    fontSize: 11,
  },
  contactInfo: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  contactIcon: {
    width: 12,
    height: 12,
    marginRight: 6,
  },
  contactText: {
    fontSize: 12,
    color: '#4B5563',
  }
})

const formatDate = (date: string) => {
  try {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch (error) {
    console.error('Invalid date format:', error);
    return date;
  }
};

export function ResumePDF() {
  try {
    const resume = useResumeStore.getState().resume;
    const styling = useResumeStore.getState().styling;

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>{resume.contact.name}</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>{resume.contact.email}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>{resume.contact.phone}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>{resume.contact.location}</Text>
            </View>
          </View>

          {resume.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.description}>{resume.summary}</Text>
            </View>
          )}

          {resume.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {resume.experience.map((exp, index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                  <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.itemSubtitle}>
                    {exp.company} • {exp.location}
                  </Text>
                  <Text style={styles.itemSubtitle}>
                    {formatDate(exp.startDate)} - {exp.isPresent ? 'Present' : formatDate(exp.endDate || '')}
                  </Text>
                  {exp.description.map((desc, i) => (
                    <View key={i} style={styles.bulletContainer}>
                      <View style={styles.bullet} />
                      <Text style={styles.bulletText}>{desc}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {resume.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {resume.education.map((edu, index) => (
                <View key={index} style={{ marginBottom: 12 }}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemSubtitle}>
                    {edu.institution} • {edu.location}
                  </Text>
                  <Text style={styles.itemSubtitle}>
                    {formatDate(edu.startDate)} - 
                    {edu.isExpected 
                      ? `Expected ${formatDate(edu.expectedDate || '')}` 
                      : formatDate(edu.endDate || '')}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {resume.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsGrid}>
                {resume.skills.map((skill, index) => (
                  <View key={index} style={styles.skillTag}>
                    <Text>
                      {skill.name}
                      {styling.showSkillProficiency && skill.proficiency 
                        ? ` (${skill.proficiency}%)`
                        : ''}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {resume.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {resume.projects.map((project, index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                  <Text style={styles.itemTitle}>{project.name}</Text>
                  <Text style={styles.description}>{project.description}</Text>
                  <View style={styles.skillsGrid}>
                    {project.technologies.map((tech, i) => (
                      <View key={i} style={styles.skillTag}>
                        <Text>{tech}</Text>
                      </View>
                    ))}
                  </View>
                  {styling.showLinks && (project.githubLink || project.demoLink) && (
                    <Text style={styles.description}>
                      {project.githubLink && `GitHub: ${project.githubLink}`}
                      {project.githubLink && project.demoLink && ' • '}
                      {project.demoLink && `Demo: ${project.demoLink}`}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    );
  } catch (error) {
    console.error('Error generating PDF:', error);
    return null;
  }
}