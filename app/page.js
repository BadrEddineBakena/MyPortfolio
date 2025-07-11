"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  useEffect(() => {
    // Binary rain
    const binContainer = document.querySelector('.binary-container');
    if (binContainer) {
      binContainer.innerHTML = '';
      for (let i = 0; i < Math.floor(window.innerWidth / 20); i++) {
        const b = document.createElement('div');
        b.className = 'binary';
        b.style.left = i * 20 + 'px';
        b.style.animationDuration = (Math.random() * 3 + 2) + 's';
        b.style.animationDelay = Math.random() * 2 + 's';
        b.textContent = Math.random() > 0.5 ? '0' : '1';
        binContainer.appendChild(b);
      }
    }
    // Particles
    const partContainer = document.querySelector('.particle-container');
    if (partContainer) {
      partContainer.innerHTML = '';
      for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = Math.random() * 10 + 10 + 's';
        p.style.animationDelay = Math.random() * 5 + 's';
        partContainer.appendChild(p);
      }
    }
    // Floating code symbols
    const symbols = ['<', '>', '{', '}', ';', '#', '$', '()', '=>', '</>'];
    const symContainer = document.querySelector('.symbol-container');
    if (symContainer) {
      symContainer.innerHTML = '';
      const total = Math.floor(window.innerWidth / 30);
      for (let i = 0; i < total; i++) {
        const el = document.createElement('div');
        el.className = 'symbol';
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (Math.random() * 8 + 4) + 's';
        el.style.animationDelay = (Math.random() * 5) + 's';
        el.style.fontSize = (Math.random() * 20 + 12) + 'px';
        symContainer.appendChild(el);
      }
    }
    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');
    const closeBtn = document.getElementById('closeBtn');
    if (menuBtn && navMenu) {
      menuBtn.onclick = () => navMenu.classList.add('active');
    }
    if (closeBtn && navMenu) {
      closeBtn.onclick = () => navMenu.classList.remove('active');
    }
    // Nav shrink on scroll
    const onScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', onScroll);
    // Clean up
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // EmailJS and Velocity are loaded via CDN in layout.js head, so we use them as globals
  useEffect(() => {
    if (typeof window !== 'undefined' && window.emailjs) {
      window.emailjs.init('WstOdDMr8kG3C_Bn_');
      const form = document.getElementById('contactForm');
      if (form) {
        form.onsubmit = function (e) {
          e.preventDefault();
          window.emailjs.sendForm('service_evp4fuu', 'template_x1dxjln', form)
            .then(() => {
              alert('✅ Message sent successfully!');
              form.reset();
            })
            .catch((error) => {
              alert('❌ Failed to send message:\n' + error.text);
            });
        };
      }
    }
    // Hero entrance animation (Velocity)
    if (typeof window !== 'undefined' && window.Velocity) {
      window.Velocity(document.querySelector('#hero'), { opacity: [1, 0], translateY: [0, 50] }, { duration: 1000 });
    }
  }, []);

  return (
    <>
      {/* Animated Background */}
      <div className="cyber-bg">
        <div className="grid"></div>
        <div className="binary-container"></div>
        <div className="particle-container"></div>
        <div className="code-snippet" style={{top:'20%', left:'5%', animationDelay:'1s'}}>&lt;secureConnection()&gt;</div>
        <div className="code-snippet" style={{top:'40%', right:'10%', animationDelay:'3s'}}>if (auth) &#123; decrypt(); &#125;</div>
        <div className="code-snippet" style={{bottom:'25%', left:'15%', animationDelay:'5s'}}>console.log("🛡️ Safe");</div>
        <div className="tech-icon" style={{top:'15%', right:'20%'}}>🔒</div>
        <div className="tech-icon" style={{bottom:'30%', left:'25%'}}>🛡️</div>
        <div className="tech-icon" style={{top:'60%', left:'80%'}}>⚙️</div>
        <div className="symbol-container"></div>
      </div>
      {/* Navigation */}
      <nav id="navbar">
        <div className="logo"><i className="fas fa-shield-alt"></i> Badr Eddine BAKENA</div>
        <button className="menu-btn" id="menuBtn"><i className="fas fa-bars"></i></button>
        <ul id="navMenu">
          <li><a href="#hero">{t.nav.home}</a></li>
          <li><a href="#about">{t.nav.about}</a></li>
          <li><a href="#projects">{t.nav.projects}</a></li>
          <li><a href="#services">{t.nav.services}</a></li>
          <li><a href="#contact">{t.nav.contact}</a></li>
        </ul>
        <button
          className="lang-switch-btn"
          style={{ marginLeft: "1rem", padding: "0.5rem 1rem", border: "none", background: "var(--cyan)", color: "var(--bg)", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => setLang(lang === "en" ? "fr" : "en")}
        >
          {lang === "en" ? "FR" : "EN"}
        </button>
      </nav>
      {/* Hero Section */}
      <section id="hero">
        <div className="hero-content">
          <div className="profile-img-container">
            <div className="profile-ring"></div>
            <img src="/me.jpg" alt="me" />
          </div>
          <h1>Badr Eddine BAKENA</h1>
          <div className="subtitle">{t.hero.subtitle}</div>
          <p>{t.hero.intro}</p>
          <div className="cta-buttons">
            <a href="/BadrEddineBAKENA.pdf" download className="btn">{t.hero.downloadCV}</a>
            <a id="link-contact" className="btn btn-primary" href="#contact">{t.hero.contactMe}</a>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="container">
        <h2 data-text={t.about.title}>{t.about.title}</h2>
        <div className="content about-grid">
          <div className="about-text">
            <p>{t.about.text}</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">1+</div>
              <div className="stat-label">{t.about.year}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10+</div>
              <div className="stat-label">{t.about.projects}</div>
            </div>
          </div>
        </div>
        <div className="skills-container">
          <div className="skill-tag">{t.about.skills[0]}</div>
          <div className="skill-tag">{t.about.skills[1]}</div>
          <div className="skill-tag">{t.about.skills[2]}</div>
          <div className="skill-tag">{t.about.skills[3]}</div>
          <div className="skill-tag">{t.about.skills[4]}</div>
          <div className="skill-tag">{t.about.skills[5]}</div>
        </div>
        <div className="dev-indicators">
          <div className="dev-indicator">
            <div className="dev-label">{t.about.dev[0]}</div>
            <div className="dev-bar">
              <div className="dev-fill web" style={{"--target-width": "80%"}}></div>
            </div>
          </div>
          <div className="dev-indicator">
            <div className="dev-label">{t.about.dev[1]}</div>
            <div className="dev-bar">
              <div className="dev-fill software" style={{"--target-width": "60%"}}></div>
            </div>
          </div>
          <div className="dev-indicator">
            <div className="dev-label">{t.about.dev[2]}</div>
            <div className="dev-bar">
              <div className="dev-fill security" style={{"--target-width": "50%"}}></div>
            </div>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="container">
        <h2>{t.projects.title}</h2>
        <div className="projects-grid">
          {/* Project 1: Elevator Simulator */}
          <div className="project-card">
            <div className="project-content">
              <div className="project-tags">
                <span className="project-tag">C#</span>
                <span className="project-tag">.NET</span>
                <span className="project-tag">Windows Forms</span>
              </div>
              <h3 className="project-title">{t.projects.elevator.title}</h3>
              <p className="project-description">{t.projects.elevator.desc}</p>
              <div className="project-links">
                <a href="https://github.com/BadrEddineBakena/ElevatorSimulation" className="project-link" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-code"></i> {t.projects.code}
                </a>
              </div>
            </div>
          </div>
          {/* Project 2: Expense Web App */}
          <div className="project-card">
            <div className="project-content">
              <div className="project-tags">
                <span className="project-tag">React</span>
                <span className="project-tag">Node.js</span>
                <span className="project-tag">MySQL/MariaDB</span>
              </div>
              <h3 className="project-title">{t.projects.expense.title}</h3>
              <p className="project-description">{t.projects.expense.desc}</p>
              <div className="project-links">
                <a href="https://github.com/BadrEddineBakena/ExpenseWebApp" className="project-link" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-code"></i> {t.projects.code}
                </a>
              </div>
            </div>
          </div>
          {/* Project 3: Caesar Cipher Mini Tool */}
          <div className="project-card">
            <div className="project-content">
              <div className="project-tags">
                <span className="project-tag">C</span>
                <span className="project-tag">CLI</span>
                <span className="project-tag">Cryptography</span>
              </div>
              <h3 className="project-title">{t.projects.caesar.title}</h3>
              <p className="project-description">{t.projects.caesar.desc}</p>
              <div className="project-links">
                <a href="https://github.com/BadrEddineBakena/cesarcipher" className="project-link" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-code"></i> {t.projects.code}
                </a>
              </div>
            </div>
          </div>
          {/* Project 4: Python Port Scanner (Coming Soon) */}
          <div className="project-card coming-soon">
            <div className="project-content">
              <div className="project-tags">
                <span className="project-tag">Python</span>
                <span className="project-tag">Networking</span>
                <span className="project-tag">Security</span>
              </div>
              <h3 className="project-title">{t.projects.port.title} <span style={{color:'#aaa'}}>{t.projects.port.soon}</span></h3>
              <p className="project-description">{t.projects.port.desc}</p>
              <div className="project-links">
                <span className="project-link disabled"><i className="fas fa-code"></i> {t.projects.inProgress}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="container">
        <h2>{t.services.title}</h2>
        <div className="services-grid">
          {/* Full-Stack Web Development */}
          <div className="service-card">
            <div className="service-icon"><i className="fas fa-laptop-code"></i></div>
            <h3 className="service-title">{t.services.fullstack.title}</h3>
            <p className="service-description">{t.services.fullstack.desc}</p>
          </div>
          {/* Backend Development */}
          <div className="service-card">
            <div className="service-icon"><i className="fas fa-server"></i></div>
            <h3 className="service-title">{t.services.backend.title}</h3>
            <p className="service-description">{t.services.backend.desc}</p>
          </div>
          {/* Programming & Scripting */}
          <div className="service-card">
            <div className="service-icon"><i className="fas fa-terminal"></i></div>
            <h3 className="service-title">{t.services.scripting.title}</h3>
            <p className="service-description">{t.services.scripting.desc}</p>
          </div>
          {/* Software Development */}
          <div className="service-card">
            <div className="service-icon"><i className="fas fa-desktop"></i></div>
            <h3 className="service-title">{t.services.software.title}</h3>
            <p className="service-description">{t.services.software.desc}</p>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="container">
        <h2>{t.contact.title}</h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-envelope"></i></div>
              <div className="contact-text">
                <h4>{t.contact.email}</h4>
                <p>baknabadrddin@gmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
              <div className="contact-text">
                <h4>{t.contact.phone}</h4>
                <p>+212 658 54 05 23</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
              <div className="contact-text">
                <h4>{t.contact.location}</h4>
                <p>{t.contact.locationText}</p>
              </div>
            </div>
          </div>
          <div className="contact-form">
            <form id="contactForm">
              <div className="form-group">
                <label htmlFor="name" className="form-label">{t.contact.form.name}</label>
                <input type="text" id="name" name="name" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">{t.contact.form.email}</label>
                <input type="email" id="email" name="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject" className="form-label">{t.contact.form.subject}</label>
                <input type="text" id="subject" name="subject" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">{t.contact.form.message}</label>
                <textarea id="message" name="message" className="form-control" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">{t.contact.form.send}</button>
            </form>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="social-links">
            <a href="https://github.com/BadrEddineBakena" className="social-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/badr-eddine-bakena-284042270/" className="social-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://www.instagram.com/badrbadr1706?igsh=MW1jeGU2NTN4eXBtZw==" className="social-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com/profile.php?id=100083125011101" className="social-link" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
          </div>
          <div className="copyright">
            &copy; 2025 Badr Eddine BAKENA. {t.footer}
          </div>
        </div>
      </footer>
    </>
  );
}

const translations = {
  en: {
    nav: { home: "Home", about: "About", projects: "Projects", services: "Services", contact: "Contact" },
    hero: {
      subtitle: "Cybersecurity Student with coding experience",
      intro: "👋 Hi, my name is Badr Eddine BAKENA. I’m originally from Tounfite — a small village in the Midelt region of Morocco. Currently, I'm a cybersecurity engineering student based in Taroudante.\n\nI’m passionate about full-stack development and gradually expanding my skills in software engineering. I enjoy building secure, responsive web applications and solving real-world problems through code. Whether it's crafting intuitive frontend interfaces, developing backend logic, or exploring system vulnerabilities, I’m always learning and pushing boundaries.\n\nLet’s build something smart, secure, and impactful together.",
      downloadCV: "Download CV",
      contactMe: "Contact Me"
    },
    about: {
      title: "About Me",
      text: "I'm a curious and driven engineering student majoring in cybersecurity, with a strong passion for full-stack development and an interest in software development.\n\nMy journey in tech is fueled by a desire to understand how systems work — and how to build them securely. While I’m still growing in software development, I enjoy contributing to meaningful projects, whether it's designing intuitive interfaces, crafting backend logic, or ensuring secure data flow.\n\nI believe in clean code, continuous learning, and building things that make a difference. Whether I’m solving algorithmic challenges, exploring vulnerabilities, or collaborating on full-stack apps, I bring energy, curiosity, and a hacker’s mindset to everything I do.",
      year: "Year of Cyber Learning",
      projects: "Projects & Labs Completed",
      skills: ["Learning Ethical Hacking", "Cybersecurity Fundamentals", "Linux & Networking Basics", "Python, JAVA, C, C#", "HTML,CSS, JavaScript, NodeJS", "MySQL, PL-SQL"],
      dev: ["Web Development", "Software Engineering", "Cybersecurity Foundations"]
    },
    projects: {
      title: "Projects",
      elevator: {
        title: "Elevator Simulator",
        desc: "A desktop simulation of elevator behavior using C# and Windows Forms. Includes animated doors, call queue logic, and floor display — designed for learning UI + system logic integration."
      },
      expense: {
        title: "Expense Tracker Web App",
        desc: "A full-stack MERN application for managing personal expenses. Includes authentication, dashboards, chart visualizations, and RESTful API integration."
      },
      caesar: {
        title: "Caesar Cipher Script",
        desc: "A small command-line tool written in C that applies Caesar cipher encryption and decryption. Built for early experimentation with classical cryptography."
      },
      port: {
        title: "Python Port Scanner",
        soon: "(Coming Soon)",
        desc: "A beginner-level port scanner using Python sockets to scan local or remote IPs. Helps practice low-level networking concepts and Python scripting."
      },
      code: "Code",
      inProgress: "In Progress"
    },
    services: {
      title: "Services",
      fullstack: {
        title: "Full-Stack Web Development",
        desc: "Build responsive, dynamic websites and web apps using technologies like HTML, CSS, JavaScript, React, Node.js, and MySQL/MariaDB."
      },
      backend: {
        title: "Backend Development",
        desc: "Create scalable and secure backend APIs using Express.js, RESTful services, and database integration with MySQL/MariaDB."
      },
      scripting: {
        title: "Programming & Scripting",
        desc: "Develop efficient solutions and automation scripts in C, Python, and Bash for learning, system tasks, or mini tools."
      },
      software: {
        title: "Software Development",
        desc: "Build desktop applications using C# (WinForms) and Java. Currently expanding knowledge in structured software engineering practices."
      }
    },
    contact: {
      title: "Contact Me",
      email: "Email",
      phone: "Phone",
      location: "Location",
      locationText: "Currently based in Taroudante, Morocco",
      form: {
        name: "Your Name",
        email: "Your Email",
        subject: "Subject",
        message: "Message",
        send: "Send Message"
      }
    },
    footer: "All rights reserved."
  },
  fr: {
    nav: { home: "Accueil", about: "À propos", projects: "Projets", services: "Services", contact: "Contact" },
    hero: {
      subtitle: "Étudiant en cybersécurité avec expérience en codage",
      intro: "👋 Bonjour, je m'appelle Badr Eddine BAKENA. Je viens de Tounfite — un petit village de la région de Midelt au Maroc. Actuellement, je suis étudiant en ingénierie de la cybersécurité à Taroudante.\n\nJe suis passionné par le développement full-stack et j'élargis progressivement mes compétences en ingénierie logicielle. J'aime créer des applications web sécurisées et réactives et résoudre des problèmes concrets grâce au code. Que ce soit pour concevoir des interfaces frontend intuitives, développer la logique backend ou explorer les vulnérabilités système, j'apprends toujours et repousse les limites.\n\nConstruisons ensemble quelque chose d'intelligent, de sécurisé et d'impactant.",
      downloadCV: "Télécharger le CV",
      contactMe: "Me contacter"
    },
    about: {
      title: "À propos de moi",
      text: "Je suis un étudiant ingénieur curieux et motivé, spécialisé en cybersécurité, avec une forte passion pour le développement full-stack et un intérêt pour le développement logiciel.\n\nMon parcours dans la tech est animé par le désir de comprendre comment fonctionnent les systèmes — et comment les construire de manière sécurisée. Bien que je sois encore en apprentissage dans le développement logiciel, j'aime contribuer à des projets significatifs, que ce soit en concevant des interfaces intuitives, en développant la logique backend ou en assurant un flux de données sécurisé.\n\nJe crois au code propre, à l'apprentissage continu et à la création de choses qui font la différence. Que je résolve des défis algorithmiques, explore des vulnérabilités ou collabore sur des applications full-stack, j'apporte énergie, curiosité et un esprit de hacker à tout ce que je fais.",
      year: "Année d'apprentissage cyber",
      projects: "Projets & Labs réalisés",
      skills: ["Apprentissage du hacking éthique", "Fondamentaux de la cybersécurité", "Bases de Linux & Réseaux", "Python, JAVA, C, C#", "HTML,CSS, JavaScript, NodeJS", "MySQL, PL-SQL"],
      dev: ["Développement Web", "Génie Logiciel", "Fondamentaux de la cybersécurité"]
    },
    projects: {
      title: "Projets",
      elevator: {
        title: "Simulateur d'ascenseur",
        desc: "Une simulation de comportement d'ascenseur sur desktop utilisant C# et Windows Forms. Comprend des portes animées, une logique de file d'attente d'appels et un affichage des étages — conçu pour l'apprentissage de l'intégration UI + logique système."
      },
      expense: {
        title: "Application de gestion de dépenses",
        desc: "Une application MERN full-stack pour gérer les dépenses personnelles. Comprend l'authentification, des tableaux de bord, des visualisations graphiques et une intégration API RESTful."
      },
      caesar: {
        title: "Script Chiffrement César",
        desc: "Un petit outil en ligne de commande écrit en C qui applique le chiffrement et le déchiffrement César. Construit pour expérimenter la cryptographie classique."
      },
      port: {
        title: "Scanner de ports Python",
        soon: "(Bientôt)",
        desc: "Un scanner de ports de niveau débutant utilisant les sockets Python pour scanner des IP locales ou distantes. Permet de pratiquer les concepts de réseau bas niveau et le scripting Python."
      },
      code: "Code",
      inProgress: "En cours"
    },
    services: {
      title: "Services",
      fullstack: {
        title: "Développement Web Full-Stack",
        desc: "Créer des sites web et applications dynamiques et réactives avec HTML, CSS, JavaScript, React, Node.js et MySQL/MariaDB."
      },
      backend: {
        title: "Développement Backend",
        desc: "Créer des API backend évolutives et sécurisées avec Express.js, des services RESTful et une intégration de base de données MySQL/MariaDB."
      },
      scripting: {
        title: "Programmation & Scripts",
        desc: "Développer des solutions efficaces et des scripts d'automatisation en C, Python et Bash pour l'apprentissage, les tâches système ou les mini-outils."
      },
      software: {
        title: "Développement Logiciel",
        desc: "Créer des applications desktop avec C# (WinForms) et Java. Actuellement en expansion de connaissances en pratiques d'ingénierie logicielle structurée."
      }
    },
    contact: {
      title: "Me contacter",
      email: "Email",
      phone: "Téléphone",
      location: "Localisation",
      locationText: "Actuellement basé à Taroudante, Maroc",
      form: {
        name: "Votre nom",
        email: "Votre email",
        subject: "Sujet",
        message: "Message",
        send: "Envoyer le message"
      }
    },
    footer: "Tous droits réservés."
  }
}; 