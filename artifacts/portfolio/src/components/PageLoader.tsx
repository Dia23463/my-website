import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function PageLoader({ onComplete }: { onComplete?: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.4, ease: "easeInOut", delay: 0.5 }}
        onAnimationComplete={onComplete}
        className="fixed inset-0 z-[100] bg-black pointer-events-none flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-32 h-32 rounded-full bg-white/5 blur-3xl"
        />
      </motion.div>
    </AnimatePresence>
  );
}
