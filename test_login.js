fetch('https://asrofi-laboratorium.vercel.app/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@asrofi.lab', password: 'admin123' })
}).then(async r => {
  console.log('Status:', r.status);
  console.log('Headers:', r.headers);
  const text = await r.text();
  console.log('Body:', text);
}).catch(console.error)
