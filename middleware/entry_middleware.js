const patientControler = require('../routes/patient')
const mongoose = require("mongoose");
const Pateint = require("../models/patient.model")


const patientController = require("../controller/patientController")
const entryController = require("../controller/entryController")
module.exports= async function middlewareEntry (req,res,next) {

  const postMiddleware = async (req,next)=> {
  
// this is only for pre create so it cant be used for post unless we want to change the body before creating
// that is why we only call next --> the post create middleware is written on entry.model.js
    next()
  }
  const deleteMiddleware = async (req,next)=> {
    console.log("middleware ENTRY delete")


    let entryID = req.url
    entryID = entryID.substring(1);

    var getentry = await entryController.getSpesficEntry(entryID);
    console.log(getentry)

    var patientId = getentry.patient_Id
    console.log(patientId)

    var patientinfo = await patientController.getSpesficPatient(patientId);
    console.log(patientinfo)

    var patientEntries = patientinfo.entries
    console.log(patientEntries)

    var resultArray = []
    console.log('ID: ',entryID)
    for(const entry of patientEntries){
      console.log('ID: ',entryID)
      console.log('entry: ',entry)
      if(entry != entryID){
        console.log('push')
          resultArray.push(entry)   
      }else{
        console.log('deleted id is outfiltered')
      }
    }
    var resultObj = new Object();
           resultObj.entries = resultArray;
           /* console.log(resultObj); */
           resultObj = JSON.parse(JSON.stringify(resultObj))


    var updatePatient = await patientController.updatePatient(patientId,resultObj)
    console.log(updatePatient);
    // getentry patientid --> get patient --> get patient.entries 
    //--> forloop through array of entries and if the entryId which we want to delete dont push it to the resultarray
    // otherwise push the ids to the resultarray --> update patientby id with the new entrie body 

  
    // logic ? 
    next()
  }
  
  const updateMiddleware = async (req,next)=> {
    console.log("middleware ENTRY update")
    // logic ? 

    let body = req.body;
  /*   console.log(body) */

    let bodyPatient = body.patient_Id
    /* console.log(bodyPatient) */

    if(bodyPatient != null){

      let entryID = req.url
      entryID = entryID.substring(1);

      var getentry = await entryController.getSpesficEntry(entryID);
    /*   console.log(getentry) */

      var patientId = getentry.patient_Id
   /*    console.log(patientId) */

      var patientinfo = await patientController.getSpesficPatient(patientId);
      /* console.log(patientinfo) */

      var patientEntries = patientinfo.entries
      /* console.log(patientEntries) */

      var resultArray = []
      if(!(patientEntries.includes(entryID))){
       /*  console.log('ID: ',entryID) */
        for(const entry of patientEntries){
         /*  console.log('ID: ',entryID)
          console.log('entry: ',entry) */
              resultArray.push(entry)   
        }
        resultArray.push(entryID);
      
        var resultObj = new Object();
            resultObj.entries = resultArray;
            /* console.log(resultObj); */
            resultObj = JSON.parse(JSON.stringify(resultObj))


        var updatePatient = await patientController.updatePatient(patientId,resultObj)
        /* console.log(updatePatient); */
      }/* else{
        console.log('id is allready in patient entries Array')
      } */
    }/* else{
      console.log('body has no patient')
    } */

    // same steps like delete expect we want to check if the entries body is allready up to date --> otherwise update it
    next()
  }


  if(req.method==="POST"){
    await postMiddleware(req,next);
}else if(req.method ==="DELETE"){
    await deleteMiddleware(req,next);
}else if(req.method==="PUT"){
  await updateMiddleware(req,next);
}else{
    console.log("not create not delete");
    next();
}
}