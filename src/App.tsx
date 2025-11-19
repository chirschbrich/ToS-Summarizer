// App.tsx
import React from 'react';
import { WireframeHome } from './components/WireframeHome';
import { WireframeAuth } from './components/WireframeAuth';
import { WireframeSummary } from './components/WireframeSummary';
import { cleanupDocuments } from './components/services/uploadHandler';

type Screen = 'home' | 'auth';

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>('auth');
  const [summary, setSummary] = React.useState<string | null>(null);
  const [keyPoints, setKeyPoints] = React.useState<
    { title: string; detail: string }[]>([]);
  const [fullText, setFullText] = React.useState<string>('');
  const [highRiskClauses, setHighRiskClauses] = React.useState<
    { section: string; title: string; risk: string; excerpt: string }[]>([]);

  // If summary works from the AI, show the summary screen
  if (summary) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <WireframeSummary
            summary={summary}
            keyPoints={keyPoints}
            fullText={fullText}
            highRiskClauses={highRiskClauses}
            onBack={() => {
              cleanupDocuments();
              setSummary(null);
              setKeyPoints([]);
              setFullText('');
              setHighRiskClauses([]);
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
          <h1 className="text-gray-900 mb-2">ToS Summarizer</h1>
        </div>

        {/* Wireframe Content */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-gray-300 p-8">
          {currentScreen === 'home' && (
            <WireframeHome
              onNext={(aiSummary, aiKeyPoints, aiFullText, aiHighRiskClauses) => {
                setSummary(aiSummary);
                setKeyPoints(aiKeyPoints ?? []);
                setFullText(aiFullText ?? '');
                setHighRiskClauses(aiHighRiskClauses ?? []);
              }}
            />
          )}

          {currentScreen === 'auth' && (
            <WireframeAuth
              onNext={() => {
                setCurrentScreen('home');
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}