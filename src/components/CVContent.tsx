import { forwardRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Globe, Calendar, Award, Code, Shield, Server, Database } from 'lucide-react';

// ============================================
// DONNÉES DU CV - MODIFIEZ ICI VOS INFORMATIONS
// ============================================

export const cvData = {
  personalInfo: {
    name: 'Jedidia Kamdem Souop',
    title: 'Développeur Full Stack & Ethical Hacker',
    email: 'contact@example.com',
    phone: '+33 6 XX XX XX XX',
    location: 'Paris, France',
    website: 'https://jedidia-portfolio.dev',
    github: 'github.com/username',
    linkedin: 'linkedin.com/in/username',
    photo: '', // URL de votre photo (optionnel)
    summary: `Développeur Full Stack passionné avec une expertise en React, Node.js et TypeScript. 
    Apprenti hacker éthique, je combine mes compétences en développement avec une approche sécuritaire 
    pour créer des applications web robustes et sécurisées. Curieux et autodidacte, je suis constamment 
    à la recherche de nouveaux défis techniques.`,
  },

  experience: [
    {
      title: 'Développeur Full Stack',
      company: 'Entreprise Exemple',
      location: 'Paris, France',
      startDate: '2023',
      endDate: 'Présent',
      description: [
        'Développement d\'applications web avec React, TypeScript et Node.js',
        'Mise en place d\'architectures API RESTful sécurisées',
        'Intégration de tests automatisés et CI/CD',
        'Audit de sécurité et correction de vulnérabilités',
      ],
    },
    {
      title: 'Développeur Frontend',
      company: 'Startup Tech',
      location: 'Lyon, France',
      startDate: '2022',
      endDate: '2023',
      description: [
        'Création d\'interfaces utilisateur modernes avec React',
        'Optimisation des performances et de l\'accessibilité',
        'Collaboration avec l\'équipe UX/UI',
      ],
    },
  ],

  education: [
    {
      degree: 'Formation Développeur Web',
      school: 'École de Formation',
      location: 'Paris, France',
      year: '2022',
      description: 'Formation intensive en développement web full stack',
    },
    {
      degree: 'Certification Ethical Hacking',
      school: 'Plateforme de Formation',
      location: 'En ligne',
      year: '2024',
      description: 'Certification en tests de pénétration et sécurité web',
    },
  ],

  skills: {
    frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js', 'HTML/CSS'],
    backend: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB', 'Docker'],
    security: ['Pentesting', 'OWASP', 'Burp Suite', 'Nmap', 'Wireshark', 'Metasploit'],
    tools: ['Git', 'Linux', 'VS Code', 'Postman', 'Figma', 'Jira'],
  },

  certifications: [
    { name: 'Certification Ethical Hacking', issuer: 'Plateforme', year: '2024' },
    { name: 'JavaScript Avancé', issuer: 'Plateforme', year: '2023' },
  ],

  languages: [
    { name: 'Français', level: 'Natif' },
    { name: 'Anglais', level: 'Courant (B2/C1)' },
  ],

  interests: ['Cybersécurité', 'CTF (Capture The Flag)', 'Open Source', 'Veille technologique'],
};

// ============================================
// COMPOSANT CV
// ============================================

interface CVContentProps {
  variant?: 'preview' | 'print';
}

export const CVContent = forwardRef<HTMLDivElement, CVContentProps>(
  ({ variant = 'preview' }, ref) => {
    const isPrint = variant === 'print';
    const data = cvData;

    return (
      <div
        ref={ref}
        className={`bg-white text-gray-900 ${isPrint ? 'w-[210mm] min-h-[297mm]' : 'w-full'}`}
        style={{ 
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: isPrint ? '10pt' : '14px',
          lineHeight: '1.5',
        }}
      >
        {/* Header */}
        <header 
          className="px-8 py-6"
          style={{ 
            background: 'linear-gradient(135deg, #001a00 0%, #003300 100%)',
            color: '#00ff55',
          }}
        >
          <div className="flex items-start gap-6">
            {data.personalInfo.photo && (
              <img 
                src={data.personalInfo.photo} 
                alt={data.personalInfo.name}
                className="w-24 h-24 rounded-full border-2 border-[#00ff55] object-cover"
              />
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1" style={{ color: '#00ff55' }}>
                {data.personalInfo.name}
              </h1>
              <p className="text-lg opacity-90 mb-4" style={{ color: '#b3ffb3' }}>
                {data.personalInfo.title}
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm" style={{ color: '#b3ffb3' }}>
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {data.personalInfo.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {data.personalInfo.phone}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {data.personalInfo.location}
                </span>
                <span className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  {data.personalInfo.github}
                </span>
                <span className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4" />
                  {data.personalInfo.linkedin}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="px-8 py-6">
          {/* Summary */}
          <section className="mb-6">
            <h2 className="text-lg font-bold text-[#006600] border-b-2 border-[#00ff55] pb-1 mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Profil
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </section>

          <div className="grid grid-cols-3 gap-6">
            {/* Main Column */}
            <div className="col-span-2 space-y-6">
              {/* Experience */}
              <section>
                <h2 className="text-lg font-bold text-[#006600] border-b-2 border-[#00ff55] pb-1 mb-3 flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Expérience Professionnelle
                </h2>
                <div className="space-y-4">
                  {data.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                          <p className="text-sm text-[#006600]">{exp.company} - {exp.location}</p>
                        </div>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
                        {exp.description.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-lg font-bold text-[#006600] border-b-2 border-[#00ff55] pb-1 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Formation
                </h2>
                <div className="space-y-3">
                  {data.education.map((edu, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                          <p className="text-sm text-[#006600]">{edu.school} - {edu.location}</p>
                        </div>
                        <span className="text-sm text-gray-500">{edu.year}</span>
                      </div>
                      <p className="text-sm text-gray-600">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              <section>
                <h2 className="text-lg font-bold text-[#006600] border-b-2 border-[#00ff55] pb-1 mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Compétences
                </h2>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Frontend</h4>
                    <div className="flex flex-wrap gap-1">
                      {data.skills.frontend.map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-0.5 text-xs rounded"
                          style={{ background: '#e6ffe6', color: '#006600' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Backend</h4>
                    <div className="flex flex-wrap gap-1">
                      {data.skills.backend.map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-0.5 text-xs rounded"
                          style={{ background: '#e6ffe6', color: '#006600' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Sécurité
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {data.skills.security.map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-0.5 text-xs rounded"
                          style={{ background: '#ffe6e6', color: '#660000' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      Outils
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {data.skills.tools.map((skill) => (
                        <span 
                          key={skill}
                          className="px-2 py-0.5 text-xs rounded"
                          style={{ background: '#f0f0f0', color: '#333' }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Languages */}
              <section>
                <h2 className="text-lg font-bold text-[#006600] border-b-2 border-[#00ff55] pb-1 mb-3">
                  Langues
                </h2>
                <div className="space-y-1">
                  {data.languages.map((lang) => (
                    <div key={lang.name} className="flex justify-between text-sm">
                      <span className="text-gray-700">{lang.name}</span>
                      <span className="text-gray-500">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h2 className="text-lg font-bold text-[#006600] border-b-2 border-[#00ff55] pb-1 mb-3">
                  Certifications
                </h2>
                <div className="space-y-2">
                  {data.certifications.map((cert, index) => (
                    <div key={index} className="text-sm">
                      <p className="font-medium text-gray-700">{cert.name}</p>
                      <p className="text-gray-500 text-xs">{cert.issuer} - {cert.year}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Interests */}
              <section>
                <h2 className="text-lg font-bold text-[#006600] border-b-2 border-[#00ff55] pb-1 mb-3">
                  Centres d'intérêt
                </h2>
                <div className="flex flex-wrap gap-1">
                  {data.interests.map((interest) => (
                    <span 
                      key={interest}
                      className="px-2 py-0.5 text-xs rounded border border-gray-300 text-gray-600"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-3 text-center text-xs text-gray-400 border-t border-gray-200">
          CV généré depuis mon portfolio • {new Date().getFullYear()}
        </footer>
      </div>
    );
  }
);

CVContent.displayName = 'CVContent';
