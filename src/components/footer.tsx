import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Terminal, Heart, Instagram } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Email', icon: Mail, href: 'mailto:contact@example.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-primary/20 bg-background/50 backdrop-blur-sm">
      {/* Terminal-style decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-primary font-mono">
              <Terminal className="w-5 h-5" />
              <span>root@portfolio:~$</span>
            </div>
            <p className="text-muted-foreground text-sm font-mono">
              # Full Stack Developer & Ethical Hacker<br />
              # Building secure & innovative solutions
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-primary font-mono text-sm">
              <span className="text-muted-foreground">cat</span> ./navigation.txt
            </h3>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm">
              {['Accueil', 'À propos', 'Projets', 'Contact'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase().replace('à propos', 'about')}`}
                  className="text-muted-foreground hover:text-primary transition-colors interactive"
                >
                  <span className="text-primary/50">→</span> {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-primary font-mono text-sm">
              <span className="text-muted-foreground">ls</span> ./social/
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all interactive"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-primary/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-mono">
            <div className="text-muted-foreground">
              <span className="text-primary">$</span> echo "© {currentYear} Portfolio. 
              <span className="text-primary/70"> Tous droits réservés.</span>"
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              Fait avec <Heart className="w-4 h-4 text-red-500 mx-1 animate-pulse" /> et
              <span className="text-primary ml-1">beaucoup de café</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
    </footer>
  );
}
