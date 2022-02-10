const express = require("express");
const Entry = require("../models/entry.model");
const postDelete = require("../auth/middleware")
const entrycontroller = require('../controller/entryController')
var router = express.Router();

router.get("/", async  (req,res)=> {
    console.log("Entry router GETCALL");
    let result;
    try {
        result = await entrycontroller.getAllEntries(true);
        /* console.log("result router: ",result); */
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
  
   console.log("Entry router GETCALL done")
})

router.get("/:id", async  (req,res)=> {
    const EntryID = req.params.id;
    console.log("Entry/:id router GETCALL");
    try {
        
        let result = await entrycontroller.getSpesficEntry(EntryID,true);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("Entry/:id router GETCALL done");
})

router.post("/", async function (req,res){
    console.log("Entry router PostCALL");
    const entry = new Entry({
        date:req.body.date,
        expireDate:req.body.expireDate,
        patient_Id:req.body.patient_Id,
        user_Id:req.body.user_Id,
        vacine_Id:req.body.vacine_Id,
    });

    try {
        let result = await entrycontroller.createEntry(entry);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("Entry router PostCALL done")
})

router.put("/:id", async (req,res) => {
    console.log("Update Entry by ID router PUTCALL")
    const EntryId = req.params.id
    const EntryBodyToUpdate = req.body
    try {
        let result = await entrycontroller.updateEntry(EntryId,EntryBodyToUpdate)
    res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("Update Entry by ID router PUTCALL done")
})

router.delete("/:id", async function (req,res){
    console.log("Delete Entry by ID router DELETECALL");
    const EntryID = req.params.id
    try {
        let result = await entrycontroller.delteEntrybyId(EntryID);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("Delete Entry by ID router DELETECALL done");
})

module.exports = router;

