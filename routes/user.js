const express = require("express");
const User = require("../models/users.model");
const usercontroller = require('../controller/userController')
var router = express.Router();

// TODO: 

router.get("/", async  (req,res)=> {
    console.log("user router GETCALL");
    try {
        let result = await usercontroller.getAllUsers();
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("user router GETCALL done");
})

router.get("/:id", async  (req,res)=> {
    console.log("user/:id router GETCALL");
    const UserID = req.params.id;
    try {
        let result = await usercontroller.getSpesficUser(UserID);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("user/:id router GETCALL done");
})

router.post("/", async (req,res) => {
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
        let result = await usercontroller.createUser(user);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("user router PostCALL done");
})

router.put("/:id", async (req,res) => {
    console.log("Update User by ID router PUTCALL")
    const UserId = req.params.id
    const UserBodyToUpdate = req.body
    try {
        let result = await usercontroller.updateUser(UserId,UserBodyToUpdate)
    res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("Update User by ID router PUTCALL done")
})

router.delete("/:id", async (req,res) => {
    console.log("Delete User by ID router DELETECALL");
    const UserID = req.params.id
    try {
        let result = await usercontroller.delteUserbyId(UserID);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
    console.log("Delete User by ID router DELETECALL done "); 
})

module.exports = router;