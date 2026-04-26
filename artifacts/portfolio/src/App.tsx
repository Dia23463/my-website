import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowDown, BookOpen, ArrowUpRight, Mail, Github, Linkedin } from "lucide-react";
import { useRef } from "react";
import { PageLoader } from "./components/PageLoader";
import { Navbar } from "./components/Navbar";
import { SwayCanvas } from "./components/canvas/SwayCanvas";
import { AtmosphereCanvas } from "./components/canvas/AtmosphereCanvas";
import { ParticleCanvas } from "./components/canvas/ParticleCanvas";
import { ParticleTitle } from "./components/canvas/ParticleTitle";

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

  const projects = [
    {
      title: "Access Prep",
      desc: "AI-powered financial document assistant for underserved users — React + TypeScript front end, Flask + LangChain backend, Gemini chatbot, OCR verification, bilingual support. Selected for the Capital One 2026 Tech Summit (3rd place).",
      href: "https://github.com/Dia23463"
    },
    {
      title: "RecessionIQ",
      desc: "Real-time macro dashboard in Next.js pulling Federal Reserve data across CPI, unemployment, and the yield curve. Built a weighted recession-risk model grounded in historical data, deployed on Vercel.",
      href: "https://github.com/Dia23463"
    },
    {
      title: "Healthcare Deserts",
      desc: "Interactive geospatial ML app predicting underserved healthcare regions. Combined demographic, transport, and facility data with classification + GenAI summaries to surface high-impact clinic locations.",
      href: "https://github.com/Dia23463"
    },
    {
      title: "Carbon-Aware Compute",
      desc: "Research at the Lab for Advanced System Software analyzing how energy mix and geography shape grid carbon intensity — and what that means for where and when cloud workloads should run.",
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
              className="liquid-glass rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 group cursor-pointer flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <h3 className="font-instrument italic text-3xl text-white mb-3">{p.title}</h3>
                <p className="font-sans font-light text-white/65 leading-relaxed">{p.desc}</p>
              </div>
              <div className="mt-6 flex items-center font-sans font-medium text-sm text-white/50 group-hover:text-white transition-colors">
                View Project <ArrowUpRight className="w-4 h-4 ml-1" />
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

  const experiences = [
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
      desc: "Engineering Track scholar — technical training, mentorship, and an in-person presentation of an engineering solution at the Goldman Sachs Dallas office."
    },
    {
      role: "Innovation Challenge Finalist",
      org: "Accenture",
      year: "Feb 2026 — Mar 2026",
      desc: "Selected from over 1,500 applicants. Analyzed a partner organization's challenges and presented strategy recommendations to senior Accenture leadership for community-impact work."
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

        <div className="relative border-l border-white/10 ml-4 md:ml-[50%]">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i} 
              custom={2 + i} 
              variants={fadeUp}
              className={`relative pl-8 md:pl-0 mb-12 flex ${i % 2 === 0 ? 'md:justify-end' : 'md:justify-start md:-ml-[50%]'}`}
            >
              <div className="absolute left-[-5px] top-4 md:left-[calc(50%-4px)] md:top-6 w-2 h-2 rounded-full bg-white/40 border-2 border-black" />
              <div className={`liquid-glass rounded-2xl p-6 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                <div className="font-sans font-medium text-xs text-white/40 mb-2">{exp.year}</div>
                <h3 className="font-instrument italic text-2xl text-white mb-1">{exp.role}</h3>
                <div className="font-sans font-medium text-sm text-white/60 mb-3">{exp.org}</div>
                <p className="font-sans font-light text-white/70 text-sm leading-relaxed">{exp.desc}</p>
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
    { title: "Notes from the Commonwealth", date: "Coming soon", excerpt: "What I'm learning about building generative AI inside a public-sector team that has to actually live with the consequences." },
    { title: "On carbon-aware computing", date: "Coming soon", excerpt: "Why where and when you run a workload is starting to matter as much as how fast it runs." },
    { title: "Designing for the underserved", date: "Coming soon", excerpt: "Lessons from Access Prep on bilingual UX, OCR pipelines, and trust." },
    { title: "Econ majors who code", date: "Coming soon", excerpt: "On the strange usefulness of reading too much macroeconomics while learning to ship software." }
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
            I write about technology, creativity, and the weird overlap between the two. Sometimes I write about nothing in particular.
          </motion.p>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          {essays.map((essay, i) => (
            <motion.a 
              key={i} 
              href="#"
              custom={3 + i} 
              variants={fadeUp}
              className="block liquid-glass rounded-xl p-5 md:p-6 transition-all hover:bg-white/[0.08] group"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                <h3 className="font-instrument italic text-2xl text-white group-hover:text-white/90">{essay.title}</h3>
                <span className="font-sans text-xs text-white/40 mt-1 md:mt-0">{essay.date}</span>
              </div>
              <p className="font-sans font-light text-white/60 text-sm">{essay.excerpt}</p>
            </motion.a>
          ))}
        </div>
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
            <span className="font-instrument italic text-xl text-white/90">Dia Sutaria</span>
            <span className="font-sans text-xs text-white/35">CS + Economics · UMass Amherst</span>
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
