import { AlertCircle, FileText, ArrowLeft, Download, Share2 } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

export function WireframeSummary() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Browser Extension Summary Screen */}
      <div className="border-2 border-gray-400 rounded-lg bg-gray-100">
        {/* Header */}
        <div className="p-6 border-b-2 border-gray-400 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
              <div>
                <div className="text-gray-900">ToS Summary Complete</div>
                <div className="text-sm text-gray-500">example-service.com</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center hover:bg-gray-100">
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              <button className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center hover:bg-gray-100">
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Risk Score */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-700">Privacy Risk Score</span>
                <span className="text-gray-900">Medium (6/10)</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-3 border-2 border-gray-400 bg-white">
              <TabsTrigger value="summary" className="border-r-2 border-gray-400">
                Summary
              </TabsTrigger>
              <TabsTrigger value="data-usage" className="border-r-2 border-gray-400">
                Data Usage
              </TabsTrigger>
              <TabsTrigger value="highlights">
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
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
              </Card>

              <Card className="border-2 border-gray-300 p-4 bg-white">
                <h3 className="text-gray-900 mb-3">Key Points</h3>
                <div className="space-y-3">
                  {['Account Terms', 'Service Usage', 'Liability', 'Termination'].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-100">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-900 mb-1">{item}</div>
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4 mt-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Data Usage Tab */}
            <TabsContent value="data-usage" className="mt-4 space-y-4">
              <Card className="border-2 border-yellow-400 bg-yellow-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-gray-900 mb-1">Privacy Alert</div>
                    <div className="text-sm text-gray-700">
                      This service collects and shares personal data with third parties
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="border-2 border-gray-300 p-4 bg-white">
                <h3 className="text-gray-900 mb-4">How Your Data Will Be Used</h3>
                
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="collection" className="border-2 border-gray-300 mb-2 px-4 rounded">
                    <AccordionTrigger className="text-gray-900">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-100 text-red-700 border-2 border-red-300">
                          High Risk
                        </Badge>
                        Data Collection
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">●</span>
                          <span>Personal information (name, email, phone)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">●</span>
                          <span>Location data (precise and approximate)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">●</span>
                          <span>Device information and identifiers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-red-500">●</span>
                          <span>Browsing and usage patterns</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sharing" className="border-2 border-gray-300 mb-2 px-4 rounded">
                    <AccordionTrigger className="text-gray-900">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-orange-100 text-orange-700 border-2 border-orange-300">
                          Medium Risk
                        </Badge>
                        Third-Party Sharing
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500">●</span>
                          <span>Analytics partners (Google, Facebook)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500">●</span>
                          <span>Advertising networks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-orange-500">●</span>
                          <span>Service providers and contractors</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="retention" className="border-2 border-gray-300 mb-2 px-4 rounded">
                    <AccordionTrigger className="text-gray-900">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-300">
                          Low Risk
                        </Badge>
                        Data Retention
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500">●</span>
                          <span>Stored for 24 months after account closure</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500">●</span>
                          <span>Can request deletion at any time</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="rights" className="border-2 border-gray-300 px-4 rounded">
                    <AccordionTrigger className="text-gray-900">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700 border-2 border-green-300">
                          Your Rights
                        </Badge>
                        User Controls
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500">●</span>
                          <span>Right to access your data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500">●</span>
                          <span>Right to data portability</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500">●</span>
                          <span>Right to opt-out of marketing</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </TabsContent>

            {/* Key Clauses Tab */}
            <TabsContent value="highlights" className="mt-4 space-y-4">
              <Card className="border-2 border-gray-300 p-4 bg-white">
                <h3 className="text-gray-900 mb-3">Highlighted Important Clauses</h3>
                <p className="text-sm text-gray-600 mb-4">
                  AI-identified sections dealing with private data and privacy
                </p>

                <div className="space-y-3">
                  {[
                    { section: 'Section 3.2', title: 'Personal Data Collection', risk: 'High' },
                    { section: 'Section 5.1', title: 'Third-Party Data Sharing', risk: 'High' },
                    { section: 'Section 7.4', title: 'Tracking and Cookies', risk: 'Medium' },
                    { section: 'Section 9.1', title: 'Data Security Measures', risk: 'Low' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 border-2 border-gray-300 rounded bg-yellow-50 hover:bg-yellow-100 cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-900">{item.section}</span>
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
                      <div className="text-gray-900 mb-2">{item.title}</div>
                      <div className="space-y-1">
                        <div className="h-2 bg-gray-300 rounded w-full"></div>
                        <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-2 bg-gray-300 rounded w-4/6"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Button className="w-full border-2 border-gray-400 bg-white text-gray-900 hover:bg-gray-100">
                View Full Document with Highlights
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t-2 border-gray-400 bg-white">
          <div className="flex gap-3">
            <Button className="flex-1 border-2 border-gray-400 bg-white text-gray-900 hover:bg-gray-100">
              Analyze Another
            </Button>
            <Button className="flex-1 bg-gray-900 text-white hover:bg-gray-800 border-2 border-gray-900">
              Save Summary
            </Button>
          </div>
        </div>
      </div>

      {/* Annotations */}
      <div className="mt-8 space-y-3 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            5
          </div>
          <div>
            <span className="text-gray-900">User Story:</span> AI highlights important clauses about private data
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            6
          </div>
          <div>
            <span className="text-gray-900">User Story:</span> Clear section showing how user data will be used
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            7
          </div>
          <div>
            <span className="text-gray-900">User Story:</span> Objective summary with concrete answers to minimize bias
          </div>
        </div>
      </div>
    </div>
  );
}
