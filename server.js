const http = require('http');
require('dotenv').config();
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Ciao, Mondo!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Pagina non trovata');
    }
});

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
