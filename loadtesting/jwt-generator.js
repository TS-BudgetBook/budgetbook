const jwt = require('jsonwebtoken');

// Set the value of a header to a custom value, which
// in this example comes from an HTTP call to another
// API
function generateJWT(req, userContext, ee, next) {
    let secret = '1234';
    let payload = {
        "sub": 1,
        "email": "marco@techstarter.de",
        "iat": 1709375495,
        "exp": 1709634695
    };
    let token = jwt.sign(payload, secret);
    req.headers['Authorization'] = `Bearer ${token}`
    return next();
}

module.exports = {
    generateJWT
};