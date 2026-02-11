import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Github, Lock, Code, Shield, Globe, 
  Database, Server, Eye, Folder, FolderOpen 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Category = 'all' | 'fullstack' | 'security' | 'frontend';

interface Project {
  id: number;
  title: string;
  description: string;
  category: Category;
  tech: string[];
  image?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  securityFocus?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'SecureAuth Dashboard',
    description: 'Dashboard d\'administration avec authentification multi-facteurs, gestion des rôles et audit de sécurité intégré.',
    category: 'fullstack',
    tech: ['React', 'Node.js', 'PostgreSQL', 'JWT', '2FA'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    featured: true,
    securityFocus: true,
  },
  {
    id: 2,
    title: 'VulnScanner Tool',
    description: 'Outil de scan de vulnérabilités web automatisé. Détecte les failles XSS, SQL Injection, CSRF et plus.',
    category: 'security',
    tech: ['Python', 'Burp Suite API', 'OWASP ZAP', 'Docker'],
    github: 'https://github.com',
    featured: true,
    securityFocus: true,
  },
  {
    id: 3,
    title: 'CryptoWallet UI',
    description: 'Interface utilisateur moderne pour une application de portefeuille crypto avec animations fluides.',
    category: 'frontend',
    tech: ['React', 'Framer Motion', 'Tailwind', 'Web3.js'],
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    id: 4,
    title: 'API Gateway Sécurisé',
    description: 'Gateway API avec rate limiting, authentification OAuth2, et logging de sécurité avancé.',
    category: 'fullstack',
    tech: ['Node.js', 'Express', 'Redis', 'OAuth2', 'Winston'],
    github: 'https://github.com',
    securityFocus: true,
  },
  {
    id: 5,
    title: 'Network Monitor',
    description: 'Application de monitoring réseau en temps réel avec détection d\'anomalies et alertes.',
    category: 'security',
    tech: ['Python', 'Scapy', 'React', 'WebSocket', 'InfluxDB'],
    github: 'https://github.com',
    demo: 'https://demo.com',
    securityFocus: true,
  },
  {
    id: 6,
    title: 'Portfolio Terminal',
    description: 'Ce portfolio avec thème hacker, animations cyberpunk et curseur personnalisé.',
    category: 'frontend',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
    github: 'https://github.com',
    featured: true,
  },
];

const categories: { id: Category; label: string; icon: typeof Code }[] = [
  { id: 'all', label: 'Tous', icon: Folder },
  { id: 'fullstack', label: 'Full Stack', icon: Server },
  { id: 'frontend', label: 'Frontend', icon: Globe },
  { id: 'security', label: 'Sécurité', icon: Shield },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="group h-full bg-card/50 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 overflow-hidden interactive relative">
        {/* Security badge */}
        {project.securityFocus && (
          <div className="absolute top-3 right-3 z-10">
            <motion.div
              className="p-1.5 rounded-full bg-primary/20 border border-primary/50"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lock className="w-3 h-3 text-primary" />
            </motion.div>
          </div>
        )}

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2 py-1 text-xs font-mono bg-accent/20 text-accent border border-accent/50 rounded">
              Featured
            </span>
          </div>
        )}

        <CardHeader className="relative">
          {/* Glowing line animation */}
          <motion.div
            className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary"
            initial={{ width: '0%' }}
            animate={{ width: isHovered ? '100%' : '0%' }}
            transition={{ duration: 0.3 }}
            style={{ boxShadow: '0 0 10px var(--primary)' }}
          />

          <CardTitle className="font-mono text-lg flex items-center gap-2 mt-4">
            <Code className="w-5 h-5 text-primary" />
            {project.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-secondary/50 text-muted-foreground rounded border border-primary/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-mono text-muted-foreground hover:text-primary transition-colors rounded border border-primary/20 hover:border-primary/50 interactive"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
                Code
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 text-sm font-mono bg-primary/10 text-primary rounded border border-primary/30 hover:bg-primary/20 transition-colors interactive"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </motion.a>
            )}
          </div>
        </CardContent>

        {/* Hover overlay effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'all' || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 cyber-grid opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block font-mono text-sm text-muted-foreground mb-4">
            <span className="text-primary">$</span> ls -la ./projects/
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary">#</span> Mes Projets
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une sélection de mes projets de développement web et de cybersécurité
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(category.id)}
              className={`font-mono interactive ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'border-primary/30 text-muted-foreground hover:text-primary hover:border-primary/50'
              }`}
            >
              {activeCategory === category.id ? (
                <FolderOpen className="w-4 h-4 mr-2" />
              ) : (
                <category.icon className="w-4 h-4 mr-2" />
              )}
              {category.label}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Terminal-style CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="terminal-box inline-block rounded-lg px-8 py-6 relative">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="font-mono text-left space-y-2">
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> git log --oneline | wc -l
              </p>
              <p className="text-primary text-2xl">500+ commits</p>
              <p className="text-muted-foreground">
                <span className="text-primary">$</span> find . -name "*.tsx" | wc -l
              </p>
              <p className="text-accent text-2xl">150+ composants</p>
            </div>
          </div>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Button
            variant="outline"
            size="lg"
            className="font-mono border-primary/30 text-primary hover:bg-primary/10 interactive"
            onClick={() => window.open('https://github.com', '_blank')}
          >
            <Eye className="w-5 h-5 mr-2" />
            Voir plus sur GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
