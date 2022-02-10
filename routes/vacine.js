const express = require("express");
const Vacine = require("../models/vacine.model");
const vacinecontroller = require('../controller/vacineController')
var router = express.Router();

router.get("/", async  (req,res)=> {
    console.log("vacine router GETCALL");
    try {
        let result = await vacinecontroller.getAllVacines();
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("vacine router GETCALL done");
})

router.get("/:id", async  (req,res)=> {
    const VacineID = req.params.id;
    console.log("vacine/:id router GETCALL");
    try {
        let result = await vacinecontroller.getSpesficVacine(VacineID);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
   console.log("vacine/:id router GETCALL done");    
})

router.post("/", async (req,res) => {
    console.log("vacine router PostCALL");
    const vacine = new Vacine({
        name: req.body.name,
        abbrevation: req.body.abbrevation,
        information: req.body.information,
    });
    try {
        let result = await vacinecontroller.createVacine(vacine);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("vacine router PostCALL done");
})

router.put("/:id", async (req,res) => {
    console.log("Update vacine by ID router PUTCALL")
    const VacineId = req.params.id
    const VacineBodyToUpdate = req.body
    try {
        let result = await vacinecontroller.updateVacine(VacineId,VacineBodyToUpdate)
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("Update vacine by ID router PUTCALL done")   
})

router.delete("/:id", async (req,res) => {
    console.log("Delete vacine by ID router DELETECALL");
    const VacineId = req.params.id
    try {
        let result = await vacinecontroller.delteVacinebyId(VacineId)
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("Delete vacine by ID router DELETECALL done");
})

/* router.delete("/", async (req,res) => {
    console.log("Delete ALL router vacine DELETECALL");
    try {
        await Vacine.deleteMany();
        res.status(200).json("All data is wiped out")
    } catch (error) {
        res.status(403).json({error});
    }
}) */

module.exports = router;
