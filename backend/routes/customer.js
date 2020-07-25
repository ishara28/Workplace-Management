const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

// Get all customer
router.get("/", (req, res) => {
  let sql = "SELECT * FROM customer";
  let query = mySqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    // res.json(result);
  });
});

//Get all the blocked customer
router.get("/blocked", (req, res) => {
  let sql = "SELECT * FROM blocked_customer";
  let query = mySqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    // res.json(result);
  });
});

// Get a single customer
router.get("/:c_id", (req, res) => {
  let sql = "SELECT * FROM `customer` WHERE c_id = ? ";
  let query = mySqlConnection.query(sql, req.params.c_id, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//Remove existing customer (Change status to REMOVED)
router.post("/remove/:c_id", (req, res) => {
  let sql = "UPDATE customer SET status = 'REMOVED' WHERE c_id = ?";
  let query = mySqlConnection.query(sql, req.params.c_id, (err, result) => {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.send("REMOVED");
  });
});

//Register a customer
router.post("/register", (req, res) => {
  let customer = {
    index_no: req.body.index_no,
    name: req.body.name,
    nic_passport: req.body.nic_passport,
    address: req.body.address,
    telephone: req.body.telephone,
    email: req.body.email,
    description: req.body.description,
    reg_date: req.body.reg_date,
    status: req.body.status,
  };

  let sql = "INSERT INTO customer SET ?";

  let query = mySqlConnection.query(sql, customer, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Customer added!");
  });
});

//Update a customer
router.post("/update/:c_id", (req, res) => {
  let customer = {
    name: req.body.name,
    nic_passport: req.body.nic_passport,
    address: req.body.address,
    telephone: req.body.telephone,
    email: req.body.email,
    description: req.body.description,
  };
  let sql = "UPDATE customer SET ? WHERE c_id = ?";
  let query = mySqlConnection.query(
    sql,
    [customer, req.params.c_id],
    (err, result) => {
      console.log("Customer Updated");
      res.send("Customer Updated");
    }
  );
});

//Block an existing customer
router.post("/block/:c_id", (req, res) => {
  let blockedCustomer = {
    c_id: req.params.c_id,
    blocked_date: req.body.blocked_date,
    reason: req.body.reason,
  };

  let sql =
    "UPDATE customer SET status = 'BLOCKED' WHERE c_id = ? ; INSERT INTO blocked_customer SET ?";

  let query = mySqlConnection.query(
    sql,
    [req.params.c_id, blockedCustomer],
    (err, result) => {
      if (err) throw err;
      console.log("User Blocked");
      res.send("User Blocked");
    }
  );
});

module.exports = router;
