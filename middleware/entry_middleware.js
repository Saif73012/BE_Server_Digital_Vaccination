const patientController = require("../controller/patientController");
const entryController = require("../controller/entryController");
module.exports = async function middlewareEntry(req, res, next) {
  const postMiddleware = async (req, next) => {
    next();
  };
  const deleteMiddleware = async (req, next) => {
    let entryID = req.url;
    entryID = entryID.substring(1);
    var getentry = await entryController.getSpesficEntry(entryID);
    var patientId = getentry.patient_Id;
    var patientinfo = await patientController.getSpesficPatient(patientId);
    var patientEntries = patientinfo.entries;
    var resultArray = [];

    for (const entry of patientEntries) {
      if (entry != entryID) {
        console.log("push");
        resultArray.push(entry);
      }
    }
    var resultObj = new Object();
    resultObj.entries = resultArray;
    resultObj = JSON.parse(JSON.stringify(resultObj));
    next();
  };

  const updateMiddleware = async (req, next) => {
    let body = req.body;

    let bodyPatient = body.patient_Id;

    if (bodyPatient != null) {
      let entryID = req.url;
      entryID = entryID.substring(1);

      var getentry = await entryController.getSpesficEntry(entryID);

      var patientId = getentry.patient_Id;

      var patientinfo = await patientController.getSpesficPatient(patientId);

      var patientEntries = patientinfo.entries;
      var resultArray = [];
      if (!patientEntries.includes(entryID)) {
        for (const entry of patientEntries) {
          resultArray.push(entry);
        }
        resultArray.push(entryID);

        var resultObj = new Object();
        resultObj.entries = resultArray;

        resultObj = JSON.parse(JSON.stringify(resultObj));
      }
    }
    next();
  };

  if (req.method === "POST") {
    await postMiddleware(req, next);
  } else if (req.method === "DELETE") {
    await deleteMiddleware(req, next);
  } else if (req.method === "PUT") {
    await updateMiddleware(req, next);
  } else {
    next();
  }
};
