require('dotenv').config({ path: './.env.local' });

const jwt = require('jsonwebtoken');

// Your payload
const payload = {
  userId: "12345",
  username: "shreeya",
  email: "shreeya.b.kumbhar@gmail.com",
};

// Use the secret key from the .env file
const secretKey = process.env.JWT_SECRET_KEY;

// Options (e.g., token expiration time)
const options = {
  expiresIn: "1h", // Token will expire in 1 hour
};

// Generate the JWT
const token = jwt.sign(payload, secretKey, options);

// Print the generated token
console.log("Generated JWT:", token);
