const mongoose = require("mongoose")

// called a Schema in the database
const workerSchema = mongoose.Schema({
    name: String,
    field: String,
    age: Number,
    salary: Number,
})
// const workerModel = new mongoose.model("Worker", workerSchema)

//exports the model. Has been exported outside the model
const workerModel = mongoose.model("Worker", workerSchema)

module.exports = workerModel