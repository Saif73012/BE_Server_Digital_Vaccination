const mongoose = require("mongoose");
const Pateint = require("../models/patient.model")
const patientcontroller = require('../controller/patientController')

//TODO: controller fertig -> middleware logic fehlt , login/ jwt anpassung --> 

module.exports = async function postDelete(req,res,next) {
    const patientID = req.params.id;
    console.log("ID: ",patientID)
    let body;

    //guck in nextbook middleware und controller code  --> JWT -- look login und token 
    //https://mongoosejs.com/docs/middleware.html#defining --> helpful link to conect
    
    try {
      body =  await patientcontroller.getSpesficPatient(patientID,res)
      console.log('body: ',body)

        console.log("body search done")
    } catch (error) {
        next(error)
    }
    console.log("after body search request")


    console.log("next ", function (err, result) {
      if (err) {
        console.log(`[error] ${err}`);
        next(err);
      } else {
        console.log('success');
        next();
      }
    });
  }
