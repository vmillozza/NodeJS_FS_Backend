const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Ciao, Mondo!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Pagina non trovata');
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
