import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorPosition {
  x: number;
  y: number;
}

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<CursorPosition[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY }];
        return newTrail.slice(-8);
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
          target.closest('a') || target.closest('button') ||
          target.classList.contains('interactive')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => setIsHovering(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Trail effect */}
      {trail.map((pos, index) => (
        <motion.div
          key={index}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: pos.x,
            top: pos.y,
            width: 4 + index,
            height: 4 + index,
          }}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className="w-full h-full rounded-full"
            style={{
              background: `rgba(0, 255, 100, ${0.1 + index * 0.05})`,
              boxShadow: `0 0 ${4 + index * 2}px rgba(0, 255, 100, 0.3)`,
            }}
          />
        </motion.div>
      ))}

      {/* Main cursor - crosshair style */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        {/* Outer ring */}
        <motion.div
          className="absolute rounded-full border-2 border-primary"
          style={{
            width: isHovering ? 50 : 40,
            height: isHovering ? 50 : 40,
            left: '50%',
            top: '50%',
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            rotate: isHovering ? 360 : 0,
            borderColor: isHovering ? '#00ff88' : '#00ff55',
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            borderColor: { duration: 0.2 }
          }}
        />

        {/* Crosshair lines */}
        <div className="absolute w-[2px] h-4 bg-primary left-1/2 -translate-x-1/2 -top-6" 
             style={{ boxShadow: '0 0 10px #00ff55' }} />
        <div className="absolute w-[2px] h-4 bg-primary left-1/2 -translate-x-1/2 top-2" 
             style={{ boxShadow: '0 0 10px #00ff55' }} />
        <div className="absolute w-4 h-[2px] bg-primary top-1/2 -translate-y-1/2 -left-6" 
             style={{ boxShadow: '0 0 10px #00ff55' }} />
        <div className="absolute w-4 h-[2px] bg-primary top-1/2 -translate-y-1/2 left-2" 
             style={{ boxShadow: '0 0 10px #00ff55' }} />

        {/* Center dot */}
        <motion.div
          className="absolute w-2 h-2 bg-primary rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ boxShadow: '0 0 15px #00ff55, 0 0 30px #00ff55' }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />

        {/* Corner brackets */}
        {isHovering && (
          <>
            <div className="absolute -top-3 -left-3 w-3 h-3 border-t-2 border-l-2 border-accent" />
            <div className="absolute -top-3 -right-3 w-3 h-3 border-t-2 border-r-2 border-accent" />
            <div className="absolute -bottom-3 -left-3 w-3 h-3 border-b-2 border-l-2 border-accent" />
            <div className="absolute -bottom-3 -right-3 w-3 h-3 border-b-2 border-r-2 border-accent" />
          </>
        )}
      </motion.div>

      {/* Scanning effect when clicking */}
      {isClicking && (
        <motion.div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 100, height: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full rounded-full border border-primary" 
               style={{ boxShadow: '0 0 20px rgba(0, 255, 85, 0.5)' }} />
        </motion.div>
      )}
    </>
  );
}
