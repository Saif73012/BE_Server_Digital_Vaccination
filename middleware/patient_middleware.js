
const patientController = require("../controller/patientController");
const entryController = require("../controller/entryController");

module.exports = async function middlewarePatient(req, res, next) {
  const deleteMiddleware = async (req, next) => {
    if (req.method === "DELETE") {
      var getAllEntries = [];
      getAllEntries = await entryController.getAllEntries(false);
      let patientID = req.url;
      patientID = patientID.substring(1);
      for (const entry of getAllEntries) {
        if (entry.patient_Id == patientID) {
        }
      }
    }
    next();
  };
  const postMiddleware = async (req, next) => {
    next();
  };

  const updateMiddleware = async (req, next) => {
    let body = req.body;
    let patientID = req.url;
    patientID = patientID.substring(1);
    let bodyEntries = body.entries;
    if (body.entries != null) {
      var getAllEntriesFromPatient = [];
      var entry = await patientController.getSpesficPatient(patientID);
      getAllEntriesFromPatient = entry.entries;

      var resultArray = [];
      for (const entry of getAllEntriesFromPatient) {
        let obj = JSON.stringify(entry);
        obj = JSON.parse(obj);
        if (!resultArray.includes(obj)) resultArray.push(obj);
      }
      for (const entry of bodyEntries) {
        let obj;
        if (typeof entry !== String) {
          obj = JSON.stringify(entry);
          obj = JSON.parse(obj);
        }
        if (!resultArray.includes(obj)) resultArray.push(obj);
      }
      var resultObj = new Object();
      resultObj.entries = resultArray;

      resultObj = JSON.parse(JSON.stringify(resultObj));
      req.body = resultObj;
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
