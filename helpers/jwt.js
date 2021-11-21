const expressJwt = require("express-jwt");
const dotenv=require('dotenv')
dotenv.config({ path: './config.env'})
const api = process.env.API_URL;

function authJwt() {
  const secret = process.env.secret;

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
    { url: /\/api\/blog(.*)/, methods: ["GET", "OPTION"] },
      `${api}/users/login`,
      `${api}/users/signup`,
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