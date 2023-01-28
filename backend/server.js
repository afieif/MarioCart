const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const app = express();

const PORT = process.env.PORT || 5001

app.use(bodyParser.urlencoded({
  extended : true
}));

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

mongoose.connect("mongodb+srv://afif:admin@cluster0.vsylghq.mongodb.net/?retryWrites=true&w=majority");

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

const roleSchema = {
    uid : String,
    name : String,
    role : String //admin,sales,warehouse,supplier,analyst
  }

const inventorySchema = {
	name : String,
    price : Number,
	product_id : String, // also serves as barcode
    supplier_id : String //code to identify supplier
}

const supplierSchema = {
    name : String,
    id : String
  }

const stockSchema = {
    product_id : String,
    supplier_id : String,
    stock : Number,
    reorder : Number, // reorder point
    reorder_qty : Number //amount to be reordered
  }

const reorderSchema = {
    product_id : String,
    supplier_id: String,
    qty : Number
  }

const salesSchema = {
    product_id : String,
    quantity : Number,
    total_price : Number,
    date : Date,
    invoice_id : String,
  }

const invoiceSchema = {
    invoice_id : String,
    total_price : Number,
    date : Date,
  }

// schema land ends

const Role = mongoose.model("Role",roleSchema);

console.log(PORT);

app.route('/role')

.get(function(req,res){
    res.send(req.query);
})

app.route('/assignRole')

.post(function(req,res){
    console.log(req.query.name);
    const newRole = new Role({
        uid : req.body.uid,
        name : req.body.name,
        role : req.body.role 
    })
    console.log(newRole);
    newRole.save(function(err){
    if(!err){
      console.log('SUCCESS')
      res.send("SUCCESS");
    }
    else
    {
      console.log('FAIL',err)
      res.send("FAIL");
    }
  });
})



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });