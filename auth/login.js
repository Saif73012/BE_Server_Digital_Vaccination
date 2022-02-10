var express = require('express')
var jwt = require('jsonwebtoken')

const hash = require('./hash')
const patientController = require("../controller/patientController")
const User = require("../models/users.model");
const Patient = require("../models/patient.model");

const userController = require("../controller/userController")
 // anpassen ----> an das aktuelle model



 /* 
 Schritt 1 --> router erstellen --> abfrage erstellen  --> 2 router eine für user eine für patient
 2 --> als rückgabe ein jwt token geben
 3 --> middleware anpassen und checken ob der jwt token enthalten ist und wenn er die bedingung erfüllt dann führe den befehl aus
 4 --> BE mit FE verbinden.

https://www.youtube.com/watch?v=7nafaH9SddU&t=1228s


 TODO:
1 --- 
2 ---
3 ---
4 ---

 */


// load controlers
/* var userControler = require('../routes/user')
var patientControler = require('../routes/patient') */
// create router


/* AUFGABE : JWT middleware funktioniert alles -- aber nur für user beim login 
--> gemacht werden muss :  egal wer sich anmeldet das es schaut ob es ein arzt ist oder ein patient 
 und je nachdem dann den jwt token erstellt --> somit ist JWT fertig und jz muss die verbindung nur noch stattfinden zwischen flutter und express

{
    "email":"trashtester4@gmail.com",
    "password":"1234"
}

 */


var router = express.Router()

router.post("/user", async (req,res) => {
  console.log("user router PostCALL");
  const user = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      isDoctor:req.body.isDoctor,
      isAdmin:req.body.isAdmin,
      isCheckedByAdmin:req.body.isCheckedByAdmin,
  });
  try {
      let result = await userController.createUser(user);
      res.status(200).json(result)
  } catch (error) {
      res.status(403).json({error});
  }
  console.log("user router PostCALL done");
})

router.post("/patient", async (req,res) => {
  console.log("user router PostCALL");

  const patient = new Patient({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
  });
  try {
      let result = await patientController.createPatient(patient);
  res.status(200).json(result)
  } catch (error) {
      res.status(403).json({error});
  }  
  console.log("user router PostCALL done");
 

})

router.get('/', async function (req, res) {
  var user;
  var searchdoc = await User.findOne({ email: req.body.email }).exec();
  var searchpatient = await Patient.findOne({ email: req.body.email }).exec();
  var searchpatient2 = await Patient.findOne({ username: req.body.username }).exec();
  if(searchdoc){
    /* console.log('doc: ',searchdoc) */
    user = searchdoc
  }
  else if(searchpatient){
    /* console.log('patient: ',searchpatient) */
    user = searchpatient
  }
  else if(searchpatient2){
    user = searchpatient2
  }
  else{
    user = null;
  }
if(user!==null){
  var pw = user.password;
  /* console.log(pw);
  console.log(req.body.password); */
}
if(user === null){
  res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
}
else {
  var isPw = await hash.compare(req.body.password, pw);
  /* console.log(isPw) */
          if (isPw){ 
            /* console.log('pw right') */
            const token = jwt.sign(
              { user:user },
              process.env.TOKEN_KEY,
              {
                expiresIn: "5min",
              }, { algorithm: 'RS256'}
            );
            res.json({success: true, token: token})
          }else{
            /* console.log('PW false') */
            res.status(403).send({success: false, msg: 'Authentication Failed, PW is wrong'})
          }

/* , function (err, user) {
  console.log(user)
        if (err){
          res.json(err)
        }
        if (!user) {
            res.status(403).send({success: false, msg: 'Authentication Failed, User not found'})
        }else{
          var isPw = hash.compare(req.body.password,user.password)
          if (isPw){ 
            console.log('pw right')
          }else{
            console.log('PW falsch')
          }
        }
 */  
/* console.log(body); */
 /*  res.json(user)} */
/* }) */
      }
})


/* router.post('/', async function (req, res) {
  // read login data from request body
  const password = req.body.password
  const mail = req.body.email

  
  var token
 
  // get the user with the given mail --> controller umwandeln
  var user 
  if(password || mail){
  const result = await userControler.findByEmail(mail)
    user = result
  }

  // error if user doesnt exist
  if (user === null) {
    return res.status(400).send('no user with this mail')
  }

  // check password
  if (await hash.compare(password, user.password)) {
    token = signToken(user._id, true)

    var result = {
      id: user._id,
      token: token
    }

    return res.json(result)
  } else return res.status(400).send('wrong password')
})

function signToken(id, user) {

  var token = jwt.sign(
    {
        userID: id,
        isUser: user,
    },
    process.env.JWT_SECRET, { expiresIn: 3600 })// default is s --> 120 equals 2 min --> other options "2 days" , "10h", "7d"

  return token
} */

module.exports = router
