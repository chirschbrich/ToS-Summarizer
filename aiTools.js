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
    };
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
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
            "  ]",
            "}",
            "",
            "summary = a concise overview of how the service handles user data & agreements.",
            "keyPoints = exactly 4 items, each focused on user data and agreements.",
            "- Use clear, non-legal wording.",
            "- Do NOT include any extra keys beyond summary and keyPoints.",
          ].join('\n'),
        },
        {
          role: 'user',
          content: [
            "Read the following Terms of Service text and then:",
            "",
            "1) Produce a concise overall summary focused on user data collection, usage, sharing, retention, tracking, and user obligations.",
            "2) Provide exactly 4 keyPoints, each with:",
            "   - title: a short label like 'Data Sharing with Partners'.",
            "   - detail: 1-2 sentences explaining the point.",
            "",
            "Return ONLY valid JSON with keys: summary, keyPoints.",
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
      };
    }

    // Basic guard: enforce expected shape
    const summary = typeof parsed.summary === 'string' ? parsed.summary : 'No summary returned.';
    const keyPoints = Array.isArray(parsed.keyPoints) ? parsed.keyPoints.slice(0, 4) : [];

    return { summary, keyPoints };
  } catch (err) {
    console.error('OpenAI summarize error:', err);
    return {
      summary: 'Failed to summarize due to an OpenAI error.',
      keyPoints: [],
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