const express = require('express');
const app = express();

app.get('/', function(req, res) {

    let body = `
    <html>
    <h1>The Coffee Store</h1>
    <br>
    ${new Date}
    </html>
    `;
    res.send(body)
})

module.exports = app;