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
  supplier_name: String,
};

const supplierSchema = {
  name: String,
  supplier_id: String,
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

const Supplier = mongoose.model("Supplier", supplierSchema);

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
      supplier_id: req.body.supplier_id,
      supplier_name: req.body.supplier_name,
    });

    const newStock = new Stock({
      product_id: req.body.product_id,
      supplier_id: req.body.supplier_id,
      stock: 0,
      reorder: -1,
      reorder_qty: 0,
    });

    newItem.save(function (err) {
      if (!err) {
        newStock.save(function (err) {
          if (!err) {
          } else {
            console.log("FAIL", err);
            res.send("FAIL");
          }
        });
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
    supplier_name: req.body.supplier_name,
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

app.route("/updateStock").post(function (req, res) {
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
  console.log(req);
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

app.route("/getAllStock").get(function (req, res) {
  Stock.find({}, function (err, foundStocks) {
    if (foundStocks) {
      res.send(foundStocks);
    } else {
      res.send(err);
    }
  });
});

app.route("/role").get(function (req, res) {
  Role.findOne({ uid: req.query.uid }, function (err, foundUser) {
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
    const newRole = new Role({
      uid: req.body.uid,
      name: req.body.name,
      role: req.body.role,
    });
    newRole.save(function (err) {
      if (!err) {
        if (req.body.role == "Supplier") {
          const newSupplier = new Supplier({
            name: req.body.name,
            supplier_id: req.body.uid,
          });

          console.log(newSupplier);

          newSupplier.save(function (err) {
            if (!err) {
              //res.send("SUCCESS");
            } else {
              console.log("FAIL", err);
              res.send("FAIL");
            }
          });
        }
        console.log("SUCCESS");
        res.send("SUCCESS");
      } else {
        console.log("FAIL", err);
        res.send("FAIL");
      }
    });
  });

app.route("/createInvoice").post(async function (req, res) {
  try {
    const items = req.body.items;

    // Update stock and add sales information for each item
    for (let i = 0; i < items.length; i++) {
      const ele = items[i];
      const foundStock = await Stock.findOne({ product_id: ele.product_id });
      if (foundStock && foundStock.stock >= ele.qty) {
        const newStock = foundStock.stock - ele.qty;
        const updatedStock = {
          product_id: foundStock.product_id,
          supplier_id: foundStock.supplier_id,
          stock: newStock,
          reorder: foundStock.reorder,
          reorder_qty: foundStock.reorder_qty,
        };
        await Stock.updateOne(
          { product_id: foundStock.product_id },
          { $set: updatedStock }
        );

        // Add sales information
        const newSale = new Sales({
          product_id: ele.product_id,
          quantity: ele.qty,
          total_price: ele.qty * ele.price,
          date: new Date(),
          invoice_id: ele.invoice_id,
        });
        await newSale.save();
      } else {
        res.send({
          code: "FAIL",
          message: "Quantity ordered more than stock",
          item: foundStock.product_id,
          stock: foundStock.stock,
        });
      }
    }

    // Create new invoice
    const newInvoice = new Invoice({
      invoice_id: req.body.invoice_id,
      total_price: req.body.total_price,
      date: req.body.date,
    });
    await newInvoice.save();
    res.send("SUCCESS");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app
  .route("/createSupplier")

  .post(function (req, res) {
    const newSupplier = new Supplier({
      name: req.body.name,
      supplier_id: req.body.supplier_id,
    });

    newSupplier.save(function (err) {
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

app.route("/getAllSuppliers").get(function (req, res) {
  Sales.find({}, function (err, foundSuppliers) {
    if (foundSuppliers) {
      res.send(foundSuppliers);
    } else {
      res.send(err);
    }
  });
});

app.route("/supplierById").get(function (req, res) {
  Supplier.findOne(
    { supplier_id: req.query.supplier_id },
    function (err, foundSupplier) {
      if (foundSupplier) {
        res.send(foundSupplier);
      } else {
        res.send(err);
      }
    }
  );
});
app.route("/getGraphs").get(function (req, res) {
  Supplier.find({}, function (err, data) {
    if (data) {
      res.send(data);
    } else {
      res.send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
