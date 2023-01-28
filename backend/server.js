const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const app = express();

const PORT = process.env.PORT || 5001

app.use(bodyParser.urlencoded({
  extended : true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

mongoose.connect("mongodb+srv://afif:admin@cluster0.vsylghq.mongodb.net/?retryWrites=true&w=majority");

// const testSchema = {
//     name : String
//   };

// const Test = mongoose.model("Test",testSchema);

// const newTest = new Test({
//     name : "Afif Mario Test"
// })

// newTest.save(function(err){
//     if(!err){
//       console.log('hogaya lol')
//     }
//     else
//     {
//       console.log('masti, it failed',err)
//       return;
//     }
//   });