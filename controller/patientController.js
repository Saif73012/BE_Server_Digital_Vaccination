const Patient = require("../models/patient.model");

async function getAllPatients(){
    var result = await Patient.find({})
    .exec()
    return result
    /* .then(patients => {
        res.status(200).json(patients)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */

/* 
try {
    const patienten = await Patient.find({});
    res.json(patienten).status(200);
} catch (error) {
    res.status(403).json({error});
}    */
}

async function getSpesficPatient(id){
    var result = await Patient.findById(id,{})
    .exec()
    return result
    /* .then(patient => {
        res.status(200).json(patient)
        console.log(patient,' ende')
    })
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */

  /*  
try {
    const patient = await Patient.findById(PatientID,{});
    res.json(patient).status(200);
} catch (error) {
    res.status(403).json({error});
} */
}
async function createPatient(patient){
    var result = await patient.save()
    return result
    /* .then(patients => {
        res.status(200).json(patients)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    })
 */

    /* try {
        await patient.save()
        res.status(200).json(patient);
    } catch (error) {
        res.status(403).json({error});
    } */
}


async function updatePatient(id,body){
    var result = await Patient.findByIdAndUpdate(id, body)
   
    .exec()
    return result
    /* .then(patient => {
        res.status(200).json(patient)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */


    /* try {
        const PatientUpdated = await Patient.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(PatientUpdated)
    } catch (error) {
        res.status(403).json({error});
    } */
}

async function deltePatientbyId(id){
    var result = await Patient.findByIdAndDelete(id)
    .exec()
    return result
   /*  .then(patient => {
        res.status(200).json(patient)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */
    
    /* try {
        const Patientbody = await Patient.findByIdAndDelete(req.params.id);
        res.status(200).json(Patientbody)
    } catch (error) {
        res.status(403).json({error});
    } */
}

exports.getAllPatients = getAllPatients
exports.getSpesficPatient =getSpesficPatient
exports.createPatient =createPatient
exports.updatePatient =updatePatient
exports.deltePatientbyId =deltePatientbyId