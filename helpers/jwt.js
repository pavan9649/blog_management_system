const expressJwt = require("express-jwt");
const dotenv=require('dotenv')
dotenv.config({ path: './config.env'})

function authJwt() {
  const secret = process.env.secret;

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
    { url: /\/blog(.*)/, methods: ["GET", "OPTION"] },
      `users/login`,
      `users/signup`,
    ],
  });
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
      done(null, true);
    }
    done();
  }
  
module.exports = authJwt;