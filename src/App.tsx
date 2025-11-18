// App.tsx
import React from 'react';
import { WireframeHome } from './components/WireframeHome';
import { WireframeAuth } from './components/WireframeAuth';
import { WireframeSummary } from './components/WireframeSummary';

type Screen = 'home' | 'auth';

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>('home');
  const [summary, setSummary] = React.useState<string | null>(null);

  // If summary works from the AI, show the summary screen
  if (summary) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <WireframeSummary
            summary={summary}
            onBack={() => setSummary(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* header + nav */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">ToS Summarizer - Wireframes</h1>
          <p className="text-gray-600">Browser Extension Interface Mockups</p>
        </div>

        {/* Screen Navigation (home/auth only now) */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className={`px-4 py-2 rounded border-2 ${
              currentScreen === 'home'
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-white text-gray-700'
            }`}
          >
            1. Home Screen
          </button>
          <button
            onClick={() => setCurrentScreen('auth')}
            className={`px-4 py-2 rounded border-2 ${
              currentScreen === 'auth'
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-white text-gray-700'
            }`}
          >
            2. 2FA Verification
          </button>
        </div>

        {/* Wireframe Content */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-gray-300 p-8">
          {currentScreen === 'home' && (
            <WireframeHome
              onNext={(aiSummary) => {
                setSummary(aiSummary);
              }}
            />
          )}

          {currentScreen === 'auth' && (
            <WireframeAuth
              onNext={() => {
                // in this flow, you could move to summary mock WITHOUT AI,
                // or you can just go back to home, depending on your design
                setCurrentScreen('home');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}