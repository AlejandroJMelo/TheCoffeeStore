const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv');
dotenv.config({ path: "./config/prod/.env" });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use(require('./routes/index'));


console.log(`[INFO] webserver port ${process.env.PORT}`.green);
console.log(`[INFO] database mongo ${process.env.DB_URL}`.green);
console.log(`[INFO] expiration token ${process.env.EXPIRATION_TOKEN}`.green);
console.log(`[INFO] seed token ${process.env.SEED_TOKEN}`.green);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, resp) => {
    if (err) throw err;
    console.log('[INFO] MongoDB connected'.green);
});

app.listen(process.env.PORT || 80, () => {
    console.log(`[INFO] Web server started`.green);
})