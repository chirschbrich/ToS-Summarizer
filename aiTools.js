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
    return 'No text could be extracted from this PDF.';
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'You summarize Terms of Service documents. Highlight key obligations, risks, data usage, and anything surprising. Keep it concise but complete.',
      },
      {
        role: 'user',
        content: `Summarize the following Terms of Service:\n\n${promptText}`,
      },
    ],
  });

  return (
    completion.choices?.[0]?.message?.content ??
    'No summary returned from OpenAI.'
  );
}

async function summarizePdfBuffer(pdfBuffer) {
  const text = await extractPdfText(pdfBuffer);
  return summarizeTermsOfService(text);
}

module.exports = {
  extractPdfText,
  summarizeTermsOfService,
  summarizePdfBuffer,
};