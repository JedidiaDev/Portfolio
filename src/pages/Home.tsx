import { motion } from 'framer-motion';
import { ChevronDown, Code, Shield, Terminal, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlitchText } from '@/components/GlitchText';
import { TypingEffect } from '@/components/TypingEffect';

const roles = [
  'Développeur Full Stack',
  'Apprenti Hacker Éthique',
  'Passionné de Cybersécurité',
  'Créateur de Solutions Sécurisées',
];

const stats = [
  { icon: Code, label: 'Projets', value: '05+' },
  { icon: Shield, label: 'Audits Sécurité', value: '05+' },
  { icon: Zap, label: 'Technologies', value: '15+' },
];

export function Home() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 cyber-grid" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-6 pt-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Terminal header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-8"
          >
            <div className="terminal-box rounded-lg px-6 py-3 relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-muted-foreground text-sm font-mono ml-4">
                  ~/portfolio/intro.sh
                </span>
              </div>
              <div className="text-left font-mono text-sm">
                <span className="text-primary">$</span>
                <span className="text-muted-foreground"> whoami</span>
              </div>
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-muted-foreground">Salut, je suis</span>
              <br />
              <GlitchText
                text="Jedidia Kamdem Souop"
                className="text-primary neon-glow"
                as="span"
              />
            </h1>
          </motion.div>

          {/* Typing effect for roles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl font-mono mb-8 h-12"
          >
            <TypingEffect texts={roles} className="text-accent" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12"
          >
            Je construis des applications web sécurisées et performantes, 
            tout en explorant les profondeurs de la cybersécurité.
            <span className="text-primary"> Hack the planet!</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 interactive"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Terminal className="w-5 h-5 mr-2" />
              Voir mes projets
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 interactive"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Shield className="w-5 h-5 mr-2" />
              Me contacter
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors interactive"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-xs font-mono mb-2">scroll_down</span>
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative floating elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </section>
  );
}
