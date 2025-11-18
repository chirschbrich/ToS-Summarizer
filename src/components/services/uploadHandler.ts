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

  return JSON.parse(text);
}