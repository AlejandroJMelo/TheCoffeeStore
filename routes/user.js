const express = require('express');
const User = require('../models/user');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const user = require('../models/user');




app.get('/user', function(req, res) {

    let from = req.query.from || 0;
    from = Number(from);

    let to = req.query.to || 10;
    to = Number(to);
    User.find({ status: true }, 'name email role status img google')
        .skip(from)
        .limit(to)
        .exec((err, users) => {
            if (err) {
                return res.status(400, json({
                    ok: false,
                    err
                }))
            }


            User.countDocuments({ status: true }, (err, count) => {

                res.json({
                    ok: true,
                    count: count,
                    users
                })
            })

        })

})
app.post('/user', function(req, res) {

    let body = req.body;

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        user: body.user,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role

    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400, json({
                ok: false,
                err
            }))
        }

        res.json({
            ok: true,
            user: userDB
        })

        console.log(`User ${userDB.name} saved `);
    })
})
app.put('/user/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'role', 'status', 'img']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400, json({
                ok: false,
                err
            }))
        }
        res.json({
            ok: true,
            user: userDB
        })
    })

})
app.delete('/user/:id', function(req, res) {

    // res.json({
    //     ok: true
    //         // user: '';
    // })

    // let id = req.params.id;

    // User.findByIdAndRemove(id, (err, userDeleted) => {

    //     if (err) {
    //         return res.status(400, json({
    //             ok: false,
    //             err
    //         }))
    //     }


    //     res.json({
    //         ok: true,
    //         userDelete: userDeleted
    //     })

    // })


    let id = req.params.id;
    let changeStatus = { status: false };

    User.findByIdAndUpdate(id, changeStatus, { new: true }, (err, userDB) => {
        if (err) {
            return res.status(400, json({
                ok: false,
                err
            }))
        }
        res.json({
            ok: true,
            user: userDB
        })
    })

})

app.get('/', function(req, res) {
    res.send(`<html><h1>The Coffee Store</h1>${new Date}</html>`, )
})
module.exports = app;