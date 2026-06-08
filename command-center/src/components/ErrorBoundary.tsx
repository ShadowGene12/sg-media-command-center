import React from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-red-500 p-8 flex flex-col items-center justify-center font-mono">
          <h1 className="text-3xl mb-4 font-bold">REACT COMPONENT CRASH</h1>
          <div className="bg-red-950/30 p-6 rounded-xl border border-red-500/50 max-w-4xl w-full overflow-auto">
            <pre className="whitespace-pre-wrap">{this.state.error?.toString()}</pre>
            <pre className="mt-4 text-sm text-red-400/80 whitespace-pre-wrap">
              {this.state.error?.stack}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
