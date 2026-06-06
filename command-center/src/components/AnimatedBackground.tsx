export const AnimatedBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-[-2] bg-[#050505]">
    {/* Central radial base */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,rgba(109,74,230,0.065),transparent_65%)]" />

    {/* Orb 1 — violet, top-left */}
    <div
      className="absolute rounded-full blur-[160px] orb-float-1"
      style={{ top: "-20%", left: "-10%", width: "55vw", height: "55vw", background: "rgba(109,74,230,0.08)" }}
    />

    {/* Orb 2 — purple/fuchsia, bottom-right */}
    <div
      className="absolute rounded-full blur-[180px] orb-float-2"
      style={{ bottom: "-20%", right: "-10%", width: "65vw", height: "65vw", background: "rgba(139,43,196,0.045)" }}
    />

    {/* Orb 3 — cyan, top-right accent */}
    <div
      className="absolute rounded-full blur-[200px]"
      style={{
        top: "10%", right: "5%",
        width: "30vw", height: "30vw",
        background: "rgba(0,210,255,0.025)",
        animation: "orbFloat2 35s ease-in-out infinite",
        animationDelay: "8s",
      }}
    />

    {/* Orb 4 — amber, bottom-left subtle */}
    <div
      className="absolute rounded-full blur-[220px]"
      style={{
        bottom: "5%", left: "15%",
        width: "25vw", height: "25vw",
        background: "rgba(245,158,11,0.018)",
        animation: "orbFloat1 40s ease-in-out infinite",
        animationDelay: "15s",
      }}
    />

    {/* Subtle dot grid — viewport centred */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse at 50% 40%, black 5%, transparent 70%)",
        opacity: 0.4,
      }}
    />

    {/* Horizontal scan line — very subtle */}
    <div
      className="absolute left-0 right-0 h-px"
      style={{
        top: "50%",
        background: "linear-gradient(to right, transparent, rgba(109,74,230,0.08) 30%, rgba(109,74,230,0.08) 70%, transparent)",
      }}
    />
  </div>
);
