const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const User = require('../models/user');

var jwt = require('jsonwebtoken');



app.get('/login', function(req, res) {

    res.send('Login')
})


app.post('/login', (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {

        if (err) {
            res.status(500).end();
        }

        if (!userDB) {
            return res.status(400).end();
        } else {
            if (!bcrypt.compareSync(body.password, userDB.password)) {
                res.status(400).end();
            } else {
                let token = jwt.sign({ user: userDB }, process.env.SEED_TOKEN, { expiresIn: process.env.EXPIRATION_TOKEN });

                res.json({
                    user: userDB,

                    token
                })
            }
        }



    })


})

module.exports = app;