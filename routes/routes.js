const express = require("express")
const path = require("path")

const app = express()


app.get("/", (res, req) => {
    res.sendFile(path.join(__dirname, "/test.pug"))
})

app.get("/file", (res, req) => {
    res.sendFile(path.join(__dirname, "/file.html"))
})

// create a route (get)

app.get("/", (req, res)=> {
    res.send("This is my homepage")
})

app.get("/home", (req, res)=> {
    res.send("Welcome to our homepage")
})

app.get("/profile", (req, res)=> {
    res.send("Welcome to our Profile")
})

app.get("/gallery", (req, res)=> {
    res.send("Welcome to our gallery")
})



// always the last line in the information
app.listen(process.env.port || 3000)
console.log("server running on port" + (process.env.port || 3000))