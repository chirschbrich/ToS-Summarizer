import { AlertCircle, FileText, ArrowLeft, Download, Share2 } from 'lucide-react';
import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';

interface WireframeSummaryProps {
  summary: string;
  keyPoints: { title: string; detail: string; }[];
  fullText?: string;
  highRiskClauses?: { section: string; title: string; risk: string; excerpt: string; }[];
  onBack: () => void;
}

export function WireframeSummary({ summary, keyPoints, fullText = '', highRiskClauses = [], onBack }: WireframeSummaryProps) {
  const [showFullDocument, setShowFullDocument] = React.useState(false);

  // Helper function to render document with highlighted clauses
  const renderDocumentWithHighlights = (text: string, clauses: { excerpt: string; risk: string; }[]) => {
    if (!text || clauses.length === 0) {
      return text;
    }

    // Split text into parts and highlight matching excerpts
    const parts: any[] = [];
    let lastIndex = 0;
    
    // Create a list of all excerpts with their positions
    const excerptPositions: { start: number; end: number; risk: string; }[] = [];
    
    clauses.forEach(clause => {
      if (clause.excerpt) {
        const index = text.indexOf(clause.excerpt);
        if (index !== -1) {
          excerptPositions.push({
            start: index,
            end: index + clause.excerpt.length,
            risk: clause.risk
          });
        }
      }
    });

    // Sort by start position
    excerptPositions.sort((a, b) => a.start - b.start);

    // Build the highlighted text
    excerptPositions.forEach((pos, i) => {
      // Add text before the highlight
      if (pos.start > lastIndex) {
        parts.push(text.substring(lastIndex, pos.start));
      }

      // Add the highlighted text
      const bgColor = pos.risk === 'High' ? 'bg-yellow-300' : 
                      pos.risk === 'Medium' ? 'bg-yellow-200' : 
                      'bg-yellow-100';
      parts.push(
        <span key={`highlight-${i}`} className={`${bgColor} px-1 rounded`}>
          {text.substring(pos.start, pos.end)}
        </span>
      );

      lastIndex = pos.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Browser Extension Summary Screen */}
      <div className="border-2 border-gray-400 rounded-lg bg-gray-100">
        {/* Header */}
        <div className="p-6 border-b-2 border-gray-400 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-gray-900">ToS Summary Complete</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="border-3 border-gray-400 bg-white">
              <TabsTrigger value="summary" className="border-r-2 border-gray-400 cursor-pointer">
                Summary
              </TabsTrigger>
              <TabsTrigger value="highlights" className="border-r-2 border-gray-400 cursor-pointer">
                Key Clauses
              </TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="mt-4 space-y-4">
              <Card className="border-2 border-gray-300 p-4 bg-white">
                <div className="mb-3">
                  <Badge className="bg-gray-200 text-gray-900 border-2 border-gray-400">
                    Objective Analysis
                  </Badge>
                </div>
                <h3 className="text-gray-900 mb-3">Executive Summary</h3>
                <div className="space-y-2 text-sm text-gray-800 whitespace-pre-wrap">
                  {summary}
                </div>
              </Card>

              {/* Dynamic Key Points */}
              <Card className="border-2 border-gray-300 p-4 bg-white">
                <h3 className="text-gray-900 mb-3">Key Points</h3>
                <div className="space-y-3">
                  {(keyPoints.length ? keyPoints : []).map((kp, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-900 mb-1">
                          {kp.title || `Key Point ${i + 1}`}
                        </div>
                        <div className="text-sm text-gray-700 whitespace-pre-wrap">
                          {kp.detail}
                        </div>
                      </div>
                    </div>
                  ))}

                  {!keyPoints.length && (
                    <div className="text-sm text-gray-500">
                      No key points were extracted from this document.
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* Key Clauses Tab */}
            <TabsContent value="highlights" className="mt-4 space-y-4">
              {!showFullDocument ? (
                <>
                  <Card className="border-2 border-gray-300 p-4 bg-white">
                    <h3 className="text-gray-900 mb-3">Highlighted Important Clauses</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      AI-identified sections dealing with private data and privacy
                    </p>

                    <div className="space-y-3">
                      {(highRiskClauses.length > 0 ? highRiskClauses : [
                        { section: 'Section 3.2', title: 'Personal Data Collection', risk: 'High', excerpt: '' },
                        { section: 'Section 5.1', title: 'Third-Party Data Sharing', risk: 'High', excerpt: '' },
                        { section: 'Section 7.4', title: 'Tracking and Cookies', risk: 'Medium', excerpt: '' },
                        { section: 'Section 9.1', title: 'Data Security Measures', risk: 'Low', excerpt: '' },
                      ]).map((item, i) => (
                        <div key={i} className="p-4 border-2 border-gray-300 rounded bg-yellow-50 hover:bg-yellow-100">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-600" />
                              <span className="text-gray-900 font-semibold">{item.title}</span>
                            </div>
                            <Badge 
                              className={`
                                ${item.risk === 'High' ? 'bg-red-100 text-red-700 border-red-300' : ''}
                                ${item.risk === 'Medium' ? 'bg-orange-100 text-orange-700 border-orange-300' : ''}
                                ${item.risk === 'Low' ? 'bg-blue-100 text-blue-700 border-blue-300' : ''}
                                border-2
                              `}
                            >
                              {item.risk} Risk
                            </Badge>
                          </div>
                          {item.excerpt ? (
                            <div className="text-sm text-gray-700 italic">
                              "{item.excerpt}"
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="h-2 bg-gray-300 rounded w-full"></div>
                              <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                              <div className="h-2 bg-gray-300 rounded w-4/6"></div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Button 
                    onClick={() => setShowFullDocument(true)}
                    className="w-full border-2 border-gray-400 bg-white text-gray-900 hover:bg-gray-100 cursor-pointer"
                  >
                    View Full Document with Highlights
                  </Button>
                </>
              ) : (
                <>
                  <Card className="border-2 border-gray-300 p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-900">Full Document with Highlights</h3>
                      <Button 
                        onClick={() => setShowFullDocument(false)}
                        variant="outline"
                        className="border-2 border-gray-400 cursor-pointer"
                      >
                        Back to Clauses
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      High-risk clauses are highlighted in yellow
                    </div>
                    
                    <div className="max-h-[600px] overflow-y-auto p-4 bg-gray-50 rounded border-2 border-gray-200">
                      <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {renderDocumentWithHighlights(fullText, highRiskClauses)}
                      </div>
                    </div>
                  </Card>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t-2 border-gray-400 bg-white">
          <div className="flex gap-3">
            <Button
              onClick={onBack}
              className="flex-2 bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900 cursor-pointer"
            >
              Analyze Another
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
