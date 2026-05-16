import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const PILLARS = [
  { name: "Market & Offer Clarity", color: "#6D4AE6", score: 2.1 },
  { name: "Customer Acquisition", color: "#378ADD", score: 3.4 },
  { name: "Sales & Conversion", color: "#1D9E75", score: 1.8 },
  { name: "Profit Optimization", color: "#F59E0B", score: 3.9 },
  { name: "Financial Control", color: "#D85A30", score: 2.6 },
];

const DetectorAnalyzing = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  const [pillarIndex, setPillarIndex] = useState(-1);
  const [resolvedPillars, setResolvedPillars] = useState<number[]>([]);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0, 0]);

  // Phase progression
  useEffect(() => {
    const timers = [
      // Phase 0 → 1: "Analyzing your responses..." (1s)
      setTimeout(() => setPhase(1), 1000),
      // Phase 1: pillars appear one-by-one (1s → stagger over 1.5s)
      setTimeout(() => setPillarIndex(0), 1200),
      setTimeout(() => setPillarIndex(1), 1500),
      setTimeout(() => setPillarIndex(2), 1800),
      setTimeout(() => setPillarIndex(3), 2100),
      setTimeout(() => setPillarIndex(4), 2400),
      // Phase 2: scores resolve (2.5s → 3.5s)
      setTimeout(() => setPhase(2), 2800),
      // Phase 3: "Identifying primary bottleneck..." (3.5s)
      setTimeout(() => setPhase(3), 4000),
      // Phase 4: Navigate to results (5s)
      setTimeout(() => {
        navigate("/detector/results-live");
      }, 5500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [navigate]);

  // Animate score counters when phase 2 starts
  useEffect(() => {
    if (phase < 2) return;

    const resolveTimers = PILLARS.map((pillar, i) =>
      setTimeout(() => {
        setResolvedPillars((prev) => [...prev, i]);

        // Animate the counter from 0 to target score
        const target = pillar.score;
        const duration = 600;
        const steps = 20;
        const increment = target / steps;
        let current = 0;

        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          setCounters((prev) => {
            const next = [...prev];
            next[i] = parseFloat(current.toFixed(1));
            return next;
          });
        }, duration / steps);
      }, i * 200)
    );

    return () => resolveTimers.forEach(clearTimeout);
  }, [phase]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 text-center max-w-lg w-full px-4">
        {/* Phase 0 + 1: "Analyzing your responses..." */}
        <AnimatePresence>
          {phase >= 0 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase >= 3 ? 0.3 : 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xl font-display font-medium text-[#F8F9FA] mb-12"
            >
              Analyzing your responses...
            </motion.p>
          )}
        </AnimatePresence>

        {/* Pillar dots + scores */}
        <div className="space-y-5">
          {PILLARS.map((pillar, i) => (
            <AnimatePresence key={pillar.name}>
              {pillarIndex >= i && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="flex items-center justify-between px-4"
                >
                  {/* Left: dot + name */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: pillar.color }}
                      />
                      {/* Scanning pulse — removed once resolved */}
                      {!resolvedPillars.includes(i) && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: pillar.color }}
                          animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeOut",
                          }}
                        />
                      )}
                    </div>
                    <span className="text-sm text-[#A8B2BD] font-medium">
                      {pillar.name}
                    </span>
                  </div>

                  {/* Right: score (appears when resolved) */}
                  <AnimatePresence>
                    {resolvedPillars.includes(i) && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className="font-mono text-lg font-semibold"
                        style={{ color: pillar.color }}
                      >
                        {counters[i].toFixed(1)}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Phase 3: "Identifying primary bottleneck..." */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-lg font-display text-[#F8F9FA] mt-12"
            >
              Identifying primary bottleneck...
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DetectorAnalyzing;
