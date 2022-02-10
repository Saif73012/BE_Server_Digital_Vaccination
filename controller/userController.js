const User = require("../models/users.model");

async function getAllUsers(){
    var result = await User.find({})
    .exec()
    return result
    /* .then(Users => {
        res.status(200).json(Users)
    })
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */
       /* 
try {
    const Users = await User.find({});
    res.json(Users).status(200);
} catch (error) {
    res.status(403).json({error});
    
} */

}

async function getSpesficUser(id){
    var result = await User.findById(id,{})
    .exec()
    return result
   /*  .then(user => {
        res.status(200).json(user)})
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */
}

async function findByEmail(emailbody){
    var result = await User.findOne({ email: emailbody })
    .exec();
    return result
}

async function createUser(user){
    var result = await user.save()
    return result
    /* .then(newUser => {
        res.status(200).json(newUser)
    })
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */


   /*  try {
        await user.save()
        res.status(200).json(user);
    } catch (error) {
        res.status(403).json({error});
    } */

}

async function updateUser(id,body){
    var result = await User.findByIdAndUpdate(id,body)
    .exec()
    return result
    /* .then(userUpdate => {
        res.status(200).json(userUpdate)
    })
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */

   /*  try {
        const Userupdated = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(Userupdated)
    } catch (error) {
        res.status(403).json({error});
    } */
}

async function delteUserbyId(id){
    var result = await User.findByIdAndDelete(id)
    .exec()
    return result
    /* .then(userDelete => {
        res.status(200).json(userDelete)
    })
    .catch(err => {
        console.log(err);
        res.status(403).json( {
            error: err
        });
    }) */

   /*  try {
        const UserbodyDelete = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(UserbodyDelete)
    } catch (error) {
        res.status(403).json({error});
    } */
}
exports.findByEmail = findByEmail
exports.getAllUsers =getAllUsers
exports.getSpesficUser =getSpesficUser
exports.createUser =createUser
exports.updateUser =updateUser
exports.delteUserbyId =delteUserbyId