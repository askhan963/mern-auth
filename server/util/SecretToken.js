// SecretToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

function createSecretToken(userId) {
  const { TOKEN_KEY } = process.env;

  if (!TOKEN_KEY) {
    throw new Error('Token key is missing');
  }

  const token = jwt.sign({ userId }, TOKEN_KEY, { expiresIn: '3d' });

  return token;
}

module.exports = { createSecretToken };
