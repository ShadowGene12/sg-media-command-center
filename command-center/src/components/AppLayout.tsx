import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  // For now, mock authentication. Will be replaced with real auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader 
        isAuthenticated={isAuthenticated}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <main className="flex-1">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}
