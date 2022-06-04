const Entry = require("../models/entry.model");


async function getAllEntries(isRouter){
   if(isRouter){
    var result = await Entry.find({})
   .populate("user_Id")
   .populate("patient_Id")
   .populate("vacine_Id")
   .exec()
   return result
}else{
    var result = await Entry.find({})
   .exec()
   return result
}
    /* .then(entries => {
        console.log("1",entries)
        
        //console.log("2",JSON.stringify(entries))
        //})
        //return JSON.stringify(entries);})
        res.status(200).json(entries)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */
    /* console.log("result controller: ", result) */
    
    /* try {
    const Entries = await Entry.find({});
    /* Entries.populate("User"); 
    res.json(Entries).status(200);
} catch (error) {
    res.status(403).json({error});
} */
}


async function getSpesficEntryfiltered(id,isRouter){
    if(isRouter){
    var result= await Entry.find({'patient_Id': id})
    .sort('-date')
    .limit(3)
    .populate("user_Id")
    .populate("patient_Id")
    .populate("vacine_Id")
    .exec()
    return result
    }else{
        var result= await Entry.find({'patient_Id': id})
    .sort('-date')
    .limit(3)
    .exec()
    return result
    }
}

async function getSpesficEntryfromPatientId(id,isRouter){
    if(isRouter){
    var result= await Entry.find({'patient_Id': id})
    .sort('-date')
    .populate("user_Id")
    .populate("patient_Id")
    .populate("vacine_Id")
    .exec()
    return result
    }else{
        var result= await Entry.find({'patient_Id': id})
    .sort('-date')
    .limit(3)
    .exec()
    return result
    }
}

async function getSpesficEntry(id,isRouter){
    if(isRouter){
        var result = await Entry.findById(id,{})
        .populate("user_Id")
        .populate("patient_Id")
        .populate("vacine_Id")
        .exec()
        return result
    }else{
        var result = await Entry.findById(id,{})
        .exec()
        return result
    }
    
    /* .then(entry => {
        res.status(200).json(entry)})
        .catch(err => {
            console.log(err);
            res.status(403).json( {
                error: err
            });
        }) */

    /* try {
    const entry = await Entry.findById(EntryID,{});
    res.json(entry).status(200);
} catch (error) {
    res.status(403).json({error});
} */
}

async function createEntry(entry){
   var result = await entry.save()
   return result

/*    .then(newEntry => {
    res.status(200).json(newEntry)})
.catch(err => {
    console.log(err);
    res.status(403).json( {
        error: err
    });
}) */

/*  try {
    await entry.save()
    res.status(200).json(entry);
} catch (error) {
    res.status(403).json({error});
} */
}

async function updateEntry(id,body){
    var result = await Entry.findByIdAndUpdate(id,body)
    .exec()
    return result
    
    /* .then(entryUpdate => {
        res.status(200).json(entryUpdate)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */

   /*  try {
        const EntryUpdated = await Entry.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(EntryUpdated)
    } catch (error) {
        res.status(403).json({error});
    } */
}

async function delteEntrybyId(id){
    var result = await Entry.findByIdAndDelete(id)
    .exec()
    return result

    /* .then(entryDeleted => {
        res.status(200).json(entryDeleted)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */

   /* try {
        const Entrybody = await Entry.findByIdAndDelete(req.params.id);
        res.status(200).json(Entrybody)
    } catch (error) {
        res.status(403).json({error});
    } */
}

exports.getAllEntries =getAllEntries
exports.getSpesficEntry =getSpesficEntry
exports.getSpesficEntryfromPatientId = getSpesficEntryfromPatientId
exports.getSpesficEntryfiltered = getSpesficEntryfiltered
exports.createEntry =createEntry
exports.updateEntry =updateEntry
exports.delteEntrybyId =delteEntrybyId