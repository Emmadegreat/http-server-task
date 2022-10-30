const http = require('http');
const fs = require('fs');
const path = require('path');
const { url } = require('inspector');

const server = http.createServer((req, res) => {
    let filepath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url)
    let contentType = getContentType(filepath) || 'text/html';
    let emptyPath = path.join(__dirname, 'public', '404.html');
    fs.readFile(filepath, 'utf8', (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(emptyPath, 'utf8', (err, content) => {
                    res.writeHead(200, { 'content-Type': contentType })
                    res.end(content)
                })
            } else {
                res.writeHead(500)
                res.end('server error has occurred')
            }
        }
        if (!err) {
            res.writeHead(200, { 'content-Type': contentType });
            res.end(content);
        }
    })

});

const getContentType = (filepath)=>{
    let extname = path.extname(filepath);
    if (extname === '.js') {
        return 'text/javascript';
    }
    if (extname === '.css') {
        return 'text/css';
    }
    if (extname === '.jpg') {
        return 'image/jpg';
    }
}

const port =  4005;
server.listen(port, 'localhost', () => {
    console.log('listening for request made on port 4005');
})