// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); // allow your React app

const upload = multer({ storage: multer.memoryStorage() });

// POST /upload – copy file into ./documents
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('Upload endpoint hit, file:', !!req.file);

    if (!req.file) return res.status(400).send('No file uploaded');

    const documentsFolder = path.resolve(process.cwd(), 'documents');
    await fs.promises.mkdir(documentsFolder, { recursive: true });

    const destPath = path.join(documentsFolder, req.file.originalname);
    await fs.promises.writeFile(destPath, req.file.buffer);

    console.log('Copied file to:', destPath);
    res.json({ message: 'File copied to documents' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).send('Failed to upload file');
  }
});

app.listen(3001, () => {
  console.log('Upload server on http://localhost:3001');
});