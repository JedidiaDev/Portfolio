import { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Contact.module.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState('idle') // idle, sending, success, error
  const [focusedField, setFocusedField] = useState(null)

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStatus('success')
    setFormData({ name: '', email: '', subject: '', message: '' })

    setTimeout(() => setStatus('idle'), 3000)
  }

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'contact@example.com',
      href: 'mailto:contact@example.com'
    },
    {
      icon: '📍',
      label: 'Localisation',
      value: 'Paris, France',
      href: null
    },
    {
      icon: '📱',
      label: 'Téléphone',
      value: '+33 6 XX XX XX XX',
      href: 'tel:+33600000000'
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section id="contact" className={`section ${styles.contact}`} ref={containerRef}>
      <div className="container" ref={ref}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span>Contact</span>
          </div>
          <h2 className="section-title">Travaillons ensemble</h2>
          <p className="section-subtitle">
            Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter.
          </p>
        </motion.div>

        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Contact Info */}
          <motion.div className={styles.infoSection} style={{ y }}>
            <motion.h3 className={styles.infoTitle} variants={itemVariants}>
              Prenons contact
            </motion.h3>
            
            <motion.p className={styles.infoText} variants={itemVariants}>
              Je suis actuellement disponible pour des projets freelance et des opportunités 
              de collaboration. N'hésitez pas à me contacter !
            </motion.p>

            <motion.div className={styles.contactList} variants={itemVariants}>
              {contactInfo.map((item) => (
                <motion.div
                  key={item.label}
                  className={styles.contactItem}
                  whileHover={{ x: 10 }}
                >
                  <span className={styles.contactIcon}>{item.icon}</span>
                  <div>
                    <span className={styles.contactLabel}>{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className={styles.contactValue}>
                        {item.value}
                      </a>
                    ) : (
                      <span className={styles.contactValue}>{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div className={styles.socials} variants={itemVariants}>
              <h4>Suivez-moi</h4>
              <div className={styles.socialLinks}>
                {[
                  { name: 'GitHub', url: 'https://github.com', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
                  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                  { name: 'Instagram', url: 'https://instagram.com', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                  { name: 'Twitter', url: 'https://twitter.com', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className={styles.formSection} variants={itemVariants}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={`${styles.inputGroup} ${focusedField === 'name' || formData.name ? styles.focused : ''}`}>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <label htmlFor="name">Nom complet</label>
                  <motion.span 
                    className={styles.inputBorder}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'name' ? 1 : 0 }}
                  />
                </div>

                <div className={`${styles.inputGroup} ${focusedField === 'email' || formData.email ? styles.focused : ''}`}>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <label htmlFor="email">Email</label>
                  <motion.span 
                    className={styles.inputBorder}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: focusedField === 'email' ? 1 : 0 }}
                  />
                </div>
              </div>

              <div className={`${styles.inputGroup} ${focusedField === 'subject' || formData.subject ? styles.focused : ''}`}>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <label htmlFor="subject">Sujet</label>
                <motion.span 
                  className={styles.inputBorder}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'subject' ? 1 : 0 }}
                />
              </div>

              <div className={`${styles.inputGroup} ${styles.textareaGroup} ${focusedField === 'message' || formData.message ? styles.focused : ''}`}>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows="5"
                  required
                />
                <label htmlFor="message">Message</label>
                <motion.span 
                  className={styles.inputBorder}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focusedField === 'message' ? 1 : 0 }}
                />
              </div>

              <motion.button
                type="submit"
                className={`magnetic-btn ${styles.submitBtn}`}
                disabled={status === 'sending'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'idle' && (
                  <>
                    <span>Envoyer le message</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"/>
                    </svg>
                  </>
                )}
                {status === 'sending' && (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className={styles.spinner}
                  >
                    ⏳
                  </motion.span>
                )}
                {status === 'success' && (
                  <>
                    <span>Message envoyé !</span>
                    <span>✓</span>
                  </>
                )}
                {status === 'error' && (
                  <>
                    <span>Erreur, réessayez</span>
                    <span>✗</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className={`glow ${styles.glow}`} />
    </section>
  )
}

export default Contact
