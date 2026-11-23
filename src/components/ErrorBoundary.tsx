import React from 'react';

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error?.message || 'Unexpected error occurred.' };
  }

  componentDidCatch(error: Error): void {
    console.error('Application ErrorBoundary caught:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F8FA] flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-white border border-[#D9E2EC] rounded-xl p-8">
            <h1 className="text-xl font-bold text-[#102A43]">Something went wrong</h1>
            <p className="mt-3 text-sm text-[#486581] leading-relaxed">
              We encountered an unexpected issue while loading this section of Ved&apos;s Medcare.
              Please reload the page or return to the homepage.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, message: '' });
                  window.location.href = '/';
                }}
                className="px-4 py-2 text-sm font-medium bg-[#102A43] text-white rounded-lg hover:bg-[#1D3B58] transition-colors"
              >
                Return Home
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-sm font-medium border border-[#D9E2EC] text-[#102A43] rounded-lg hover:bg-[#F5F8FA] transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
