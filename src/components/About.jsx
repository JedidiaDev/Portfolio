import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './About.module.css'

const About = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50])

  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const stats = [
    { number: '3+', label: 'Années d\'expérience' },
    { number: '50+', label: 'Projets réalisés' },
    { number: '30+', label: 'Clients satisfaits' },
    { number: '10+', label: 'Technologies maîtrisées' }
  ]

  return (
    <section id="about" className={`section ${styles.about}`} ref={containerRef}>
      <div className="container">
        <motion.div
          ref={ref}
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Image Section */}
          <motion.div className={styles.imageSection} style={{ y: imageY }}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageBorder} />
              <div className={styles.image}>
                <div className={styles.placeholder}>
                  <span>👨‍💻</span>
                </div>
              </div>
              <motion.div 
                className={styles.floatingCard}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <span className={styles.cardIcon}>🚀</span>
                <span className={styles.cardText}>Passionné par le code</span>
              </motion.div>
              <motion.div 
                className={`${styles.floatingCard} ${styles.floatingCardRight}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <span className={styles.cardIcon}>🔐</span>
                <span className={styles.cardText}>Ethical Hacker</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div className={styles.textSection} style={{ y: textY }}>
            <motion.div className={styles.sectionLabel} variants={itemVariants}>
              <span className={styles.labelLine} />
              <span>À propos de moi</span>
            </motion.div>

            <motion.h2 className="section-title" variants={itemVariants}>
              Je transforme les idées en expériences digitales
            </motion.h2>

            <motion.div className={styles.description} variants={itemVariants}>
              <p>
                Développeur Full-Stack passionné avec plus de 3 ans d'expérience 
                dans la création d'applications web modernes et performantes.
              </p>
              <p>
                Apprenti Ethical Hacker, je m'intéresse également à la cybersécurité 
                et au pentesting. Mon système préféré est <span className={styles.highlight}>Kali Linux</span>, 
                que j'utilise pour mes recherches en sécurité.
              </p>
              <p>
                Je me spécialise dans la construction d'interfaces utilisateur 
                élégantes et intuitives, tout en développant des architectures 
                backend robustes et sécurisées.
              </p>
              <p>
                Mon approche combine <span className={styles.highlight}>créativité</span>, 
                <span className={styles.highlight}> sécurité</span> et 
                <span className={styles.highlight}> attention aux détails</span> pour 
                livrer des produits qui dépassent les attentes.
              </p>
            </motion.div>

            <motion.div className={styles.techStack} variants={itemVariants}>
              <h3>Technologies que j'utilise :</h3>
              <div className={styles.techList}>
                {['React', 'Node.js', 'TypeScript', 'Next.js', 'MongoDB', 'PostgreSQL'].map((tech) => (
                  <motion.span 
                    key={tech} 
                    className={styles.techItem}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className={styles.techArrow}>▸</span>
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className={styles.stats}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.statItem}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className={`glow ${styles.glow1}`} />
      <div className={`glow ${styles.glow2}`} />
    </section>
  )
}

export default About
