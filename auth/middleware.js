const patientcontroller = require("../controller/patientController");

module.exports = async function postDelete(req, res, next) {
  const patientID = req.params.id;
  console.log("ID: ", patientID);
  let body;

  try {
    body = await patientcontroller.getSpesficPatient(patientID, res);
  } catch (error) {
    next(error);
  }

  console.log("next ", function (err) {
    if (err) {
      console.log(`[error] ${err}`);
      next(err);
    } else {
      console.log("success");
      next();
    }
  });
};
