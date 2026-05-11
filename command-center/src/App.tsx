import React, { Suspense } from "react";
import { PageSkeleton } from "./components/PageSkeleton";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Shell
import { AppSidebar } from "./components/AppSidebar";
import { AppHeader } from "./components/AppHeader";
import { CommandPalette } from "./components/CommandPalette";
import { AnimatedBackground } from "./components/AnimatedBackground";

// Premium Loading Screen
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh] w-full">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5],
        filter: ["blur(4px)", "blur(0px)", "blur(4px)"]
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="w-8 h-8 rounded-full bg-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.5)]"
    />
  </div>
);

// Lazy Loaded Routes
const HomeDashboard = React.lazy(() => import("./pages/HomeDashboard"));

// Public funnel pages
const DetectorEntry = React.lazy(() => import("./pages/detector/DetectorEntry"));
const DetectorFlow = React.lazy(() => import("./pages/detector/DetectorFlow"));
const DetectorAnalyzing = React.lazy(() => import("./pages/detector/DetectorAnalyzing"));
const DetectorResults = React.lazy(() => import("./pages/detector/DetectorResults"));
const DetectorHistory = React.lazy(() => import("./pages/detector/DetectorHistory"));

// Auth & Pricing pages
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const Upgrade = React.lazy(() => import("./pages/Upgrade"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Shell pages - Knowledge
const LibraryHub = React.lazy(() => import("./pages/library/LibraryHub"));
const LibrarySOPDetail = React.lazy(() => import("./pages/library/LibrarySOPDetail"));
const LibrarySaved = React.lazy(() => import("./pages/library/LibrarySaved"));

// Shell pages - Strategy
const SprintsHub = React.lazy(() => import("./pages/sprints/SprintsHub"));
const SprintWizard = React.lazy(() => import("./pages/sprints/SprintWizard"));
const SprintDetail = React.lazy(() => import("./pages/sprints/SprintDetail"));
const SprintCheckIn = React.lazy(() => import("./pages/sprints/SprintCheckIn"));
const PathwaysHub = React.lazy(() => import("./pages/pathways/PathwaysHub"));
const PathwayHome = React.lazy(() => import("./pages/pathways/PathwayHome"));
const PathwayStep = React.lazy(() => import("./pages/pathways/PathwayStep"));
const ReviewsHub = React.lazy(() => import("./pages/ReviewsHub"));

// Shell pages - Execution
const WorkspaceHub = React.lazy(() => import("./pages/workspace/WorkspaceHub"));
const WorkspaceCanvas = React.lazy(() => import("./pages/workspace/WorkspaceCanvas"));
const ActionPlan = React.lazy(() => import("./pages/ActionPlan"));
const TemplatesLibrary = React.lazy(() => import("./pages/TemplatesLibrary"));
const ToolsLibrary = React.lazy(() => import("./pages/ToolsLibrary"));
const ProfitCalculator = React.lazy(() => import("./pages/tools/ProfitCalculator"));
const AIAdvisorHub = React.lazy(() => import("./pages/advisor/AIAdvisorHub"));
const DiagnosticsHub = React.lazy(() => import("./pages/DiagnosticsHub"));
const PillarsHub = React.lazy(() => import("./pages/PillarsHub"));

// Shell pages - Settings
const SettingsLayout = React.lazy(() => import("./pages/settings/SettingsLayout"));
const BillingSettings = React.lazy(() => import("./pages/settings/BillingSettings"));
const OrganizationSettings = React.lazy(() => import("./pages/settings/OrganizationSettings"));
const AccountSettings = React.lazy(() => import("./pages/AccountSettings"));

// DFY Client pages
const ClientOverview = React.lazy(() => import("./pages/client/Overview"));
const ClientReports = React.lazy(() => import("./pages/client/Reports"));
const ClientKPIs = React.lazy(() => import("./pages/client/KPIs"));
const ClientActionPlan = React.lazy(() => import("./pages/client/ActionPlan"));
const ClientDocuments = React.lazy(() => import("./pages/client/Documents"));
const ClientTimeline = React.lazy(() => import("./pages/client/Timeline"));
const ClientWeeklyReview = React.lazy(() => import("./pages/client/WeeklyReview"));
const ClientMonthlyReview = React.lazy(() => import("./pages/client/MonthlyReview"));
const ClientQuarterlyReview = React.lazy(() => import("./pages/client/QuarterlyReview"));
const ClientRecommendations = React.lazy(() => import("./pages/client/Recommendations"));
const ClientAccount = React.lazy(() => import("./pages/client/Account"));

const queryClient = new QueryClient();

const CommandCenterLayout = () => {
  const location = useLocation();
  return (
    <div className="flex h-screen w-full bg-transparent overflow-hidden">
      <AnimatedBackground />
      <CommandPalette />
      <AppSidebar />
      <div className="flex flex-col flex-1 min-w-0 z-10 overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15, scale: 0.99, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -15, scale: 0.99, filter: "blur(4px)" }}
              transition={{ duration: 0.4, type: "spring", bounce: 0, ease: "circOut" }}
              className="w-full h-full"
            >
              <Suspense fallback={<PageSkeleton />}>
                <Outlet />
              </Suspense>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="h-screen w-screen bg-[#050505] flex items-center justify-center"><PageLoader /></div>}>
          <Routes>
            {/* Public Funnel Routes (No Shell) */}
            <Route path="/detector" element={<DetectorEntry />} />
            <Route path="/detector/flow" element={<DetectorFlow />} />
            <Route path="/detector/analyzing" element={<DetectorAnalyzing />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* Auth Routes (No Shell) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Command Center Shell Routes */}
            <Route element={<CommandCenterLayout />}>
              <Route path="/" element={<HomeDashboard />} />

              {/* Detector & Diagnostics */}
              <Route path="/detector/results/:id" element={<DetectorResults />} />
              <Route path="/detector/history" element={<DetectorHistory />} />
              <Route path="/diagnostics" element={<DiagnosticsHub />} />
              <Route path="/pillars" element={<PillarsHub />} />

              {/* Knowledge / Library */}
              <Route path="/library/learnings" element={<LibraryHub category="Learnings" />} />
              <Route path="/library/sops" element={<LibraryHub category="SOPs" />} />
              <Route path="/library/playbooks" element={<LibraryHub category="Playbooks" />} />
              <Route path="/library/frameworks" element={<LibraryHub category="Frameworks" />} />
              <Route path="/library/saved" element={<LibrarySaved />} />
              <Route path="/library/:slug" element={<LibrarySOPDetail />} />

              {/* Strategy / Pathways / Sprints */}
              <Route path="/pathways" element={<PathwaysHub />} />
              <Route path="/pathways/:slug" element={<PathwayHome />} />
              <Route path="/pathways/:slug/step/:stepId" element={<PathwayStep />} />
              <Route path="/sprints" element={<SprintsHub />} />
              <Route path="/sprints/new" element={<SprintWizard />} />
              <Route path="/sprints/:id" element={<SprintDetail />} />
              <Route path="/sprints/:id/checkin" element={<SprintCheckIn />} />
              <Route path="/reviews" element={<ReviewsHub />} />

              {/* Execution / Workspace / Tools */}
              <Route path="/workspace" element={<WorkspaceHub />} />
              <Route path="/workspace/:id" element={<WorkspaceCanvas />} />
              <Route path="/actions" element={<ActionPlan />} />
              <Route path="/templates" element={<TemplatesLibrary />} />
              <Route path="/tools" element={<ToolsLibrary />} />
              <Route path="/tools/profit-calculator" element={<ProfitCalculator />} />
              <Route path="/advisor" element={<AIAdvisorHub />} />

              {/* Settings & Upgrade */}
              <Route path="/settings" element={<SettingsLayout />}>
                <Route index element={<Navigate to="/settings/account" replace />} />
                <Route path="account" element={<AccountSettings />} />
                <Route path="billing" element={<BillingSettings />} />
                <Route path="organization" element={<OrganizationSettings />} />
                <Route path="*" element={<Navigate to="/settings/account" replace />} />
              </Route>
              <Route path="/upgrade" element={<Upgrade />} />

              {/* DFY Client Tier */}
              <Route path="/client" element={<ClientOverview />} />
              <Route path="/client/reports" element={<ClientReports />} />
              <Route path="/client/kpis" element={<ClientKPIs />} />
              <Route path="/client/action-plan" element={<ClientActionPlan />} />
              <Route path="/client/documents" element={<ClientDocuments />} />
              <Route path="/client/timeline" element={<ClientTimeline />} />
              <Route path="/client/reviews/weekly" element={<ClientWeeklyReview />} />
              <Route path="/client/reviews/monthly" element={<ClientMonthlyReview />} />
              <Route path="/client/reviews/quarterly" element={<ClientQuarterlyReview />} />
              <Route path="/client/recommendations" element={<ClientRecommendations />} />
              <Route path="/client/account" element={<ClientAccount />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;