import { Upload, Camera, FileText } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface WireframeHomeProps {
  onNext: () => void;
}

export function WireframeHome({ onNext }: WireframeHomeProps) {
  return (
    <div className="max-w-md mx-auto">
      {/* Browser Extension Header */}
      <div className="border-2 border-gray-400 rounded-lg p-6 bg-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 border-2 border-gray-600 rounded-lg flex items-center justify-center">
            <FileText className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <div className="text-gray-900">ToS Summarizer</div>
            <div className="text-sm text-gray-500">v1.0 Extension</div>
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-2">Analyze Terms of Service</h2>
          <p className="text-sm text-gray-600">
            Get AI-powered summaries with privacy highlights
          </p>
        </div>

        {/* Input Options */}
        <div className="space-y-3 mb-6">
          <Card className="border-2 border-gray-300 p-4 hover:border-gray-500 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center bg-white">
                <Camera className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Capture Current Page</div>
                <div className="text-sm text-gray-500">
                  Snapshot visible ToS content
                </div>
              </div>
            </div>
          </Card>

          <Card className="border-2 border-gray-300 p-4 hover:border-gray-500 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center bg-white">
                <Upload className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Upload Document</div>
                <div className="text-sm text-gray-500">
                  PDF, TXT, or DOCX file
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Action Button */}
        <Button 
          onClick={onNext}
          className="w-full bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900"
        >
          Continue to Verify
        </Button>

        {/* Footer Info */}
        <div className="mt-4 p-3 border-2 border-gray-300 rounded bg-white">
          <div className="text-xs text-gray-600">
            ℹ️ Non-intrusive • No account needed • 2FA protected
          </div>
        </div>
      </div>

      {/* Annotations */}
      <div className="mt-8 space-y-3 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            1
          </div>
          <div>
            <span className="text-gray-900">User Story:</span> Click button in browser extension to enable summarizer
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            2
          </div>
          <div>
            <span className="text-gray-900">Feature:</span> Two input methods - page capture or file upload
          </div>
        </div>
      </div>
    </div>
  );
}
