// App.tsx
import React from 'react';
import { WireframeHome } from './components/WireframeHome';
import { WireframeAuth } from './components/WireframeAuth';
import { WireframeSummary } from './components/WireframeSummary';

type Screen = 'home' | 'auth';

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>('home');
  const [summary, setSummary] = React.useState<string | null>(null);
  const [keyPoints, setKeyPoints] = React.useState<
    { title: string; detail: string }[]>([]);

  // If summary works from the AI, show the summary screen
  if (summary) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <WireframeSummary
            summary={summary}
            keyPoints={keyPoints}
            onBack={() => {
              setSummary(null);
              setKeyPoints([]);
            }}
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

        {/* Wireframe Content */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-gray-300 p-8">
          {currentScreen === 'home' && (
            <WireframeHome
              onNext={(aiSummary) => {
                setSummary(aiSummary);
                setKeyPoints(keyPoints ?? []);
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