import http from 'http';

console.log('Verificando servidor...');

const req = http.get('http://localhost:3001/api/health', (res) => {
  console.log('Status:', res.statusCode);
  
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (err) => {
  console.log('Error:', err.message);
});