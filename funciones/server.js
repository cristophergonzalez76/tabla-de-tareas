const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));

const server = https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor HTTPS escuchando en el puerto ${PORT}`);
});
app.get('/', (req, res) => {
    // Lee el archivo HTML y envíalo como respuesta
    const htmlPath = path.join(__dirname, '../home.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    res.send(html);
  });

app.get('/styles.css', (req, res) => {
    // Lee el archivo CSS y envíalo como respuesta
    const cssPath = path.join(__dirname, '../styles.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    res.header('Content-Type', 'text/css');
    res.send(css);
 });
