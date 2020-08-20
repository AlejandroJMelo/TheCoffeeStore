const express = require('express')
const app = express()

const port = process.env.PORT;

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.listen(port || 80, () => {
    console.log('Server started');
})