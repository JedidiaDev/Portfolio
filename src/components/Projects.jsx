import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Projects.module.css'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredProject, setHoveredProject] = useState(null)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Plateforme e-commerce complète avec panier, paiement et gestion des commandes.',
      image: '🛒',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Tableau de bord interactif pour la visualisation de données en temps réel.',
      image: '📊',
      tags: ['Next.js', 'D3.js', 'PostgreSQL', 'Chart.js'],
      category: 'frontend',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    {
      id: 3,
      title: 'API REST Microservices',
      description: 'Architecture microservices avec authentification JWT et documentation Swagger.',
      image: '⚡',
      tags: ['Node.js', 'Express', 'Docker', 'Redis'],
      category: 'backend',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true
    },
    {
      id: 4,
      title: 'Application Mobile',
      description: 'App cross-platform pour la gestion de tâches avec sync cloud.',
      image: '📱',
      tags: ['React Native', 'Firebase', 'Redux'],
      category: 'mobile',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false
    },
    {
      id: 5,
      title: 'Portfolio Créatif',
      description: 'Site portfolio avec animations avancées et design moderne.',
      image: '🎨',
      tags: ['React', 'Framer Motion', 'Three.js'],
      category: 'frontend',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false
    },
    {
      id: 6,
      title: 'Chat Application',
      description: 'Application de chat temps réel avec WebSocket.',
      image: '💬',
      tags: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      category: 'fullstack',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false
    }
  ]

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'mobile', label: 'Mobile' }
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  return (
    <section id="projects" className={`section ${styles.projects}`} ref={containerRef}>
      <motion.div 
        className={styles.backgroundDecor}
        style={{ y: backgroundY }}
      />

      <div className="container" ref={ref}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span>Portfolio</span>
          </div>
          <h2 className="section-title">Projets récents</h2>
          <p className="section-subtitle">
            Une sélection de projets sur lesquels j'ai travaillé récemment
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              className={`${styles.filterBtn} ${activeFilter === filter.id ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                className={`${styles.projectCard} ${project.featured ? styles.featured : ''}`}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{ y: -10 }}
              >
                <div className={styles.cardContent}>
                  <div className={styles.projectImage}>
                    <span className={styles.projectEmoji}>{project.image}</span>
                    <motion.div 
                      className={styles.imageOverlay}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    >
                      <div className={styles.overlayLinks}>
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="GitHub"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                        </motion.a>
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          aria-label="Live Demo"
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                          </svg>
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>

                  <div className={styles.projectInfo}>
                    <div className={styles.projectCategory}>{project.category}</div>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    
                    <div className={styles.projectTags}>
                      {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          className={styles.viewAll}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir plus sur GitHub
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
