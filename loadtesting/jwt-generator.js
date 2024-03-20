const jwt = require('jsonwebtoken');

// Set the value of a header to a custom value, which
// in this example comes from an HTTP call to another
// API
function generateJWT(req, userContext, ee, next) {
    let secret = '829c4db7e4615364b0d31422c5ab536ec5d3542ceb26a25f2b68da527cfa8ba2';
    let date = new Date();
    let iat = date.valueOf() / 1000;
    let exp = date.setDate(date.getDate() + 3) / 1000;
    let payload = {
        "sub": 1,
        "email": "marco@techstarter.de",
        "iat": iat,
        "exp": exp
    };
    let token = jwt.sign(payload, secret);
    req.headers['Authorization'] = `Bearer ${token}`
    return next();
}

module.exports = {
    generateJWT
};