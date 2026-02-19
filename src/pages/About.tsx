import { motion } from 'framer-motion';
import { 
  Code2, Database, Globe, Lock, Server, Shield, 
  Terminal, Wifi, Bug, Eye, Cpu, FileCode 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiPostgresql, SiDocker, SiKalilinux, SiVite, SiSpring, SiLaravel,
  SiOwasp, SiBurpsuite, SiWireshark
} from 'react-icons/si';
import { TbRadar } from 'react-icons/tb';
import type { IconType } from 'react-icons';

const skills = {
  frontend: [
    { name: 'React', icon: SiReact },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'Vite.js', icon: SiVite },
  ],
  backend: [
    // { name: 'Java', icon: SiOpenjdk },
    { name: 'Spring', icon: SiSpring },
    { name: 'Node.js', icon: SiNodedotjs },
    { name: 'Laravel', icon: SiLaravel },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'Docker', icon: SiDocker },
  ],
  security: [
    { name: 'Pentesting', icon: SiKalilinux },
    { name: 'OWASP', icon: SiOwasp },
    { name: 'Burp Suite', icon: SiBurpsuite },
    { name: 'Nmap', icon: TbRadar },
    { name: 'Wireshark', icon: SiWireshark },
  ],
};

const techIcons = [
  { icon: Code2, label: 'Frontend' },
  { icon: Server, label: 'Backend' },
  { icon: Database, label: 'Base de données' },
  { icon: Shield, label: 'Sécurité' },
  { icon: Globe, label: 'Web' },
  { icon: Terminal, label: 'CLI' },
  { icon: Lock, label: 'Cryptographie' },
  { icon: Wifi, label: 'Réseau' },
  { icon: Bug, label: 'Bug Bounty' },
  { icon: Eye, label: 'Pentest' },
  { icon: Cpu, label: 'Systèmes' },
  { icon: FileCode, label: 'Scripts' },
];

const timeline = [
  {
    year: '2025',
    title: 'Apprenti Hacker Éthique',
    description: 'Début de ma formation en cybersécurité et ethical hacking',
  },
  {
    year: '2024',
    title: 'Développeur Full Stack',
    description: 'Maîtrise des technologies modernes du web',
  },
  {
    year: '2023',
    title: 'Premiers Projets',
    description: 'Création de mes premières applications web',
  },
];

function SkillIcon({ name, icon: Icon, delay }: { name: string; icon: IconType; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.1, y: -5 }}
      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary/30 border border-primary/20 hover:border-primary/50 transition-all group cursor-pointer"
    >
      <Icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
      <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">{name}</span>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block font-mono text-sm text-muted-foreground mb-4">
            <span className="text-primary">$</span> cat ./about_me.md
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary">#</span> À propos de moi
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Développeur passionné par la création d'expériences web uniques 
            et la découverte des failles de sécurité
          </p>
        </motion.div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="terminal-box relative overflow-hidden">
              <CardHeader>
                <CardTitle className="font-mono text-primary flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  ./bio.sh
                </CardTitle>
              </CardHeader>
              <CardContent className="font-mono text-sm space-y-4">
                <p className="text-muted-foreground">
                  <span className="text-primary">{">"}</span> Je suis un développeur Full Stack
                  passionné par la technologie et la cybersécurité. Mon objectif est de créer
                  des applications web innovantes tout en garantissant leur sécurité.
                </p>
                <p className="text-muted-foreground">
                  <span className="text-primary">{">"}</span> En parallèle de mon activité de
                  développeur, je me forme activement à l'ethical hacking et au pentesting.
                  J'aime comprendre comment fonctionnent les systèmes pour mieux les protéger.
                </p>
                <p className="text-muted-foreground">
                  <span className="text-primary">{">"}</span> Ma devise : "La sécurité n'est pas
                  une option, c'est une nécessité."
                </p>
              </CardContent>
            </Card>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="font-mono text-lg text-primary">
                <span className="text-muted-foreground">$</span> history | tail -3
              </h3>
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div className="flex-shrink-0 w-16 text-primary font-mono font-bold">
                    {item.year}
                  </div>
                  <div className="flex-1 pb-4 border-l-2 border-primary/30 pl-4 relative">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full" 
                         style={{ boxShadow: '0 0 10px var(--primary)' }} />
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Frontend Skills */}
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle className="font-mono text-base flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {skills.frontend.map((skill, index) => (
                    <SkillIcon 
                      key={skill.name} 
                      name={skill.name} 
                      icon={skill.icon} 
                      delay={index * 0.1} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Backend Skills */}
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle className="font-mono text-base flex items-center gap-2">
                  <Server className="w-5 h-5 text-primary" />
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {skills.backend.map((skill, index) => (
                    <SkillIcon 
                      key={skill.name} 
                      name={skill.name} 
                      icon={skill.icon} 
                      delay={index * 0.1} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Skills */}
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <CardTitle className="font-mono text-base flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {skills.security.map((skill, index) => (
                    <SkillIcon 
                      key={skill.name} 
                      name={skill.name} 
                      icon={skill.icon} 
                      delay={index * 0.1} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tech Icons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="font-mono text-lg text-primary mb-8">
            <span className="text-muted-foreground">$</span> ls ./technologies/
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {techIcons.map((tech, index) => (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="p-4 rounded-lg bg-secondary/30 border border-primary/20 hover:border-primary/50 transition-colors interactive group"
              >
                <tech.icon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="text-xs mt-2 text-muted-foreground font-mono">{tech.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
