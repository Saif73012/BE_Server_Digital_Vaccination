const express = require("express");
const User = require("../models/users.model");
const usercontroller = require('../controller/userController')
var router = express.Router();



router.get("/", async  (req,res)=> {
    try {
        let result = await usercontroller.getAllUsers();
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
})

router.get("/:id", async  (req,res)=> {
    const UserID = req.params.id;
    try {
        let result = await usercontroller.getSpesficUser(UserID);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
})

router.post("/", async (req,res) => {
    const user = new User({
        username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      adress:req.body.adress,
      officeName:req.body.officeName,
      isCheckedByAdmin:req.body.isCheckedByAdmin,
    });
    try {
        let result = await usercontroller.createUser(user);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
})

router.put("/:id", async (req,res) => {
    const UserId = req.params.id
    const UserBodyToUpdate = req.body
    try {
        let result = await usercontroller.updateUser(UserId,UserBodyToUpdate)
    res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
})

router.delete("/:id", async (req,res) => {
    const UserID = req.params.id
    try {
        let result = await usercontroller.delteUserbyId(UserID);
        res.status(200).json(result)
    } catch (error) {
        res.status(403).json({error});
    }
})

module.exports = router;