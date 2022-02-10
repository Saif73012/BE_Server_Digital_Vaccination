const express = require("express")
const bodyParser = require("body-parser")
const mongoose= require("mongoose")
require('dotenv').config()
const User = require("./models/users.model");
const app = express();
var jwt = require('express-jwt');
var patientMiddleware = require("./middleware/patient_middleware")
var entryMiddleware = require("./middleware/entry_middleware")
var jwtMiddleware = require("./middleware/jwt_middleware");
/*  
TODO: 

bodyParser -> depricated version undo 
create collection for mongoDB --> done 
create Schema for Objects --> done partly --> for Users only
create ROutes for objects ->
further problems the route/userjs cant be used for some reason --> done
  Users
    save into DB functions now partly --- DONE
    final routes needs to be done (CRUD) --- DONE
  Impfung
    model is needed --- DONE
    ROutes is needed (CRUD) --- DONE
   
    
--> look up Code from nextbook how did u handle it there for middleware --> for hashing passwords   
Hashing pw with middleware --> DONE


next step --> 
1.create an schema for an joint object -> eintrag --> with the ids of the vacine and with the user to join them in an object
-- https://kb.objectrocket.com/mongo-db/how-to-join-collections-using-mongoose-228
-- https://mongoosejs.com/docs/populate.html

2.JWT Token
see nextbook and npm 

3.create auth - > jwt sessions -> backend --> lookup YT 

(maybe TESTING error Handling -->) BE finish after that.




Heroku registerd now deploy BE to web --> make one homepage aswell for the time being 
then use flutter and connect the data






*/ 

/*  ALternative
2. look up tut -> mongoDB into flutter and use the tutorial to follow up

3. Use Firebase und try it via tuts or blogposts tuts  */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.json({ message: "Welcome to the backend env." })
}); 

//middleware
var userRoute = require("./routes/user");
app.use("/user",jwtMiddleware,userRoute);

var vacineRoute = require("./routes/vacine")
app.use("/vacine",jwtMiddleware,vacineRoute);

var patientRoute = require("./routes/patient")
app.use("/patient",jwtMiddleware,patientMiddleware,patientRoute);

var entryRoute = require("./routes/entry")
app.use("/entry",jwtMiddleware,entryMiddleware,entryRoute)
// create more routes

//authentication
var tokenRouter =  require("./auth/token")
app.use('/token', tokenRouter)
app.use('/token', jwt({ secret: process.env.TOKEN_KEY ,algorithms: ['HS256']}))


var loginRouter =  require("./auth/login");

app.use('/login', loginRouter)
/* app.use('/login', jwt({ secret: process.env.JWT_SECRET ,algorithms: ['HS256']})) */


const url = process.env.DB_URL
mongoose.connect(url,{   useNewUrlParser: true,
  useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error: '));
db.once('open',function(){
  console.log("DB is alive")
})
                

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

