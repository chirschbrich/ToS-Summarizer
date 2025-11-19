const pdfParse = require('pdf-parse').default || require('pdf-parse');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!process.env.OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY not set. Summarization will fail.');
}

async function extractPdfText(pdfBuffer) {
  const pdfData = await pdfParse(pdfBuffer);
  return pdfData.text || '';
}

async function summarizeTermsOfService(text) {
  const maxChars = 8000;
  const promptText = text.length > maxChars ? text.slice(0, maxChars) : text;

  if (!promptText.trim()) {
    return {
      summary: 'No text could be extracted from this PDF.',
      keyPoints: [],
      fullText: text,
      highRiskClauses: [],
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: [
            "You are a Terms of Service analysis assistant.",
            "Return your answer as a strict JSON object with this shape:",
            "",
            "{",
            '  "summary": string,',
            '  "keyPoints": [',
            '    { "title": string, "detail": string },',
            '    { "title": string, "detail": string },',
            '    { "title": string, "detail": string },',
            '    { "title": string, "detail": string }',
            "  ],",
            '  "highRiskClauses": [',
            '    { "section": string, "title": string, "risk": string, "excerpt": string },',
            '    ...',
            "  ]",
            "}",
            "",
            "summary = a concise overview of how the service handles user data & agreements.",
            "keyPoints = exactly 4 items, each focused on user data and agreements.",
            "highRiskClauses = identify 4-8 specific text excerpts that deal with user data collection, tracking, third-party sharing, or privacy concerns.",
            "- Each clause should have:",
            "  * section: empty string (not needed)",
            "  * title: brief descriptive label like 'Personal Data Collection' or 'Third-Party Sharing'",
            "  * risk: 'High', 'Medium', or 'Low'",
            "  * excerpt: the actual verbatim text from the document (20-100 words)",
            "- Use clear, non-legal wording for titles.",
            "- Do NOT include any extra keys beyond summary, keyPoints, and highRiskClauses.",
          ].join('\n'),
        },
        {
          role: 'user',
          content: [
            "Read the following Terms of Service text and then:",
            "",
            "1) Produce a comprehensive and detailed executive summary focused on user data collection, usage, sharing, retention, tracking, and user obligations. The summary should:",
            "   - Be thorough and cover all major aspects of how the service handles user data",
            "   - Explain the implications and potential impacts on users",
            "   - Use clear, accessible language that non-technical users can understand",
            "   - Include specific details about data practices, not just general statements",
            "   - Be at least 10-15 sentences long to provide adequate depth",
            "   - Cover topics like: what data is collected, how it's used, who it's shared with, how long it's kept, user rights, and any notable restrictions or obligations",
            "",
            "2) Provide exactly 4 keyPoints, each with:",
            "   - title: a short label like 'Data Sharing with Partners'.",
            "   - detail: 1-2 sentences explaining the point.",
            "",
            "3) Identify 4-8 highRiskClauses from the document that deal with user data and tracking.",
            "   IMPORTANT: For the 'excerpt' field, copy the EXACT text word-for-word from the document below.",
            "   The excerpt must match the source text EXACTLY (same punctuation, spacing, capitalization).",
            "   This is critical - the excerpts will be used to highlight text in the full document.",
            "",
            "Return ONLY valid JSON with keys: summary, keyPoints, highRiskClauses.",
            "",
            "Here is the Terms of Service text:",
            "",
            promptText,
          ].join('\n'),
        },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content ?? '{}';
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      console.error('Failed to parse OpenAI JSON:', e, raw);
      return {
        summary: 'Failed to parse AI response.',
        keyPoints: [],
        fullText: text,
        highRiskClauses: [],
      };
    }

    // Basic guard: enforce expected shape
    const summary = typeof parsed.summary === 'string' ? parsed.summary : 'No summary returned.';
    const keyPoints = Array.isArray(parsed.keyPoints) ? parsed.keyPoints.slice(0, 4) : [];
    const highRiskClauses = Array.isArray(parsed.highRiskClauses) ? parsed.highRiskClauses : [];

    return { summary, keyPoints, fullText: text, highRiskClauses };
  } catch (err) {
    console.error('OpenAI summarize error:', err);
    return {
      summary: 'Failed to summarize due to an OpenAI error.',
      keyPoints: [],
      fullText: text,
      highRiskClauses: [],
    };
  }
}

async function summarizePdfBuffer(pdfBuffer) {
  const text = await extractPdfText(pdfBuffer);
  console.log('extractPdfText result length:', text.length);
  return summarizeTermsOfService(text);
}

module.exports = {
  extractPdfText,
  summarizeTermsOfService,
  summarizePdfBuffer,
};