const fs = require('fs');

const options = {
    key: fs.readFileSync('fake-keys/privatekey.pem'),
    cert: fs.readFileSync('fake-keys/certificate.pem')
};

const express = require('express');
const http = require("https")
const app = express();
const server = http.createServer(options, app);
const port = 3000;
const outlook = require('node-outlook');

// Set public folder as root
app.use(express.static('public'));

// Provide access to node_modules folder
app.use('/scripts', express.static(`${__dirname}/node_modules/`));

// Redirect all traffic to index.html
app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.info('listening on %d', port);
});
require('./Signaling-Server.js')(server);