const express = require('express');
const app = express;

// app.get('/', function(req, res) {
//     res.send('Hello World')
// })

app.get('/', function(req, res) {
    // res.send('The Coffee Store')

    res.json({
        ok: true,
        count: count,
        users
    })
})

module.exports = app;