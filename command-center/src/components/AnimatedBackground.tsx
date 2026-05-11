export const AnimatedBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-[-2] bg-[#050505]">
    {/* Static radial base — no animation, no flicker */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(ellipse_at_center,rgba(109,74,230,0.07),transparent_65%)]" />

    {/* Orb 1 — violet, pure CSS so no React re-renders */}
    <div
      className="absolute rounded-full blur-[160px] orb-float-1"
      style={{ top: "-20%", left: "-10%", width: "50vw", height: "50vw", background: "rgba(109,74,230,0.07)" }}
    />

    {/* Orb 2 — purple/fuchsia blend */}
    <div
      className="absolute rounded-full blur-[180px] orb-float-2"
      style={{ bottom: "-20%", right: "-10%", width: "60vw", height: "60vw", background: "rgba(139,43,196,0.04)" }}
    />

    {/* Subtle grid */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.08) 1px,transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(circle at 50% 40%, black 10%, transparent 75%)",
      }}
    />
  </div>
);
