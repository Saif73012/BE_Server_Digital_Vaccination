const hash = require("../auth/hash")
const jwt = require('jsonwebtoken')

const patientController = require("../controller/patientController")
const jwtController = require("../middleware/jwt_middleware")

module.exports= async function middlewarePatient (req,res,next) {

    

    if(req.method==="POST"){
             console.log('post test')
    }else if(req.method ==="DELETE"){
        await jwtController.checkToken(req,res,next)
    }else if(req.method==="PUT"){
        await jwtController.checkToken(req,res,next)
    }else if(req.method==="GET"){
        if(authenticated){
            console.log('post allowed')
        }else{
            console.log('post not allowed')
        }
        
    }else{
        console.log("no access without token");
        next();
    }
}