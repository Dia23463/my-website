import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowDown, BookOpen, ArrowUpRight, Mail, Github } from "lucide-react";
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
          Developer · Writer · Student — building strange and beautiful things on the internet.
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
          Not just a developer. <br/> Not just a writer. <br/> Just a person figuring it out.
        </motion.h2>
        
        <motion.div custom={2} variants={fadeUp} className="font-sans font-light text-white/72 text-lg leading-relaxed space-y-6 text-left max-w-2xl mx-auto">
          <p>
            I've always lived in the strange overlap between logic and emotion. During the day, I write code that structures data, maps systems, and makes things work. At night, I write words that try to map out everything else. 
          </p>
          <p>
            There's a specific kind of comfort I find in building things at 2am. Whether it's a new UI component or a personal essay, the process is the same: staring at a blank screen and trying to organize chaos into something beautiful. This portfolio is a collection of that chaos.
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
    { title: "Echoes", desc: "An ambient sound generator built with React and Web Audio API. Generates endless, non-repeating soundscapes for deep focus." },
    { title: "Margin Notes", desc: "A tiny note-taking app that forces you to write in the margins of other texts. Built with Next.js and Tailwind." },
    { title: "Verse Engine", desc: "A generative poetry tool that uses Markov chains to construct surreal verses from public domain texts." },
    { title: "Night Mode", desc: "A personal essay engine that only unlocks its contents after 11 PM local time." }
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
            <motion.div 
              key={i} 
              custom={2 + i} 
              variants={fadeUp}
              className="liquid-glass rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/30 group cursor-pointer flex flex-col justify-between min-h-[200px]"
            >
              <div>
                <h3 className="font-instrument italic text-3xl text-white mb-3">{p.title}</h3>
                <p className="font-sans font-light text-white/65 leading-relaxed">{p.desc}</p>
              </div>
              <div className="mt-6 flex items-center font-sans font-medium text-sm text-white/50 group-hover:text-white transition-colors">
                View Project <ArrowUpRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
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
    { role: "Frontend Engineer Intern", org: "Vercel", year: "2024", desc: "Built internal tools and optimized rendering performance for the marketing site." },
    { role: "Editor-in-Chief", org: "The University Review", year: "2023 - 2024", desc: "Managed a team of 15 writers, redesigned the digital publication, and wrote weekly editorials." },
    { role: "Independent Writer", org: "Substack", year: "2022 - Present", desc: "Writing about the intersection of technology, design, and emotional resonance to an audience of 2,000+." },
    { role: "Hackathon Organizer", org: "HackTheNorth", year: "2022", desc: "Led the design and web team to build the landing page and registration portal." }
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
    { title: "On the comfort of late-night code", date: "Oct 12, 2024", excerpt: "Why the best ideas always seem to arrive when everyone else is asleep." },
    { title: "Why I keep writing in margins", date: "Sep 04, 2024", excerpt: "A defense of messy notes, incomplete thoughts, and the space outside the main content." },
    { title: "Notes on building things nobody asked for", date: "Jul 22, 2024", excerpt: "The pure joy of creating software with an audience of exactly one." },
    { title: "The aesthetics of plain text", date: "May 15, 2024", excerpt: "Stripping away the UI to find the raw emotional weight of words on a screen." }
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
          <a href="mailto:hello@example.com" className="liquid-glass-strong rounded-full px-8 py-4 font-sans font-medium text-white flex items-center gap-3 hover:bg-white/10 transition-colors">
            <Mail className="w-5 h-5" /> Send Me a Message
          </a>
          <a href="#" className="liquid-glass rounded-full px-8 py-4 font-sans font-medium text-white flex items-center gap-3 hover:bg-white/10 transition-colors">
            <Github className="w-5 h-5" /> View on GitHub
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
            <span className="font-instrument italic text-xl text-white/90">— . —</span>
            <span className="font-sans text-xs text-white/35">Developer · Writer · Student</span>
          </div>
          <div className="font-sans text-xs text-white/30 text-center md:text-right">
            © 2025. Built with too much coffee and not enough sleep.
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
