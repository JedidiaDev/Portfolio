import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import styles from './CustomCursor.module.css'

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsHidden(false)
    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleHoverStart = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = (e) => {
      if (e.target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleHoverStart)
    document.addEventListener('mouseout', handleHoverEnd)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
    }
  }, [cursorX, cursorY])

  // Hide on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null
  }

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className={styles.cursorDot}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isHidden ? 0 : 1,
          scale: isClicking ? 0.5 : isHovering ? 2 : 1,
        }}
      />
      
      {/* Cursor ring */}
      <motion.div
        className={styles.cursorRing}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isHidden ? 0 : 1,
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
      />
    </>
  )
}

export default CustomCursor
