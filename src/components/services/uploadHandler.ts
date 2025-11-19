type KeyPoint = { title: string; detail: string };
type HighRiskClause = { section: string; title: string; risk: string; excerpt: string };
type UploadResponse = { 
  message: string; 
  summary?: string; 
  keyPoints?: KeyPoint[]; 
  fullText?: string; 
  highRiskClauses?: HighRiskClause[];
};

export async function uploadPDF(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:3001/upload', {
    method: 'POST',
    body: formData,
  });

  const text = await response.text();
  console.log('Raw response status:', response.status);
  console.log('Raw response text:', text);

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.status} ${text}`);
  }

  return JSON.parse(text) as UploadResponse;
}

export async function cleanupDocuments() {
  try {
    const response = await fetch('http://localhost:3001/cleanup', {
      method: 'POST',
    });
    if (!response.ok) {
      console.error('Cleanup failed:', response.status);
    }
  } catch (err) {
    console.error('Cleanup error:', err);
  }
}