import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function GlitchText({ text, className = '', as: Component = 'span' }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        
        let iterations = 0;
        const maxIterations = 10;
        
        const scrambleInterval = setInterval(() => {
          setDisplayText(
            text
              .split('')
              .map((char, index) => {
                if (index < iterations) return text[index];
                if (char === ' ') return ' ';
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              })
              .join('')
          );
          
          iterations++;
          if (iterations > maxIterations) {
            clearInterval(scrambleInterval);
            setDisplayText(text);
            setIsGlitching(false);
          }
        }, 30);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      animate={isGlitching ? {
        x: [0, -2, 2, -2, 0],
        textShadow: [
          '0 0 0 transparent',
          '-2px 0 #ff0000, 2px 0 #00ffff',
          '2px 0 #ff0000, -2px 0 #00ffff',
          '-2px 0 #ff0000, 2px 0 #00ffff',
          '0 0 0 transparent',
        ],
      } : {}}
      transition={{ duration: 0.2 }}
    >
      <Component className="relative">
        {displayText}
        {isGlitching && (
          <>
            <span 
              className="absolute top-0 left-0 text-red-500 opacity-70"
              style={{ clipPath: 'inset(40% 0 0 0)', transform: 'translate(-2px, 2px)' }}
            >
              {displayText}
            </span>
            <span 
              className="absolute top-0 left-0 text-cyan-400 opacity-70"
              style={{ clipPath: 'inset(0 0 60% 0)', transform: 'translate(2px, -2px)' }}
            >
              {displayText}
            </span>
          </>
        )}
      </Component>
    </motion.span>
  );
}
