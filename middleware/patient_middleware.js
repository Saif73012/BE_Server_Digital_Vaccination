const hash = require("../auth/hash")
const jwt = require('jsonwebtoken')

const patientController = require("../controller/patientController")
const entryController = require("../controller/entryController")
const User = require("../models/users.model");
const Patient = require("../models/patient.model");

module.exports= async function middlewarePatient (req,res,next) {
   
   
   
    const deleteMiddleware = async (req,next)=> {
        if(req.method ==="DELETE"){
            console.log("Delete call");
            /* find all entries and delete every entry  
            
            --> die controller nochmal checken 
            und die funktionen umwandeln weil
            res somit schon die res zurück gibt ohne middleware funktionen
            und das sollte nicht passieren heißt --> bei getallentries muss
            die funktion alle entries zurück geben und nur der router gibt 
            res aus und nicht die funktion selbst und das für jeden call
            
            --> getAllEntries umgewandelt --> check
            alle controller müssen nun angepasst werden  // done
            und res muss raus aus den funktionen. // done
            ERROR-Handling für die routes müssen angepasst werden // done 
            |__
               > Überlegung für populate -- bei router anfragen boolean mit geben und dann populate sonst nicht // done
            dann muss die middleware fertig gestellt werden für patient // done  und entry //done 
            jwt muss dann erstellt werden und die middleware erweitert 
            werden mit isauthenticated dann BE vorerst fertig

            https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/

            https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
            better step by step guide 
            */

            var getAllEntries = [];
            getAllEntries = await entryController.getAllEntries(false)
            let patientID = req.url
            patientID = patientID.substring(1);
            for(const entry of getAllEntries){
                if(entry.patient_Id == patientID){
                    var result = await entryController.delteEntrybyId(entry.id)          
                }
            }
        }
        next();
    }
    const postMiddleware = async (req,next)=> {
        //pw
       /*  let pw = req.body.password;
        let email = req.body.email;

        var searchdoc = await User.findOne({ email: email }).exec();
  var searchpatient = await Patient.findOne({ email: email }).exec();
  if(!(searchdoc ||searchpatient)){
        if(pw != undefined){
            pw = await hash.generate(pw);
            req.body.password = pw;
        }
    } */
      /*   //jwt token
        const token = jwt.sign(
            { user_id: req.body.user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          // save user token
          user.token = token; */
        next();
    }

    const updateMiddleware = async (req,next)=> {
        
        let body = req.body;
        let patientID = req.url
        patientID = patientID.substring(1);
        /* console.log(patientID)
        console.log(body) */

        let bodyEntries = body.entries
        /* console.log('entries: ',bodyEntries); */
        let bodyEntriesLength = bodyEntries.length
       /*  console.log('entries length: ',bodyEntriesLength); */
        if(body.entries != null){
            /* console.log("change of entries") */
            //logic
            var getAllEntriesFromPatient = [];
            var entry = await patientController.getSpesficPatient(patientID)
            /* console.log('patient: ',entry.entries) */
            getAllEntriesFromPatient= entry.entries;
            let v = getAllEntriesFromPatient.toString();
            let l = getAllEntriesFromPatient.length
         /*    console.log('db entries: ',v)
            console.log('db entry lenth: ',l) */
            

               var resultArray = []
               for (const entry of getAllEntriesFromPatient) {
                   /* console.log(typeof entry) */
                   let obj = JSON.stringify(entry)
                   /* console.log('before',obj) */
                   obj=JSON.parse(obj)
                   /* console.log('after',obj, typeof obj)
                   obj = JSON.stringify(obj)
                   console.log('after json',obj, typeof obj) */
                   if(!(resultArray.includes(obj)))
                    resultArray.push(obj)
            }
            for (const entry of bodyEntries) {
                let obj;
                if(typeof entry !== String){
                    /* console.log('req body is string -> so parse into object')
                    console.log(entry) */
                    obj = JSON.stringify(entry)
                    /* console.log(obj,'after stringify') */
                    obj=JSON.parse(obj)
                    /* console.log(obj,'after parse') */
                }/* else{
                    console.log('req.body is object')
                } */
                if(!(resultArray.includes(obj)))
                    resultArray.push(obj)
            }


            
         /*    console.log("result Array: ",resultArray)
            console.log("result Array länge: ",resultArray.length) */
           //--> array in body umwandeln

           var resultObj = new Object();
           resultObj.entries = resultArray;
           /* console.log(resultObj); */
           resultObj = JSON.parse(JSON.stringify(resultObj))
        /*    console.log('result String -------')
            console.log(resultObj);
            console.log('result String ++++++') */
           
           
      /*      let obj = JSON.parse(resultstring)
           console.log(obj, typeof obj) */
                    /* for(var i =0; i<l+bodyEntriesLength;i++){
                        if(bodyEntries[i] !== getAllEntriesFromPatient[i] && bodyEntries[i] !== null){
                            console.log('in if')
                            resultArray.push(bodyEntries[i])
                        }else{
                            console.log('in else')
                            if(getAllEntriesFromPatient[i] !== null)
                            resultArray.push(getAllEntriesFromPatient[i])
                        }
                    } */
                    
                // --> req. body umwandeln in response 

                /* console.log(JSON.stringify({ x: 5, y: 6 }));
                 expected output: "{"x":5,"y":6}"  
                 ----------------------------------------------
                 console.log(JSON.stringify({entries: resultArray }));
                 ----
                 to add 
                 619f9b23ac4dd93c2c9d4fa9 --------------------------------------------- single
                 ["61b10eef0e534e2928573e10","619eb13a40b4fd35e47f3cae"] -------------- double
                 ----------------------------------------------
                 resultArray --> die anführungszeichen entfernen --> so funktinoierrt es 


 */
                 //console.log('JSON= ',JSON.stringify({entries: resultArray }));
                req.body=resultObj
                /* console.log('reqbody in middleware=',req.body) */
            
            
            /* look patient model
            --> if we get all entries 
            - same number nothing - more then before --> add  - less then before --> check each and then delete
            */

           /*  console.log('logic end') */

        }

        console.log("middleware ENTRY update done ");
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

