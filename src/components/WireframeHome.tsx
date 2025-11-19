import { Upload, FileText } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import React from 'react';
import { uploadPDF } from './services/uploadHandler'; // upload logic

interface KeyPoint { title: string; detail: string }
interface HighRiskClause { section: string; title: string; risk: string; excerpt: string }
interface WireframeHomeProps {
  onNext: (summary: string, keyPoints: KeyPoint[], fullText?: string, highRiskClauses?: HighRiskClause[]) => void;
}

export function WireframeHome({ onNext }: WireframeHomeProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isSummarizing, setIsSummarizing] = React.useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    console.log('handleFileChange selected:', selected);
    setFile(selected);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a PDF file before submitting.');
      return;
    }

    try {
      setIsSummarizing(true);
      const response = await uploadPDF(file);
      console.log('Upload response in handleSubmit:', response);

      const summary = response.summary ?? 'No summary returned';
      const keyPoints = response.keyPoints ?? [];
      const fullText = response.fullText ?? '';
      const highRiskClauses = response.highRiskClauses ?? [];
      // navigate to summary screen with AI summary
      onNext(summary, keyPoints, fullText, highRiskClauses);

      // clear after SUCCESS
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload the file.');
      setIsSummarizing(false);
    }
  };

  const handleCancelUpload = () => {
    setFile(null); // Clear the selected file
    if(fileInputRef.current) {
      fileInputRef.current.value = ''; //reset the file input
    }
  };

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
            <div className="text-sm text-gray-500">v1.0</div>
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-2">Analyze Terms of Service</h2>
          <p className="text-sm text-gray-600">
            Get AI-powered summaries with privacy highlights
          </p>
        </div>

      {/* PDF Upload Section */}
      <div className="space-y-3 mb-6">
        <label htmlFor="pdf-upload" className="block">
          <div className="border-2 border-gray-300 p-4 rounded-lg hover:border-gray-500 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-gray-400 rounded flex items-center justify-center bg-white">
                <Upload className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="text-gray-900 mb-1">Upload Document</div>
                <div className="text-sm text-gray-500">PDF file</div>
              </div>
            </div>
          </div>

          {/* Hidden input inside label */}
          <input
            id="pdf-upload"
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* File Card */}
      {file && (
          <div className="mb-6 p-3 border-2 border-gray-300 rounded bg-white flex items-center justify-between">
            <div className="text-gray-900">{file.name}</div>
            <button
              onClick={handleCancelUpload}
              className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center bg-white hover:border-gray-500 transition-colors cursor-pointer"
              >
              X
            </button>
          </div>
        )}
      
      {/* Action Button */}
        <Button
          onClick={handleSubmit}
          className="w-full bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!file || isSummarizing} // Disable if no file or during summarize
        >
          {isSummarizing ? 'Summarizing...' : 'Submit'}
        </Button>
        
        {/* Footer Info */}
        <div className="mt-4 p-3 border-2 border-gray-300 rounded bg-white">
          <div className="text-xs text-gray-600">
            ℹ️ Non-intrusive • No account needed • 2FA protected
          </div>
        </div>
      </div>
    </div>
  );
}