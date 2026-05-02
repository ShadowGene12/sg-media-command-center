import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2] bg-[#0A0A0C]">
      {/* Deep Violet Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 150, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#7000FF] rounded-full blur-[140px]"
      />
      {/* Electric Cyan Orb */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -100, 0],
          y: [0, 150, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[1000px] max-h-[1000px] bg-[#00D2FF] rounded-full blur-[160px]"
      />
      {/* Hyper Magenta Orb */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.08, 0.15, 0.08],
          x: [0, 100, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-[20%] right-[20%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#FF0066] rounded-full blur-[120px]"
      />
    </div>
  );
};
