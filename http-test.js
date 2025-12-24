import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World! Node.js HTTP server is working!');
});

const PORT = 3004;

server.listen(PORT, () => {
  console.log(`HTTP server running on http://localhost:${PORT}`);
});