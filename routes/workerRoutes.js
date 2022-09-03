const { application } = require("express")
const express = require("express")
const workerModel = require("../models/workerModel")
const connectEnsureLogin = require("connect-ensure-login");


const router = express.Router()

router.get("/", connectEnsureLogin.ensureLoggedIn(),
async (req, res)=> {
    const workers = await workerModel.find({})
    res.render("worker",{
        title: "Employees", workers
    })
})


router.get("/profile", connectEnsureLogin.ensureLoggedIn()
,(req, res) =>{
    res.render("test")
})

router.get("/worker-form", connectEnsureLogin.ensureLoggedIn(),
(req, res) =>{
    res.render("WorkerForm")
})

// methods of routing
// get - gets data from the server
// post - gets data from front end & sends to back end
// update - updates info already
// delete - deletes info from database

//post routes
router.post("/newWorker", connectEnsureLogin.ensureLoggedIn(),
async (req, res)=>{
    try{
    const newWorker = new workerModel(req.body)
    await newWorker.save()
    res.redirect("/worker-form")
    console.log(req.body)
}
catch(err){
    res.status(400).render("workerForm")
}
})

// get routes
router.get("/worker-list", connectEnsureLogin.ensureLoggedIn(),
async (req, res) =>{
    try{
        console.log(req.user.firstname)
        let items = await workerModel.find();
        res.render("workerList", {workers: items, username: req.user.firstname})
    }
    catch(err){
        console.log(err)
        res.send("Couldn't retrieve workers list")
    }
})

//delete routes
router.post("/worker-list", connectEnsureLogin.ensureLoggedIn(),
async (req, res) =>{
    try{
        await workerModel.deleteOne({
            _id: req.body._id
        })
        res.redirect("/worker-list")
    }
    catch(err){
        res.status(400).send("Unable to delete item from the database")
    }
})

//edit/ update routes
router.get("/editWorker/:id", connectEnsureLogin.ensureLoggedIn(),
async (req, res)=>{
    try {
        const currentWorker = await workerModel.findById({_id:req.params.id})
        res.render("editWorker",{worker:currentWorker})
    } catch (error) {
        
    }
})

router.post("/editWorker", connectEnsureLogin.ensureLoggedIn(),
async (req, res)=>{
    try {
        await workerModel.findByIdAndUpdate({_id:req.query.id}, req.body)
        res.redirect("/worker-list")
    } catch (error) {
        
    }
})

module.exports = router