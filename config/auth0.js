module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  auth0Audience: process.env.AUTH0_AUDIENCE,
  namespace: 'https://elparah.com/authorization',
  issuer: 'https://elparah.eu.auth0.com/',
};
