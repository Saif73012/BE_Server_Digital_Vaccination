const express = require("express");
const Entry = require("../models/entry.model");
const entrycontroller = require("../controller/entryController");
var router = express.Router();

router.get("/", async (req, res) => {
  let result;
  try {
    result = await entrycontroller.getAllEntries(true);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  const EntryID = req.params.id;
  try {
    let result = await entrycontroller.getSpesficEntry(EntryID, true);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.post("/", async function (req, res) {
  const entry = new Entry({
    date: req.body.date,
    expireDate: req.body.expireDate,
    patient_Id: req.body.patient_Id,
    user_Id: req.body.user_Id,
    vacine_Id: req.body.vacine_Id,
  });

  try {
    let result = await entrycontroller.createEntry(entry);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.put("/:id", async (req, res) => {
  const EntryId = req.params.id;
  const EntryBodyToUpdate = req.body;
  try {
    let result = await entrycontroller.updateEntry(EntryId, EntryBodyToUpdate);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

router.delete("/:id", async function (req, res) {
  const EntryID = req.params.id;
  try {
    let result = await entrycontroller.delteEntrybyId(EntryID);
    res.status(200).json(result);
  } catch (error) {
    res.status(403).json({ error });
  }
});

module.exports = router;
