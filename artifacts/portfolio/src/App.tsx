import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowDown, BookOpen, ArrowUpRight, Mail, Github, Linkedin, BookMarked } from "lucide-react";
import { useRef } from "react";
import { PageLoader } from "./components/PageLoader";
import { Navbar } from "./components/Navbar";
import { SwayCanvas } from "./components/canvas/SwayCanvas";
import { AtmosphereCanvas } from "./components/canvas/AtmosphereCanvas";
import { ParticleCanvas } from "./components/canvas/ParticleCanvas";
import { ParticleTitle } from "./components/canvas/ParticleTitle";

const MEDIUM_URL = "https://medium.com/@athena.parthenos10621";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }
  })
};

function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 45]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="hero" className="h-[100vh] bg-black overflow-hidden relative flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 0.4 }}
        className="absolute inset-0 z-0"
      >
        <SwayCanvas />
      </motion.div>
      
      {/* Ambient Orbs */}
      <motion.div 
        className="absolute top-0 right-0 w-[560px] h-[560px] rounded-full mix-blend-screen pointer-events-none z-1"
        style={{ background: "radial-gradient(rgba(255,215,90,0.42), rgba(255,150,30,0.14), transparent)", filter: "blur(60px)" }}
        animate={{ x: [0,38,-18,30,0], y: [0,-22,14,-10,0], opacity: [0.75,1,0.8,1,0.75] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <div 
        className="absolute top-0 left-0 w-[750px] h-[280px] mix-blend-screen pointer-events-none z-1"
        style={{ background: "radial-gradient(ellipse at center, rgba(120,200,255,0.22), transparent)", filter: "blur(80px)" }}
      />
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none z-1"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,180,100,0.18), transparent)", filter: "blur(100px)" }}
      />
      
      <AtmosphereCanvas />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
      >
        <ParticleTitle />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-6 text-white/72 font-sans font-light text-lg md:text-xl max-w-2xl mx-auto"
        >
          CS + Economics at UMass Amherst · AI engineer, researcher, and quiet builder of things that try to make the world a little less broken.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button 
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="liquid-glass-strong rounded-full px-6 py-3 text-[0.9rem] font-sans font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            See My Work <ArrowDown className="w-4 h-4" />
          </button>
          <button 
            onClick={() => document.getElementById("writing")?.scrollIntoView({ behavior: "smooth" })}
            className="liquid-glass-strong rounded-full px-6 py-3 text-[0.9rem] font-sans font-medium text-white flex items-center gap-2 hover:bg-white/10 transition-colors"
          >
            Read My Writing <BookOpen className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 opacity-50"
      >
        <span className="font-sans text-xs tracking-widest uppercase text-white/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="bg-black pt-40 pb-56 px-6 relative overflow-hidden">
      <img src="/intro-bg.png" className="absolute inset-0 w-full h-full object-cover opacity-50 z-0" alt="" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0" />
      <div className="absolute inset-0 bg-black/30 z-0" />
      <ParticleCanvas />

      <motion.div 
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <motion.div custom={0} variants={fadeUp} className="section-badge">About Me</motion.div>
        <motion.h2 custom={1} variants={fadeUp} className="font-instrument italic text-[clamp(2.5rem,6vw,4rem)] leading-tight text-white mb-10">
          Not just a CS major. <br/> Not just an econ student. <br/> Just someone trying to build things that matter.
        </motion.h2>
        
        <motion.div custom={2} variants={fadeUp} className="font-sans font-light text-white/72 text-lg leading-relaxed space-y-6 text-left max-w-2xl mx-auto">
          <p>
            I'm a sophomore at UMass Amherst studying Computer Science and Economics, fascinated by the strange overlap between systems, people, and the choices that connect them. I work on AI for the public sector, research carbon-aware computing, and build small things on the side that I wish existed.
          </p>
          <p>
            The thread through all of it is the same: I like problems that don't have a clean answer. Designing models that have to live with messy human data. Translating dense financial signals into something a person can actually feel. Sketching tools at 2am because the idea won't leave me alone. This page is a small record of that — what I've shipped, what I've researched, and what I'm still figuring out.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const projects: Array<{ title: string; desc: string; href: string; image?: string }> = [
    {
      title: "Access Prep",
      desc: "AI-powered financial document assistant for underserved users — React + TypeScript front end, Flask + LangChain backend, Gemini chatbot, OCR verification, bilingual support. Selected for the Capital One 2026 Tech Summit (3rd place).",
      href: "https://github.com/Dia23463",
      image: "/access-prep.png"
    },
    {
      title: "RecessionIQ",
      desc: "Real-time macro dashboard in Next.js pulling Federal Reserve data across CPI, unemployment, and the yield curve. Built a weighted recession-risk model grounded in historical data, deployed on Vercel.",
      href: "https://github.com/Dia23463",
      image: "/recessioniq.png"
    },
    {
      title: "Healthcare Deserts",
      desc: "Interactive geospatial ML app predicting underserved healthcare regions. Combined demographic, transport, and facility data with classification + GenAI summaries to surface high-impact clinic locations.",
      href: "https://github.com/Dia23463",
      image: "/healthcare.png"
    },
    {
      title: "This Site",
      desc: "The thing you're scrolling through. A single-page React + Vite + TypeScript build with Tailwind v4, Framer Motion scroll reveals, a Canvas2D node-graph hero, particle-rendered title, and liquid-glass UI. Designed, written, and shipped solo.",
      href: "https://github.com/Dia23463"
    }
  ];

  return (
    <section id="projects" className="bg-black pt-28 pb-36 px-6 relative overflow-hidden">
      <img src="/projects-bg.png" className="absolute inset-0 w-full h-full object-cover opacity-60 z-0" alt="" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0" />
      
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.div custom={0} variants={fadeUp} className="section-badge">Projects / Work</motion.div>
          <motion.h2 custom={1} variants={fadeUp} className="font-instrument italic text-4xl md:text-5xl text-white">
            Things I built <br/> when I probably should've been sleeping.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {projects.map((p, i) => (
            <motion.a
              key={i}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              custom={2 + i}
              variants={fadeUp}
              className="liquid-glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/30 group cursor-pointer flex flex-col min-h-[220px]"
            >
              {p.image && (
                <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-white/10 bg-black">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
              <div className="p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-instrument italic text-3xl text-white mb-3">{p.title}</h3>
                  <p className="font-sans font-light text-white/65 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-6 flex items-center font-sans font-medium text-sm text-white/50 group-hover:text-white transition-colors">
                  View Project <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const experiences: Array<{ role: string; org: string; year: string; desc: string; image?: string }> = [
    {
      role: "AI Engineering Intern",
      org: "Commonwealth of Massachusetts",
      year: "Jan 2026 — Present",
      desc: "Selected for a 16-week program building generative AI for public-sector use. Designing systems with UMass CICS faculty and state partners using human-centered design and responsible AI on AWS."
    },
    {
      role: "Emerging Leaders Scholar (Engineering)",
      org: "Goldman Sachs",
      year: "Jan 2026 — Present",
      desc: "Engineering Track scholar — technical training, mentorship, and an in-person presentation of an engineering solution at the Goldman Sachs Dallas office.",
      image: "/goldman.png"
    },
    {
      role: "Innovation Challenge Finalist",
      org: "Accenture",
      year: "Feb 2026 — Mar 2026",
      desc: "Selected from over 1,500 applicants. Analyzed a partner organization's challenges and presented strategy recommendations to senior Accenture leadership for community-impact work.",
      image: "/accenture.png"
    },
    {
      role: "AI Studio Fellow",
      org: "Snowflake",
      year: "Aug 2025 — Dec 2025",
      desc: "Built an interactive geospatial ML app predicting healthcare deserts — combined demographic, transport, and facility data with classification models and GenAI summaries to recommend clinic locations."
    },
    {
      role: "Undergraduate Researcher",
      org: "Lab for Advanced System Software",
      year: "Mar 2025 — Present",
      desc: "Studying how energy mix and geography shape grid carbon intensity, and how that informs carbon-aware placement of cloud workloads across regions."
    },
    {
      role: "Student Ambassador",
      org: "UMass IT",
      year: "Sept 2025 — Present",
      desc: "Evaluating IT tools and services and feeding accessibility, UX, and service-design feedback to cross-functional teams."
    }
  ];

  return (
    <section id="experience" className="bg-black pt-40 pb-56 px-6 relative overflow-hidden">
      <motion.img 
        src="/features-bg.png" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
        animate={{ scale: [1.06, 1.12, 1.06], x: ['0%', '-2%', '0%'], y: ['0%', '-1.5%', '0%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-0" />
      <div className="absolute inset-0 bg-black/40 z-0" />

      <motion.div 
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="text-center mb-20">
          <motion.div custom={0} variants={fadeUp} className="section-badge">Experience + Leadership</motion.div>
          <motion.h2 custom={1} variants={fadeUp} className="font-instrument italic text-4xl md:text-5xl text-white">
            What I've done <br/> when nobody was watching.
          </motion.h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-white/0 via-white/15 to-white/0" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              custom={2 + i}
              variants={fadeUp}
              className="relative pl-10 mb-10 last:mb-0"
            >
              <div className="absolute left-[7px] top-7 w-[10px] h-[10px] rounded-full bg-white/70 ring-4 ring-black" />

              <div className="liquid-glass rounded-2xl overflow-hidden">
                {exp.image && (
                  <div className="relative w-full aspect-[16/7] overflow-hidden border-b border-white/10 bg-black">
                    <img src={exp.image} alt={exp.org} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                    <h3 className="font-instrument italic text-2xl text-white leading-tight">{exp.role}</h3>
                    <div className="font-sans font-medium text-xs text-white/40 uppercase tracking-wider whitespace-nowrap">{exp.year}</div>
                  </div>
                  <div className="font-sans font-medium text-sm text-white/60 mb-3">{exp.org}</div>
                  <p className="font-sans font-light text-white/70 text-sm leading-relaxed">{exp.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function WritingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const essays = [
    {
      title: "4 Lessons I Learnt Till 18",
      href: "https://medium.com/@athena.parthenos10621/4-lessons-i-learnt-till-18-7218288597b1",
      date: "Apr 2026 · 4 min read",
      excerpt: "On being the main character of your own life, becoming someone your future self would be proud of, why self-discipline isn't optional, and learning that it's okay to feel lost sometimes."
    }
  ];

  return (
    <section id="writing" className="bg-black pt-28 pb-36 px-6 relative overflow-hidden">
      <AtmosphereCanvas />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="text-center mb-16 max-w-xl mx-auto">
          <motion.div custom={0} variants={fadeUp} className="section-badge">Writing</motion.div>
          <motion.h2 custom={1} variants={fadeUp} className="font-instrument italic text-4xl md:text-5xl text-white mb-6">
            Essays, thoughts, <br/> and things I had to get out of my head.
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="font-sans font-light text-white/60 leading-relaxed">
            I publish on Medium — short essays at the intersection of AI, economics, and the messy parts of building real things.
          </motion.p>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto mb-12">
          <motion.div custom={3} variants={fadeUp} className="text-center mb-2">
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-white/35">Latest Essay</span>
          </motion.div>
          {essays.map((essay, i) => (
            <motion.a
              key={i}
              href={essay.href}
              target="_blank"
              rel="noreferrer"
              custom={4 + i}
              variants={fadeUp}
              className="block liquid-glass-strong rounded-2xl p-6 md:p-8 transition-all hover:bg-white/[0.08] hover:-translate-y-0.5 group"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3 gap-1">
                <h3 className="font-instrument italic text-2xl md:text-3xl text-white group-hover:text-white/90 leading-tight">{essay.title}</h3>
                <span className="font-sans text-xs text-white/40 uppercase tracking-wider whitespace-nowrap">{essay.date}</span>
              </div>
              <p className="font-sans font-light text-white/65 text-base leading-relaxed">{essay.excerpt}</p>
              <div className="mt-4 inline-flex items-center font-sans font-medium text-sm text-white/55 group-hover:text-white transition-colors">
                Read on Medium <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          custom={7}
          variants={fadeUp}
          className="liquid-glass-strong rounded-3xl p-8 md:p-10 max-w-2xl mx-auto text-center relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(255,210,140,0.18), transparent 60%)",
            }}
          />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/8 border border-white/15 mb-5">
              <BookMarked className="w-5 h-5 text-white/85" />
            </div>
            <h3 className="font-instrument italic text-3xl md:text-4xl text-white leading-tight mb-3">
              Want the next one in your inbox?
            </h3>
            <p className="font-sans font-light text-white/65 text-base md:text-lg leading-relaxed mb-7 max-w-md mx-auto">
              I publish a few essays a month on Medium — quiet, slow writing about technology, research, and the in-between. No spam, no algorithms, just the work.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={MEDIUM_URL}
                target="_blank"
                rel="noreferrer"
                className="liquid-glass-strong rounded-full px-7 py-3.5 font-sans font-medium text-white flex items-center gap-2.5 hover:bg-white/12 transition-colors"
              >
                Follow on Medium <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={MEDIUM_URL}
                target="_blank"
                rel="noreferrer"
                className="font-sans font-medium text-sm text-white/55 hover:text-white transition-colors px-3"
              >
                Browse the archive →
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="bg-black pt-28 pb-40 px-6 relative">
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div custom={0} variants={fadeUp} className="section-badge">Let's Talk</motion.div>
        <motion.h2 custom={1} variants={fadeUp} className="font-instrument italic text-[clamp(2.75rem,7vw,4.75rem)] leading-tight text-white mb-8">
          You found the bottom. <br/> Let's make something.
        </motion.h2>
        <motion.p custom={2} variants={fadeUp} className="font-sans font-light text-white/70 text-lg mb-10 max-w-lg mx-auto">
          Whether you want to collaborate, have a project idea, or just want to say something interesting — my inbox is open.
        </motion.p>
        
        <motion.div custom={3} variants={fadeUp} className="flex flex-wrap justify-center gap-4">
          <a href="mailto:dia_010622@outlook.com" className="liquid-glass-strong rounded-full px-8 py-4 font-sans font-medium text-white flex items-center gap-3 hover:bg-white/10 transition-colors">
            <Mail className="w-5 h-5" /> Send Me a Message
          </a>
          <a href="https://github.com/Dia23463" target="_blank" rel="noreferrer" className="liquid-glass rounded-full px-8 py-4 font-sans font-medium text-white flex items-center gap-3 hover:bg-white/10 transition-colors">
            <Github className="w-5 h-5" /> View on GitHub
          </a>
          <a href="https://www.linkedin.com/in/dia-sutaria/" target="_blank" rel="noreferrer" className="liquid-glass rounded-full px-8 py-4 font-sans font-medium text-white flex items-center gap-3 hover:bg-white/10 transition-colors">
            <Linkedin className="w-5 h-5" /> LinkedIn
          </a>
          <a href={MEDIUM_URL} target="_blank" rel="noreferrer" className="liquid-glass rounded-full px-8 py-4 font-sans font-medium text-white flex items-center gap-3 hover:bg-white/10 transition-colors">
            <BookMarked className="w-5 h-5" /> Medium
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black pb-10 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="h-px w-full bg-white/10 mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="liquid-glass rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
              <img
                src="/ds-logo.png"
                alt="DS"
                className="w-6 h-6 object-contain"
                style={{ filter: "invert(1) brightness(1.6)" }}
              />
            </span>
            <div className="flex flex-col">
              <span className="font-instrument italic text-lg text-white/90 leading-tight">Dia Sutaria</span>
              <span className="font-sans text-xs text-white/35">CS + Economics · UMass Amherst</span>
            </div>
          </div>
          <div className="font-sans text-xs text-white/30 text-center md:text-right">
            © 2026. Built with too much coffee and not enough sleep.
          </div>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-white/20">
      <PageLoader />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <WritingSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default function App() {
  return <Home />;
}
