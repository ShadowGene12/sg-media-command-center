import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface State { hasError: boolean; error: Error | null }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback?: React.ReactNode }, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] space-y-5 text-center px-6">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-display font-light text-white mb-1">Something went wrong</h3>
            <p className="text-sm text-slate-500 font-mono max-w-xs">
              {this.state.error?.message ?? "An unexpected error occurred."}
            </p>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="text-violet-400 hover:text-violet-300 border border-violet-500/20 hover:bg-violet-500/10 gap-2 rounded-xl"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
