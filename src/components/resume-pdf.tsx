'use client'

// @ts-ignore
import { StyleSheet, Document, Page, View, Text } from '@react-pdf/renderer'
import { useResumeStore } from '@/store/useResumeStore'
import type { ResumeData, Experience, Education, Skill, Project } from '@/types/resume'

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
    const contact = useResumeStore.getState().contact;
    const summary = useResumeStore.getState().summary;
    const experience = useResumeStore.getState().experience;
    const education = useResumeStore.getState().education;
    const skills = useResumeStore.getState().skills;
    const projects = useResumeStore.getState().projects;
    const styling = useResumeStore.getState().style;

    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.title}>{contact.fullName}</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>{contact.email}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>{contact.phone}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactText}>{contact.location}</Text>
            </View>
          </View>

          {summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.description}>{summary}</Text>
            </View>
          )}

          {experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {experience.map((exp: Experience, index: number) => (
                <View key={exp.id} style={{ marginBottom: 15 }}>
                  <Text style={styles.itemTitle}>{exp.position}</Text>
                  <Text style={styles.itemSubtitle}>
                    {exp.company}
                  </Text>
                  <Text style={styles.itemSubtitle}>
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </Text>
                  {exp.description.map((desc: string, i: number) => (
                    <View key={i} style={styles.bulletContainer}>
                      <View style={styles.bullet} />
                      <Text style={styles.bulletText}>{desc}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu: Education, index: number) => (
                <View key={edu.id} style={{ marginBottom: 12 }}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemSubtitle}>
                    {edu.school} • {edu.field}
                  </Text>
                  <Text style={styles.itemSubtitle}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsGrid}>
                {skills.map((skill: Skill, index: number) => (
                  <View key={skill.id} style={styles.skillTag}>
                    <Text style={styles.itemTitle}>{skill.category}</Text>
                    <Text>{skill.skills.join(', ')}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((project: Project, index: number) => (
                <View key={project.id} style={{ marginBottom: 15 }}>
                  <Text style={styles.itemTitle}>{project.name}</Text>
                  {project.description.map((desc: string, i: number) => (
                    <Text key={i} style={styles.description}>{desc}</Text>
                  ))}
                  <View style={styles.skillsGrid}>
                    {project.technologies.map((tech: string, i: number) => (
                      <View key={i} style={styles.skillTag}>
                        <Text>{tech}</Text>
                      </View>
                    ))}
                  </View>
                  {project.link && (
                    <Text style={styles.description}>
                      Link: {project.link}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    )
  } catch (error) {
    console.error('Error rendering PDF:', error);
    return null;
  }
}