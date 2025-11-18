export async function uploadPDF(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    const res = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    });
  
    const text = await res.text();
    console.log('Raw response status:', res.status);
    console.log('Raw response text:', text);
  
    if (!res.ok) {
      throw new Error(`Upload failed: ${res.status} ${text}`);
    }
  
    try {
      const data = JSON.parse(text) as { message: string; summary?: string };
      return data;
    } catch (e) {
      console.error('JSON parse error:', e);
      throw new Error('Upload succeeded on server but response is not valid JSON');
    }
  }