const { access, readFile } = require('fs');
const { createServer } = require('http');
const { join, normalize, parse } = require('path');

const cwd = process.cwd();

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript'
};

const server = createServer();

server.on('request', (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if(url.pathname === '/') url.pathname = '/index.html';

  const path = join(cwd, normalize(url.pathname).replace(/^(\.\.[\/\\])+/, ''));

  access(path, err => {
    if (err) {
        res.statusCode = 404;
        res.end(`File ${path} not found`);
        return;
    }

    readFile(path, (err, data) => {
      if(err){
        res.statusCode = 500;
        res.end(`Error in reading file ${path}`);
        return;
      }

      res.setHeader('Content-type', mimeTypes[parse(path).ext] || 'application/octet-stream');
      res.end(data);
    });
  });
});

server.listen(8080, () => {
  console.log('App listening http://localhost:8080');
});