const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

mongoose.connect(
  "mongodb+srv://afif:admin@cluster0.vsylghq.mongodb.net/?retryWrites=true&w=majority"
);

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
  uid: String,
  name: String,
  role: String, //admin,sales,warehouse,supplier,analyst
};

const inventorySchema = {
  name: String,
  price: Number,
  product_id: String, // also serves as barcode
  supplier_id: String, //code to identify supplier
};

const supplierSchema = {
  name: String,
  id: String,
};

const stockSchema = {
  product_id: String,
  supplier_id: String,
  stock: Number,
  reorder: Number, // reorder point
  reorder_qty: Number, //amount to be reordered
};

const reorderSchema = {
  product_id: String,
  supplier_id: String,
  qty: Number,
};

const salesSchema = {
  product_id: String,
  quantity: Number,
  total_price: Number,
  date: Date,
  invoice_id: String,
};

const invoiceSchema = {
  invoice_id: String,
  total_price: Number,
  date: Date,
};

// schema land ends

const Role = mongoose.model("Role", roleSchema);

const Item = mongoose.model("Item", inventorySchema);

const Stock = mongoose.model("Stock", stockSchema);

//const Supplier = mongoose.model("Supplier",stockSchema);

const Invoice = mongoose.model("Invoice", invoiceSchema);

const Reorder = mongoose.model("Reorder", reorderSchema);

const Sales = mongoose.model("Sales", salesSchema);

console.log(PORT);

app
  .route("/createItem")

  .post(function (req, res) {
    console.log(req.body.name);
    const newItem = new Item({
      name: req.body.name,
      price: req.body.price,
      product_id: req.body.product_id, // also serves as barcode
      supplier_id: req.body.supplier_id, //code to identify supplier
    });

    const newStock = new Stock({
      product_id: req.body.product_id,
      supplier_id: req.body.supplier_id,
      stock: 0,
      reorder: -1,
      reorder_qty: 0,
    });

    newStock.save(function (err) {
      if (!err) {
        console.log("SUCCESS");
        res.send("SUCCESS");
      } else {
        console.log("FAIL", err);
        res.send("FAIL");
      }
    });

    newItem.save(function (err) {
      if (!err) {
        console.log("SUCCESS");
        res.send("SUCCESS");
      } else {
        console.log("FAIL", err);
        res.send("FAIL");
      }
    });
  });

app.route("/updateItem").post(function (req, res) {
  const updatedItem = new Item({
    name: req.body.name,
    price: req.body.price,
    product_id: req.body.product_id,
    supplier_id: req.body.supplier_id,
  });
  Item.updateOne(
    { product_id: req.body.product_id },
    { $set: { ...req.body } },
    function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("SUCCESS");
      }
    }
  );
});

app.route("/deleteItem").post(function (req, res) {
  Item.deleteOne({ product_id: req.body.product_id }, function (err) {
    if (err) {
      res.send("fail");
    } else {
      res.send("success");
    }
  });
});

app.route("/getAllItems").get(function (req, res) {
  Item.find({}, function (err, items) {
    if (items) {
      res.send(items);
    } else {
      res.send(err);
    }
  });
});

app.route("/updateStock").patch(function (req, res) {
  const updatedStock = new Stock({
    product_id: req.body.product_id,
    supplier_id: req.body.supplier_id,
    stock: req.body.stock,
    reorder: req.body.reorder,
    reorder_qty: req.body.reorder_qty,
  });
  Stock.updateOne(
    { product_id: req.body.product_id },
    { $set: { ...req.body } },
    function (err) {
      if (err) {
        res.send(err);
      } else {
        res.send("SUCCESS");
      }
    }
  );
});

app.route("/getStock").get(function (req, res) {
  Stock.findOne(
    { product_id: req.query.product_id },
    function (err, foundStock) {
      if (foundStock) {
        res.send(foundStock);
      } else {
        res.send(err);
      }
    }
  );
});

app.route("/role").get(function (req, res) {
  const id = req.query.uid;
  Role.findOne({ uid: id }, function (err, foundUser) {
    if (foundUser) {
      res.send(foundUser.role);
    } else {
      res.send("SIGNUP");
    }
  });
});

app
  .route("/assignRole")

  .post(function (req, res) {
    console.log(req.query.name);
    const newRole = new Role({
      uid: req.body.uid,
      name: req.body.name,
      role: req.body.role,
    });
    console.log(newRole);
    newRole.save(function (err) {
      if (!err) {
        console.log("SUCCESS");
        res.send("SUCCESS");
      } else {
        console.log("FAIL", err);
        res.send("FAIL");
      }
    });
  });

app
  .route("/createInvoice")

  .post(function (req, res) {
    const items = req.body.items;

    Sales.collection.insert(items, function (err, docs) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(docs);
        res.send("SUCCESS");
      }
    });

    const newInvoice = new Invoice({
      invoice_id: req.body.invoice_id,
      total_price: req.body.total_price,
      date: req.body.date,
    });

    newInvoice.save(function (err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send("SUCCESS");
      }
    });
  });

// app.route('/createSupplier')

// .post(function(req,res){
//     const newSupplier = new Supplier({
//       name : String,
//       id : String
//     })

//     newSupplier.save(function(err){
//         if(!err){
//           console.log('SUCCESS')
//           res.send("SUCCESS");
//         }
//         else
//         {
//           console.log('FAIL',err)
//           res.send("FAIL");
//         }
//     });
// })

app
  .route("/reorderRequest")

  .post(function (req, res) {
    const newReorderRequest = new Reorder({
      product_id: String,
      supplier_id: String,
      qty: Number,
    });

    newReorderRequest.save(function (err) {
      if (!err) {
        console.log("SUCCESS");
        res.send("SUCCESS");
      } else {
        console.log("FAIL", err);
        res.send("FAIL");
      }
    });
  });

app.route("/deleteReorderRequest").post(function (req, res) {
  Reorder.deleteOne({ product_id: req.body.product_id }, function (err) {
    if (err) {
      res.send("fail");
    } else {
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
