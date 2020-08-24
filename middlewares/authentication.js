const jwt = require('jsonwebtoken');


let tokenVerification = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED_TOKEN, (err, doceded) => {
        if (err) {
            return res.status(401).json({ ok: false, err });
        }
        req.user = doceded.user;
        next();
    })
}
let roleVerification = (req, res, next) => {
    let token = req.get('token');
    jwt.verify(token, process.env.SEED_TOKEN, (err, doceded) => {
        if (err) {
            return res.status(401).json({ ok: false, err });
        }
        req.user = doceded.user;

        if (req.user.role === 'ADMIN_ROLE') {
            next();
        } else {
            return res.status(401).end();
        }
    })

}

module.exports = {
    tokenVerification,
    roleVerification
};