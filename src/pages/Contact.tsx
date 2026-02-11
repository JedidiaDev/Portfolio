import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  Send, Mail, MapPin, Phone, Github, Linkedin, 
  Twitter, Terminal, CheckCircle, AlertCircle 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// ============================================
// CONFIGURATION EMAILJS - À REMPLIR
// ============================================
// 1. Crée un compte gratuit sur https://www.emailjs.com/
// 2. Dans "Email Services", ajoute ton service email (Gmail, etc.)
// 3. Dans "Email Templates", crée un template avec ces variables:
//    - {{from_name}} : Nom de l'expéditeur
//    - {{from_email}} : Email de l'expéditeur  
//    - {{subject}} : Sujet du message
//    - {{message}} : Contenu du message
// 4. Copie tes identifiants ci-dessous:
const EMAILJS_SERVICE_ID = 'service_lzni7o5';  // Ex: 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_t4kt17n'; // Ex: 'template_xyz789'
const EMAILJS_PUBLIC_KEY = '1Kv11eqk0JHxXlurv';   // Ex: 'AbCdEfGhIjKlMnOp'
// ============================================

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'jedidiakamdemsouop@gmail.com',
    href: 'mailto:jedidiakamdemsouop@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Localisation',
    value: 'Yaoundé, Cameroun',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+237 6 96 19 51 72',
    href: 'https://wa.me/237696195172?text=Hello%2C%20J\'ai%20visité%20ton%20site%20et%20je%20voudrais%20discuter',
  },
];

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/JedidiaDev', username: '@JedidiaDev' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', username: '/in/username' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', username: '@username' },
];

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    // Vérifier si EmailJS est configuré
    // if (EMAILJS_SERVICE_ID === 'service_lzni7o5' || 
    //     EMAILJS_TEMPLATE_ID === 'template_t4kt17n' ) {
    //   console.error('EmailJS non configuré ! Voir les instructions dans Contact.tsx');
    //   // Mode démo si non configuré
    //   setStatus('loading');
    //   await new Promise((resolve) => setTimeout(resolve, 1500));
    //   setStatus('success');
    //   setFormData({ name: '', email: '', subject: '', message: '' });
    //   setTimeout(() => setStatus('idle'), 5000);
    //   return;
    // }

    setStatus('loading');

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <div className="inline-block font-mono text-xs sm:text-sm text-muted-foreground mb-4">
            <span className="text-primary">$</span> ./send_message.sh
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
            <span className="text-primary">#</span> Me Contacter
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto px-4">
            Une idée de projet ? Une collaboration ? N'hésitez pas à me contacter !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Card className="terminal-box relative overflow-hidden">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                  <span className="text-muted-foreground text-xs sm:text-sm font-mono ml-2 sm:ml-4 truncate">
                    ~/contact/form.sh
                  </span>
                </div>
                <CardTitle className="font-mono text-primary flex items-center gap-2 text-base sm:text-lg">
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
                  Envoyer un message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs sm:text-sm text-muted-foreground">
                      <span className="text-primary">$</span> echo $NAME
                    </label>
                    <motion.input
                      type="text"
                      name="from_name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/30 border border-primary/20 rounded-lg font-mono text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors interactive"
                      placeholder="Votre nom..."
                      animate={{
                        borderColor: focusedField === 'name' ? 'var(--primary)' : undefined,
                        boxShadow: focusedField === 'name' ? '0 0 15px rgba(0, 255, 85, 0.2)' : 'none',
                      }}
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs sm:text-sm text-muted-foreground">
                      <span className="text-primary">$</span> echo $EMAIL
                    </label>
                    <motion.input
                      type="email"
                      name="from_email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/30 border border-primary/20 rounded-lg font-mono text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors interactive"
                      placeholder="votre@email.com"
                      animate={{
                        borderColor: focusedField === 'email' ? 'var(--primary)' : undefined,
                        boxShadow: focusedField === 'email' ? '0 0 15px rgba(0, 255, 85, 0.2)' : 'none',
                      }}
                    />
                  </div>

                  {/* Subject field */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs sm:text-sm text-muted-foreground">
                      <span className="text-primary">$</span> echo $SUBJECT
                    </label>
                    <motion.input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/30 border border-primary/20 rounded-lg font-mono text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors interactive"
                      placeholder="Sujet du message..."
                      animate={{
                        borderColor: focusedField === 'subject' ? 'var(--primary)' : undefined,
                        boxShadow: focusedField === 'subject' ? '0 0 15px rgba(0, 255, 85, 0.2)' : 'none',
                      }}
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs sm:text-sm text-muted-foreground">
                      <span className="text-primary">$</span> cat {">"} message.txt
                    </label>
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-secondary/30 border border-primary/20 rounded-lg font-mono text-sm sm:text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none interactive"
                      placeholder="Votre message..."
                      animate={{
                        borderColor: focusedField === 'message' ? 'var(--primary)' : undefined,
                        boxShadow: focusedField === 'message' ? '0 0 15px rgba(0, 255, 85, 0.2)' : 'none',
                      }}
                    />
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full font-mono bg-primary text-primary-foreground hover:bg-primary/90 interactive relative overflow-hidden group"
                  >
                    {status === 'loading' ? (
                      <motion.div
                        className="flex items-center gap-2"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Envoi en cours...
                      </motion.div>
                    ) : status === 'success' ? (
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Message envoyé !
                      </span>
                    ) : status === 'error' ? (
                      <span className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Erreur, réessayez
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        ./send_message.sh
                      </span>
                    )}
                    <motion.div
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6 w-full"
          >
            {/* Contact details */}
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="font-mono text-sm sm:text-base flex items-center gap-2">
                  <span className="text-primary">$</span> cat ./contact_info.json
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-3 sm:space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-lg hover:bg-primary/5 transition-colors group interactive"
                      >
                        <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors shrink-0">
                          <info.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm text-muted-foreground font-mono">{info.label}</p>
                          <p className="text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                          <info.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm text-muted-foreground font-mono">{info.label}</p>
                          <p className="text-sm sm:text-base text-foreground truncate">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Social links */}
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="font-mono text-sm sm:text-base flex items-center gap-2">
                  <span className="text-primary">$</span> ls ./social_links/
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-2 sm:space-y-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-primary/5 transition-colors group interactive"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="p-1.5 sm:p-2 rounded-lg bg-secondary/50 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
                        <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm sm:text-base font-medium text-foreground group-hover:text-primary transition-colors">
                          {social.label}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground font-mono truncate">
                          {social.username}
                        </p>
                      </div>
                    </div>
                    <span className="text-muted-foreground group-hover:text-primary transition-colors shrink-0">→</span>
                  </motion.a>
                ))}
              </CardContent>
            </Card>

            {/* Availability status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-3 sm:p-4 rounded-lg border border-primary/30 bg-primary/5 relative overflow-hidden"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 shrink-0"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}
                />
                <span className="font-mono text-xs sm:text-sm">
                  <span className="text-primary">Status:</span>{' '}
                  <span className="text-green-500">Disponible pour de nouveaux projets</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
