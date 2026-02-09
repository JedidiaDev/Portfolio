import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Skills.module.css'

// Tech icons as SVG paths
const techIcons = {
  'React': 'M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7.5c-5.523 0-10-4.477-10-10S6.477 1 12 1s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
  'TypeScript': 'M3 3h18v18H3V3zm14.5 10.5h-2.25V17h-1.5v-3.5H11.5v-1.25h6v1.25zm-8 0V17H8v-4.75H5.5V11H12v1.25H9.5v1.25z',
  'Next.js': 'M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 14.5V9L16 16.5h-1.5l-4-5.5v6z',
  'Vue.js': 'M12 2L2 4l10 18L22 4l-10-2zm0 3.5L17.5 16h-11L12 5.5z',
  'CSS/Sass': 'M3 3h18v18H3V3zm15 6H6v2h12V9zm-3 4H6v2h9v-2z',
  'Tailwind': 'M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.48 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35.98 1 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35-.99-1-2.12-2.15-4.59-2.15z',
  'Node.js': 'M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6.63 3.68L12 11.54 5.37 7.86 12 4.18zM5 9.04l6 3.33v6.45L5 15.5V9.04zm8 9.78v-6.45l6-3.33V15.5l-6 3.32z',
  'Express': 'M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z',
  'Python': 'M12 2c-1.67 0-3.22.27-4.5.72C5.1 3.46 4 4.7 4 6.5V9h8v1H5c-2.21 0-4 1.79-4 4v2c0 2.21 1.79 4 4 4h1.5v-3c0-1.93 1.57-3.5 3.5-3.5h6c1.1 0 2-.9 2-2V6.5c0-2.21-1.79-4-4-4h-2zM9.5 5a1 1 0 110 2 1 1 0 010-2zM12 22c1.67 0 3.22-.27 4.5-.72 2.4-.74 3.5-1.98 3.5-3.78V15h-8v-1h7c2.21 0 4-1.79 4-4v-2c0-2.21-1.79-4-4-4h-1.5v3c0 1.93-1.57 3.5-3.5 3.5H8c-1.1 0-2 .9-2 2v4.5c0 2.21 1.79 4 4 4h2zm2.5-3a1 1 0 110-2 1 1 0 010 2z',
  'GraphQL': 'M12.002 2l9.66 5.58v11.16l-9.66 5.58-9.66-5.58V7.58L12.002 2zM12 6.27L6.07 9.7v6.88l5.93 3.43 5.93-3.43V9.7L12 6.27z',
  'REST APIs': 'M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h10v2H4v-2zm12 0h4v2h-4v-2z',
  'WebSocket': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  'MongoDB': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-7c0-.83.67-1.5 1.5-1.5zm0 11c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z',
  'PostgreSQL': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z',
  'Redis': 'M21.95 12.5l-9.7 5.65c-.15.08-.35.08-.5 0l-9.7-5.65c-.3-.15-.3-.55 0-.7l9.7-5.65c.15-.08.35-.08.5 0l9.7 5.65c.3.15.3.55 0 .7z',
  'Firebase': 'M3.89 15.672L6.255 2.867a.342.342 0 01.63-.124l2.487 4.636-5.482 8.293zm17.66 2.666l-2.295-14.22a.343.343 0 00-.586-.172L3.17 18.338l7.663 4.475a1.028 1.028 0 001.03 0l9.687-4.475zm-7.726-9.18l-1.88-3.598L8.17 12.23l5.654-3.072z',
  'MySQL': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z',
  'Prisma': 'M21.807 18.285L13.553.756a1.324 1.324 0 00-1.129-.754 1.31 1.31 0 00-1.206.626l-8.952 14.5a1.356 1.356 0 00.016 1.455l4.376 6.778a1.408 1.408 0 001.58.581l12.703-3.757c.389-.115.707-.39.873-.755s.164-.783-.007-1.145zm-9.688 4.637l-8.728-5.202 11.143-4.696-2.415 9.898z',
  'Git': 'M21.62 11.108l-8.731-8.729a1.292 1.292 0 00-1.823 0L9.257 4.19l2.299 2.3a1.532 1.532 0 011.939 1.95l2.214 2.217a1.53 1.53 0 011.583 2.531 1.534 1.534 0 01-2.119-.019 1.531 1.531 0 01-.335-1.667L12.68 9.343v5.478a1.535 1.535 0 01.404 2.529 1.536 1.536 0 01-2.171-2.171c.127-.127.271-.227.426-.3v-5.53a1.533 1.533 0 01-.833-2.01L8.243 5.062l-5.863 5.86a1.29 1.29 0 000 1.824l8.729 8.729a1.29 1.29 0 001.823 0l8.679-8.679a1.29 1.29 0 00.009-1.688z',
  'Docker': 'M20.81 11.16c-.12-.08-.82-.56-2.39-.56-.42 0-.84.04-1.25.12-.17-1.21-.86-2.27-2.12-3.17l-.44-.32-.33.43c-.41.54-.71 1.14-.87 1.78-.31 1.26-.12 2.44.51 3.45-.76.43-1.99.54-2.34.55H2.18c-.23 0-.43.18-.47.41-.12.69-.12 2.85.72 4.51.66 1.29 1.64 2.25 2.92 2.85 1.43.67 3.76.96 5.59.96 5.3 0 9.22-2.46 11.14-6.94.73.01 2.31.01 3.11-1.55.02-.04.07-.13.21-.38l.08-.15-.44-.29zm-6.82-2.46h-1.77v1.62h1.77V8.7zm0-2.19h-1.77v1.62h1.77V6.51zm0-2.17h-1.77v1.62h1.77V4.34zm-2.35 4.36H9.87v1.62h1.77V8.7zm0-2.19H9.87v1.62h1.77V6.51zm-2.37 2.19H7.5v1.62h1.77V8.7zm-2.35 0H5.15v1.62h1.77V8.7zm4.72 2.17H9.87v1.62h1.77v-1.62z',
  'CI/CD': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  'AWS': 'M18.72 10.48C18.72 10.32 18.96 9.36 18.96 9.12C18.96 6.96 17.52 5.52 15.36 5.52C13.68 5.52 12.24 6.48 11.76 7.92H11.52C11.28 7.2 10.8 6.72 9.84 6.72C8.64 6.72 7.68 7.68 7.68 8.88C7.68 9.36 7.92 9.84 7.92 10.08C6.72 10.56 5.76 11.52 5.76 12.96C5.76 14.88 7.44 16.32 9.36 16.32H17.28C18.96 16.32 20.4 14.88 20.4 13.2C20.4 11.76 19.68 10.8 18.72 10.48Z',
  'Linux': 'M12.503 18.99c-.56.224-1.12.224-1.68 0l-6.16-2.464c-.56-.224-.84-.672-.84-1.12V8.594c0-.448.28-.896.84-1.12l6.16-2.464a2.163 2.163 0 011.68 0l6.16 2.464c.56.224.84.672.84 1.12v6.812c0 .448-.28.896-.84 1.12l-6.16 2.464z',
  'Vercel': 'M12 2L2 19.5h20L12 2z',
  'Kali Linux': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c.55 0 1 .45 1 1v4.59l2.29-2.29a1 1 0 011.41 1.41l-4 4a1 1 0 01-1.41 0l-4-4a1 1 0 011.41-1.41L11 10.59V6c0-.55.45-1 1-1zm-5 10h10v2H7v-2z',
  'Burp Suite': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z',
  'Nmap': 'M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6.63 3.68L12 11.54 5.37 7.86 12 4.18zM5 9.04l6 3.33v6.45L5 15.5V9.04zm8 9.78v-6.45l6-3.33V15.5l-6 3.32z',
  'Wireshark': 'M21.95 12.5l-9.7 5.65c-.15.08-.35.08-.5 0l-9.7-5.65c-.3-.15-.3-.55 0-.7l9.7-5.65c.15-.08.35-.08.5 0l9.7 5.65c.3.15.3.55 0 .7z',
  'Metasploit': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  'OWASP': 'M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.5 4.32v7L12 19.82l-7.5-4.32v-7L12 4.18z'
}

const Skills = () => {
  const containerRef = useRef(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10])

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const skillCategories = [
    {
      title: 'Frontend',
      icon: '🎨',
      color: '#61DAFB',
      skills: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'CSS/Sass', 'Tailwind']
    },
    {
      title: 'Backend',
      icon: '⚙️',
      color: '#68A063',
      skills: ['Node.js', 'Express', 'Python', 'GraphQL', 'REST APIs', 'WebSocket']
    },
    {
      title: 'Base de données',
      icon: '🗄️',
      color: '#336791',
      skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'MySQL', 'Prisma']
    },
    {
      title: 'Sécurité & Hacking',
      icon: '🔐',
      color: '#557C94',
      skills: ['Kali Linux', 'Burp Suite', 'Nmap', 'Wireshark', 'Metasploit', 'OWASP']
    },
    {
      title: 'Outils & DevOps',
      icon: '🛠️',
      color: '#F05032',
      skills: ['Git', 'Docker', 'CI/CD', 'AWS', 'Linux', 'Vercel']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }),
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  }

  const glowVariants = {
    initial: { opacity: 0.5 },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section id="skills" className={`section ${styles.skills}`} ref={containerRef}>
      {/* Animated background text */}
      <motion.div className={styles.backgroundText} style={{ x }}>
        SKILLS • COMPÉTENCES • SKILLS • COMPÉTENCES •
      </motion.div>

      {/* Floating particles */}
      <div className={styles.particles}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * 500,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -200 - 50],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container" ref={ref}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className={styles.sectionLabel}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.span 
              className={styles.labelLine}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            />
            <span>Expertise</span>
          </motion.div>
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Compétences & Technologies
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Les outils et technologies que je maîtrise pour donner vie aux projets
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.grid}
          style={{ rotateY }}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className={styles.skillCard}
              variants={cardVariants}
              onHoverStart={() => setActiveCategory(categoryIndex)}
              onHoverEnd={() => setActiveCategory(null)}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                transition: { duration: 0.3 } 
              }}
              style={{
                '--category-color': category.color
              }}
            >
              {/* Glow effect on hover */}
              <motion.div 
                className={styles.cardGlow}
                initial={{ opacity: 0 }}
                animate={{ opacity: activeCategory === categoryIndex ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className={styles.cardHeader}>
                <motion.span 
                  className={styles.categoryIcon}
                  animate={activeCategory === categoryIndex ? {
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.2, 1]
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {category.icon}
                </motion.span>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <motion.div 
                  className={styles.headerLine}
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: categoryIndex * 0.2 + 0.5, duration: 0.6 }}
                />
              </div>

              <div className={styles.skillsList}>
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    className={styles.skillItem}
                    custom={categoryIndex * 6 + skillIndex}
                    variants={skillVariants}
                    whileHover="hover"
                    onHoverStart={() => setHoveredSkill(skill)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    <motion.div 
                      className={styles.skillIcon}
                      animate={hoveredSkill === skill ? {
                        rotate: 360,
                        scale: 1.1
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d={techIcons[skill] || techIcons['React']} />
                      </svg>
                    </motion.div>
                    <span className={styles.skillName}>{skill}</span>
                    
                    {/* Skill tooltip */}
                    <AnimatePresence>
                      {hoveredSkill === skill && (
                        <motion.div
                          className={styles.skillTooltip}
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span>{skill}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional skills badges */}
        <motion.div
          className={styles.additionalSkills}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.h3
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.5 }}
          >
            Autres compétences
          </motion.h3>
          <div className={styles.badges}>
            {[
              'Framer Motion', 'Three.js', 'Jest', 'Cypress', 'Figma', 
              'Adobe XD', 'Jira', 'Notion', 'Slack', 'Agile/Scrum'
            ].map((skill, index) => (
              <motion.span
                key={skill}
                className={styles.badge}
                initial={{ opacity: 0, scale: 0, rotate: -10 }}
                animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ 
                  delay: 1 + index * 0.08,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.15,
                  rotate: [0, -5, 5, 0],
                  backgroundColor: 'rgba(99, 102, 241, 0.25)',
                  borderColor: 'var(--accent-primary)',
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background glows with animation */}
      <motion.div 
        className={`glow ${styles.glow1}`}
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div 
        className={`glow ${styles.glow2}`}
        variants={glowVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1.5 }}
      />
    </section>
  )
}

export default Skills
