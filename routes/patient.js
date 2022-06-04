const express = require("express");
const patientcontroller = require('../controller/patientController')
const entrycontroller = require('../controller/entryController')
const Patient = require("../models/patient.model");

var router = express.Router();



router.get("/", async  (req,res)=> {
    console.log("patient router GETCALL");
    try {
        let result = await patientcontroller.getAllPatients();
    res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    } 
    console.log("patient router GETCALL done");
    
})

router.get("/:id/filtered", async  (req,res)=>{
    
    const PatientID = req.params.id;
    console.log("Entry/:id filtered router GETCALL");
    try {
        
        let result = await entrycontroller.getSpesficEntryfiltered(PatientID,true);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("Entry/:id filteredrouter GETCALL done");
})


router.get("/:id/allentries", async  (req,res)=>{
    const PatientID = req.params.id;
    console.log("Entry/:id allentries router GETCALL");
    try {
        let result = await entrycontroller.getSpesficEntryfromPatientId(PatientID,true);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("Entry/:id allentries router GETCALL done");
})

router.get("/:id", async  (req,res)=> {
    const PatientID = req.params.id;
    console.log("user/:id router GETCALL");
    try {
        let result = await patientcontroller.getSpesficPatient(PatientID);
    res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("user/:id router GETCALL done");
    
})

/* 
router.post("/", async (req,res) => {
    console.log("user router PostCALL");

    const patient = new Patient({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    try {
        let result = await patientcontroller.createPatient(patient);
    res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }  
    console.log("user router PostCALL done");
   

}) */



router.put("/:id", async (req,res) => {
    console.log("Update User by ID router PUTCALL")
    const PatientId = req.params.id
    const PatientBodyToUpdate = req.body
   /*  console.log('reqbody in router ',req.body) */

    try {
        let result = await patientcontroller.updatePatient(PatientId,PatientBodyToUpdate)
        /* console.log('reqbody in router ',req.body)
        console.log('reqbody in attribute',PatientBodyToUpdate)
        console.log(result) */
    res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("Update User by ID router PUTCALL done")
})




router.delete("/:id", async (req,res) => {
    console.log("Delete User by ID router DELETECALL");
    const PatientID = req.params.id
    try {
        let result = await patientcontroller.deltePatientbyId(PatientID);
    res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("Delete User by ID router DELETECALL done ");
})


module.exports = router;
