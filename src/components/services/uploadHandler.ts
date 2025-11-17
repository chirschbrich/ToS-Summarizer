export async function uploadPDF(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    const res = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    });
  
    console.log('Raw response status:', res.status);
  
    // For debugging, try reading as text and logging it
    const text = await res.text();
    console.log('Raw response text:', text);
  
    if (!res.ok) {
      throw new Error(`Upload failed: ${res.status} ${text}`);
    }
  
    // Try to parse JSON only after logging
    try {
      const data = JSON.parse(text);
      return data as { message: string };
    } catch (e) {
      console.error('JSON parse error:', e);
      throw new Error('Upload succeeded on server but response is not valid JSON');
    }
  }