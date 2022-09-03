const express = require("express")//call express
const path = require("path")
const mongoose = require("mongoose")
const passport = require("passport")

// const routes = require("./routes/routes")
const workerRoutes = require("./routes/workerRoutes")
// const produceRoutes = require("./routes/produceRoutes")
const signUpRoutes = require("./routes/signUpRoutes")
const logInRoutes = require("./routes/logInRoutes")
const randomRoutes = require("./routes/randomRoutes")

const Signup = require("./models/signUp")
const router = require("./routes/signUpRoutes")

const app = express()

const expressSession = require('express-session')({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  });

// const workerModel = require("./models/workerModel")
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "pug")

//db connect\\\
//mongodb://localhost:27017
mongoose.connect("mongodb://localhost:27017/farm",
    { useNewUrlParser: true,
    useUnifiedTopology: true},
    (err) => {
        if(!err) console.log("Connected to mongoDB");
        else console.log("Error connecting to mongoDB  " + err)
    })

app.use(expressSession)
// configuring passport
app.use(passport.initialize());
app.use(passport.session());

//-----------------------------------
passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());



// app.use("/", routes)
app.use("/", workerRoutes)
app.use("/", signUpRoutes)
app.use("/", logInRoutes)
app.use("/", randomRoutes)

// app.get("/", async(req, res)=> {
//     const workers = await workerModel.find({})
//     // console.log(workers)
//     res.render("index", {
//         title: "Pug", 
//         data: workers
//     })
// })


app.listen(process.env.port || 3000)//should alwways be the last line of code
console.log("server running on port" + (process.env.port || 3000))


// create html file
// create a path in indexedDB.js
// go to indexedDB.html to the html file

// delete and update
// retrieve data from the database and upload
// sign up