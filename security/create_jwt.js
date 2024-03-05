const jwt = require('jsonwebtoken');

function createJWT() {
    let secret = "MarCo!"
    let payload = "{'sub': 1}";
    const token = jwt.sign(payload, secret);
    return token;
}

console.log(createJWT());