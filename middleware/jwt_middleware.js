let jwt = require("jsonwebtoken");

module.exports = async function middlewarePatient(req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token !== undefined) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    if (token) {
      jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
          return res.status(403).json({
            success: false,
            message: "Token is not valid",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  } else {
    return res.status(403).json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};
