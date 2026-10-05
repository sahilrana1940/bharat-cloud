export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Upload API working - Edge' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file' }), { status: 400 });
    }

    // Yahan tera S3 wala code aayega baad me
    // Abhi ke liye sirf success dikha rahe hain

    return new Response(
      JSON.stringify({ 
        success: true, 
        filename: file.name, 
        size: file.size 
      }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
}