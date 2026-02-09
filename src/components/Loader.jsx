import { motion } from 'framer-motion'
import styles from './Loader.module.css'

const Loader = () => {
  const containerVariants = {
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }

  const letterVariants = {
    initial: { y: 100, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    })
  }

  const name = "Portfolio"

  return (
    <motion.div 
      className={styles.loader}
      variants={containerVariants}
      exit="exit"
    >
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          {name.split('').map((letter, i) => (
            <motion.span
              key={i}
              className={styles.letter}
              variants={letterVariants}
              initial="initial"
              animate="animate"
              custom={i}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.div 
          className={styles.progressBar}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        />
        <motion.p 
          className={styles.loadingText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Chargement...
        </motion.p>
      </div>
      
      {/* Background particles */}
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.particle}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, Math.random() * -100],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default Loader
