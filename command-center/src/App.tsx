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

// Public funnel pages
import DetectorEntry from "./pages/detector/DetectorEntry";
import DetectorFlow from "./pages/detector/DetectorFlow";
import DetectorAnalyzing from "./pages/detector/DetectorAnalyzing";
import DetectorResults from "./pages/detector/DetectorResults";

// Auth pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Shell pages
import HomeDashboard from "./pages/HomeDashboard";
import DiagnosticsHub from "./pages/DiagnosticsHub";
import PillarsHub from "./pages/PillarsHub";
import ToolsLibrary from "./pages/ToolsLibrary";
import ProfitCalculator from "./pages/tools/ProfitCalculator";
import ActionPlan from "./pages/ActionPlan";
import ReviewsHub from "./pages/ReviewsHub";
import TemplatesLibrary from "./pages/TemplatesLibrary";

// New Tier A surfaces
import DetectorHistory from "./pages/detector/DetectorHistory";

import LibraryHub from "./pages/library/LibraryHub";
import LibrarySOPDetail from "./pages/library/LibrarySOPDetail";
import LibrarySaved from "./pages/library/LibrarySaved";

import PathwaysHub from "./pages/pathways/PathwaysHub";
import PathwayHome from "./pages/pathways/PathwayHome";
import PathwayStep from "./pages/pathways/PathwayStep";

import SprintsHub from "./pages/sprints/SprintsHub";
import SprintWizard from "./pages/sprints/SprintWizard";
import SprintDetail from "./pages/sprints/SprintDetail";
import SprintCheckIn from "./pages/sprints/SprintCheckIn";

import AIAdvisorHub from "./pages/advisor/AIAdvisorHub";

import WorkspaceHub from "./pages/workspace/WorkspaceHub";
import WorkspaceCanvas from "./pages/workspace/WorkspaceCanvas";

import SettingsLayout from "./pages/settings/SettingsLayout";
import BillingSettings from "./pages/settings/BillingSettings";
import OrganizationSettings from "./pages/settings/OrganizationSettings";
import AccountSettings from "./pages/AccountSettings";

import Pricing from "./pages/Pricing";
import Upgrade from "./pages/Upgrade";
import NotFound from "./pages/NotFound";

// DFY Client pages
import ClientOverview from "./pages/client/Overview";
import ClientReports from "./pages/client/Reports";
import ClientKPIs from "./pages/client/KPIs";
import ClientActionPlan from "./pages/client/ActionPlan";
import ClientDocuments from "./pages/client/Documents";
import ClientTimeline from "./pages/client/Timeline";
import ClientWeeklyReview from "./pages/client/WeeklyReview";
import ClientMonthlyReview from "./pages/client/MonthlyReview";
import ClientQuarterlyReview from "./pages/client/QuarterlyReview";
import ClientRecommendations from "./pages/client/Recommendations";
import ClientAccount from "./pages/client/Account";

import { AnimatedBackground } from "./components/AnimatedBackground";

const queryClient = new QueryClient();

const CommandCenterLayout = () => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen w-full bg-transparent relative overflow-hidden">
      <AnimatedBackground />
      <CommandPalette />
      <AppSidebar />
      <div className="flex flex-col flex-1 min-w-0 z-10">
        <AppHeader />
        <main className="flex-1 overflow-auto p-4 md:p-8 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0, ease: "circOut" }}
              className="w-full h-full"
            >
              <Outlet />
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
            {/* Home */}
            <Route path="/" element={<HomeDashboard />} />
            
            {/* Detector */}
            <Route path="/detector/results/:id" element={<DetectorResults />} />
            <Route path="/detector/history" element={<DetectorHistory />} />
            
            {/* Library */}
            <Route path="/library/learnings" element={<LibraryHub category="Learnings" />} />
            <Route path="/library/sops" element={<LibraryHub category="SOPs" />} />
            <Route path="/library/playbooks" element={<LibraryHub category="Playbooks" />} />
            <Route path="/library/frameworks" element={<LibraryHub category="Frameworks" />} />
            <Route path="/library/saved" element={<LibrarySaved />} />
            <Route path="/library/:slug" element={<LibrarySOPDetail />} />

            {/* Workspace */}
            <Route path="/workspace" element={<WorkspaceHub />} />
            <Route path="/workspace/:id" element={<WorkspaceCanvas />} />

            {/* AI Advisor */}
            <Route path="/advisor" element={<AIAdvisorHub />} />

            {/* Pathways */}
            <Route path="/pathways" element={<PathwaysHub />} />
            <Route path="/pathways/:slug" element={<PathwayHome />} />
            <Route path="/pathways/:slug/step/:stepId" element={<PathwayStep />} />

            {/* Sprints */}
            <Route path="/sprints" element={<SprintsHub />} />
            <Route path="/sprints/new" element={<SprintWizard />} />
            <Route path="/sprints/:id" element={<SprintDetail />} />
            <Route path="/sprints/:id/checkin" element={<SprintCheckIn />} />

            {/* Growth Engine (Legacy/Other) */}
            <Route path="/diagnostics" element={<DiagnosticsHub />} />
            <Route path="/pillars" element={<PillarsHub />} />
            <Route path="/tools" element={<ToolsLibrary />} />
            <Route path="/tools/profit-calculator" element={<ProfitCalculator />} />
            
            {/* Execution */}
            <Route path="/actions" element={<ActionPlan />} />
            <Route path="/reviews" element={<ReviewsHub />} />
            <Route path="/templates" element={<TemplatesLibrary />} />
            
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
