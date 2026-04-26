import { motion } from "framer-motion";

export function Navbar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-4xl z-50"
    >
      <div className="liquid-glass rounded-full h-14 flex items-center justify-between px-6">
        <button
          onClick={() => scrollTo("hero")}
          className="font-instrument italic text-xl text-white/90 hover:text-white transition-colors"
        >
          Dia Sutaria
        </button>

        <div className="hidden md:flex items-center gap-8">
          {["About", "Projects", "Experience", "Writing", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-[0.875rem] font-sans text-white/75 hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo("contact")}
          className="liquid-glass-strong rounded-full px-5 py-2 text-[0.875rem] font-sans text-white hover:bg-white/10 transition-colors"
        >
          Let's Talk
        </button>
      </div>
    </motion.nav>
  );
}
