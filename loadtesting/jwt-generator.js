const jwt = require('jsonwebtoken');

// Set the value of a header to a custom value, which
// in this example comes from an HTTP call to another
// API
function generateJWT(req, userContext, ee, next) {
    let secret = '58e75a3e1aeb0820452c346aec8469e0cdc61f80d519e1fc24ae0d1e514c5835';
    let payload = {
        "sub": 1,
        "email": "marco@techstarter.de",
        "iat": 1710081021,
        "exp": 1710340221
    };
    let token = jwt.sign(payload, secret);
    req.headers['Authorization'] = `Bearer ${token}`
    return next();
}

module.exports = {
    generateJWT
};