const express = require("express");
const Vacine = require("../models/vacine.model");
const vacinecontroller = require("../controller/vacineController");
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    let result = await vacinecontroller.getAllVacines();
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const VacineID = req.params.id;
  try {
    let result = await vacinecontroller.getSpesficVacine(VacineID);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.post("/", async (req, res) => {
  const vacine = new Vacine({
    name: req.body.name,
    abbrevation: req.body.abbrevation,
    information: req.body.information,
    url: req.body.url,
  });
  try {
    let result = await vacinecontroller.createVacine(vacine);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const VacineId = req.params.id;
  const VacineBodyToUpdate = req.body;
  try {
    let result = await vacinecontroller.updateVacine(
      VacineId,
      VacineBodyToUpdate
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const VacineId = req.params.id;
  try {
    let result = await vacinecontroller.delteVacinebyId(VacineId);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

module.exports = router;
