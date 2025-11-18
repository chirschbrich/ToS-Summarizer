const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const { summarizePdfBuffer } = require('./aiTools.js');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('Upload endpoint hit, file:', !!req.file);
    if (!req.file) return res.status(400).send('No file uploaded');

    const documentsFolder = path.resolve(process.cwd(), 'documents');
    await fs.promises.mkdir(documentsFolder, { recursive: true });

    const destPath = path.join(documentsFolder, req.file.originalname);
    await fs.promises.writeFile(destPath, req.file.buffer);
    console.log('Copied file to:', destPath);

    // summarize PDF via aiTools
    const summary = await summarizePdfBuffer(req.file.buffer);

    return res.json({
      message: 'File uploaded and summarized successfully',
      summary,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).send('Failed to upload or summarize file');
  }
});

app.listen(3001, () => {
  console.log('Upload server on http://localhost:3001');
});

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('Missing OPENAI_API_KEY');
  process.exit(1);
}