// JavaScript
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('Missing OPENAI_API_KEY');
  process.exit(1);
}

const { summarizePdfBuffer } = require('./aiTools.js');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

const upload = multer({ storage: multer.memoryStorage() });

// Function to clean up documents folder
async function cleanupDocuments() {
  try {
    const documentsFolder = path.resolve(process.cwd(), 'documents');
    const files = await fs.promises.readdir(documentsFolder);
    for (const file of files) {
      if (file.endsWith('.pdf')) {
        await fs.promises.unlink(path.join(documentsFolder, file));
        console.log('Deleted:', file);
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error('Cleanup error:', err);
    }
  }
}

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('Upload endpoint hit, file:', !!req.file);
    if (!req.file) return res.status(400).send('No file uploaded');

    // Clean up old PDFs before saving new one
    await cleanupDocuments();

    const documentsFolder = path.resolve(process.cwd(), 'documents');
    await fs.promises.mkdir(documentsFolder, { recursive: true });

    const destPath = path.join(documentsFolder, req.file.originalname);
    await fs.promises.writeFile(destPath, req.file.buffer);
    console.log('Copied file to:', destPath);

    const { summary, keyPoints, fullText, highRiskClauses } = await summarizePdfBuffer(req.file.buffer);
    console.log('Summary length:', summary?.length);
    console.log('Key points count:', keyPoints?.length);
    console.log('High risk clauses count:', highRiskClauses?.length);

    return res.json({
      message: 'File uploaded and summarized successfully',
      summary,
      keyPoints,
      fullText,
      highRiskClauses,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).send('Failed to upload or summarize file');
  }
});

// Cleanup endpoint for when user clicks "Analyze Another"
app.post('/cleanup', async (req, res) => {
  try {
    await cleanupDocuments();
    return res.json({ message: 'Documents cleaned up successfully' });
  } catch (err) {
    console.error('Cleanup endpoint error:', err);
    return res.status(500).send('Failed to cleanup documents');
  }
});

const server = app.listen(3001, () => {
  console.log('Upload server on http://localhost:3001');
});

// Cleanup on server shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  await cleanupDocuments();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('\nShutting down server...');
  await cleanupDocuments();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});