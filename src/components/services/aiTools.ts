import * as pdfParse from 'pdf-parse';
import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!process.env.OPENAI_API_KEY) { // heads-up console log for missing api key
  console.warn('OPENAI_API_KEY not set. Summarization will fail.');
}

/**
 * Extracts text from a PDF buffer.
 */
export async function extractPdfText(pdfBuffer: Buffer): Promise<string> {
    const pdfData = await (pdfParse as any)(pdfBuffer);
    return pdfData.text || '';
  }

// Summarizes ToS text using OpenAI.
export async function summarizeTermsOfService(text: string): Promise<string> {
  const maxChars = 8000;
  const promptText = text.length > maxChars ? text.slice(0, maxChars) : text;

  if (!promptText.trim()) {
    return 'No text could be extracted from this PDF.';
  }

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-nano', // adjust to the model you want
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

/**
 * Convenience function: given a PDF buffer, extract text and summarize.
 */
export async function summarizePdfBuffer(pdfBuffer: Buffer): Promise<string> {
  const text = await extractPdfText(pdfBuffer);
  return summarizeTermsOfService(text);
}