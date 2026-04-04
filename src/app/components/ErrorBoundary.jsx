import React from "react";

// Just export the class directly
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.error("DenimHub Error Log:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-[#e31837] font-bold tracking-tighter text-3xl italic uppercase">
            SYSTEM ERROR // ARCHIVE DISCONNECTED
          </h2>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-white/50 text-xs underline tracking-[0.2em] uppercase"
          >
            RETRY CONNECTION
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
