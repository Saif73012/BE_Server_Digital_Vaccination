
const jwtController = require("../middleware/jwt_middleware");

module.exports = async function middlewarePatient(req, res, next) {
  if (req.method === "POST") {
  } else if (req.method === "DELETE") {
    await jwtController.checkToken(req, res, next);
  } else if (req.method === "PUT") {
    await jwtController.checkToken(req, res, next);
  } else if (req.method === "GET") {
  } else {
    next();
  }
};
