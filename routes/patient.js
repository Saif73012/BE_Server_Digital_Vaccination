const express = require("express");
const patientcontroller = require("../controller/patientController");
const entrycontroller = require("../controller/entryController");
const Patient = require("../models/patient.model");

var router = express.Router();

router.get("/", async (req, res) => {
  try {
    let result = await patientcontroller.getAllPatients();
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.get("/:id/filtered", async (req, res) => {
  const PatientID = req.params.id;
  try {
    let result = await entrycontroller.getSpesficEntryfiltered(PatientID, true);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.get("/:id/allentries", async (req, res) => {
  const PatientID = req.params.id;
  try {
    let result = await entrycontroller.getSpesficEntryfromPatientId(
      PatientID,
      true
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const PatientID = req.params.id;
  try {
    let result = await patientcontroller.getSpesficPatient(PatientID);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const PatientId = req.params.id;
  const PatientBodyToUpdate = req.body;

  try {
    let result = await patientcontroller.updatePatient(
      PatientId,
      PatientBodyToUpdate
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const PatientID = req.params.id;
  try {
    let result = await patientcontroller.deltePatientbyId(PatientID);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

module.exports = router;
