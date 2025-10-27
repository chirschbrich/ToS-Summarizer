import { useState } from 'react';
import { WireframeHome } from './components/WireframeHome';
import { WireframeAuth } from './components/WireframeAuth';
import { WireframeSummary } from './components/WireframeSummary';

type Screen = 'home' | 'auth' | 'summary';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">ToS Summarizer - Wireframes</h1>
          <p className="text-gray-600">Browser Extension Interface Mockups</p>
        </div>

        {/* Screen Navigation */}
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
          <button
            onClick={() => setCurrentScreen('summary')}
            className={`px-4 py-2 rounded border-2 ${
              currentScreen === 'summary'
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-white text-gray-700'
            }`}
          >
            3. Summary Results
          </button>
        </div>

        {/* Wireframe Content */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-gray-300 p-8">
          {currentScreen === 'home' && <WireframeHome onNext={() => setCurrentScreen('auth')} />}
          {currentScreen === 'auth' && <WireframeAuth onNext={() => setCurrentScreen('summary')} />}
          {currentScreen === 'summary' && <WireframeSummary />}
        </div>
      </div>
    </div>
  );
}
