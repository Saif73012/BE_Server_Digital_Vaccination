const mongoose = require("mongoose");
const Patient = require("../models/patient.model");
const Schema = mongoose.Schema;


const patientController = require("../controller/patientController")
const entryController = require("../controller/entryController")

/*   https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose --> joint schema mitte der Seite 
siehe Notizbuch -- für schema im groben --> verbindung zw patient VACINE und user(arzt)
patient braucht eine neue eigenschaft --> Array of entrys --> middleware logic after post.entry pateint update- list 
--> spät nachts villt hasing dann awt 
*/


const Entry = Schema({
    date:{
        type: Date,
        required: true,
    },
    expireDate:{
        type: Date,
        required: false,
    },
    user_Id:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    patient_Id:{
        type: Schema.Types.ObjectId,
        ref: "Pateint",
        /* required: true, */
    },
    vacine_Id:{
        type: Schema.Types.ObjectId,
        ref: "Vacine",
        required: true,
    },
})

Entry.post('save', async function(doc, next) {
    
        console.log("middleware ENTRY post")
      var body = doc;
      /* console.log(body);  */
    
      var patientID = doc.patient_Id
     /*  console.log(patientID); */
    
      /* console.log(doc._id); */

        // get body --> patient ID und entry ID --> update Patient Entry List
        console.log('update patient start')
        var getAllEntriesFromPatient = [];
        var entry = await patientController.getSpesficPatient(patientID)
        /* console.log(entry)
        console.log('patient: ',entry.entries) */
        getAllEntriesFromPatient= entry.entries;
        let v = getAllEntriesFromPatient.toString();
        let l = getAllEntriesFromPatient.length
       /*  console.log('db entries: ',v)
        console.log('db entry lenth: ',l) */

        var resultArray = []
               for (const entry of getAllEntriesFromPatient) {
                   /* console.log(typeof entry) */
                   /* console.log('before',entry, ' type: '+ typeof entry) */
                   let obj = JSON.stringify(entry)
                   /* console.log('middle',obj, ' type: '+ typeof obj) */
                   /* console.log('before',obj) */
                   obj=JSON.parse(obj)
                  /*  console.log('after',obj, ' type: '+ typeof obj) */
                   /* console.log('after',obj, typeof obj)
                   obj = JSON.stringify(obj)
                   console.log('after json',obj, typeof obj) */
                   if(!(resultArray.includes(obj)))
                    resultArray.push(obj)
            }

            var string2obj = JSON.stringify(doc._id)
                   /* console.log('before',string2obj, ' type: '+ typeof string2obj) */
                   string2obj=JSON.parse(string2obj)
           /*         console.log('after',string2obj, ' type: '+ typeof string2obj) */
                   if(!(resultArray.includes(string2obj)))
                    resultArray.push(string2obj)

            var resultObj = new Object();
            resultObj.entries = resultArray;
            /* console.log(resultObj); */
            resultObj = JSON.parse(JSON.stringify(resultObj))
           /*  console.log(resultObj) */

            // update patient with body 
            var Update = await patientController.updatePatient(patientID,resultObj)
            console.log('update patient ende')
            //req.body=resultObj
        
      next();
  });
//TODO: after delete update patient Object so that the entry is not shown anymore

//TODO: after creation add entry to patient object als an element.

/* Entry.post("save", async  function(next){
    try {
        const UpdatedPatient = await Patient.findOneUpdate(patient_Id,);
        next()
    } catch (error) {
        next(error)
    }
}) */

/* function preSave (req,res,next) {
    const patientID = req.body.patient_Id;
    const body =req.body;
    console.log(body)
    console.log(patientID)
    mongoose.model("Pateint").findOneAndUpdate({patientID,body}, function (err, result) {
      if (err) {
        console.log(`[error] ${err}`);
        next(err);
      } else {
        console.log('success');
        next();
      }
    });
  } */

/* Entry.pre("findByIdAndDelete",async function(next){
    try {
        console.log('before delete')
         next() 
    } catch (error) {
        next(error)
    }
}) */

module.exports = 
    mongoose.model("Entry",Entry);