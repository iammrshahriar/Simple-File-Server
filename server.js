const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const publicDir = 'public';

const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, publicDir, req.url === '/' ? 'index.html' : req.url);
    const ext = path.extname(filePath);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found\n');
            return;
        }

        // Serve the file
        let contentType = 'application/octet-stream';
        switch (ext) {
            case '.html':
                contentType = 'text/html';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'application/javascript';
                break;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});