const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

// Get all Clients
router.get("/", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM customer";
    let query = mySqlConnection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("AA");
      console.log(result);
      res.send(result);
      // res.json(result);
    });
  } else {
    res.send("Login First!");
  }
});

//Get all the blocked customer
router.get("/blocked", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM blocked_customer";
    let query = mySqlConnection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
      // res.json(result);
    });
  } else {
    res.send("Login First!");
  }
});

// Get a single customer
router.get("/:c_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM `customer` WHERE c_id = ? ";
    let query = mySqlConnection.query(sql, req.params.c_id, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } else {
    res.send("Login First!");
  }
});

//Active existing customer (Change status to INACTIVE)
router.post("/inactive/:c_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE customer SET status = 'INACTIVE' WHERE c_id = ?";
    let query = mySqlConnection.query(sql, req.params.c_id, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("INACTIVE");
    });
  } else {
    res.send("Login First!");
  }
});

//Inactive existing customer (Change status to ACTIVE)
router.post("/active/:c_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE customer SET status = 'ACTIVE' WHERE c_id = ?";
    let query = mySqlConnection.query(sql, req.params.c_id, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("ACTIVE");
    });
  } else {
    res.send("Login First!");
  }
});

//Remove existing customer (Change status to REMOVED)
router.post("/remove/:c_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE customer SET status = 'REMOVED' WHERE c_id = ?";
    let query = mySqlConnection.query(sql, req.params.c_id, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("REMOVED");
    });
  } else {
    res.send("Login First!");
  }
});

//Register a customer
router.post("/register", (req, res) => {
  if (req.session.isLogged) {
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
  } else {
    res.send("Login First!");
  }
});

//Update a customer
router.post("/update/:c_id", (req, res) => {
  if (req.session.isLogged) {
    let customer = {
      nic_passport: req.body.nic_passport,
      name: req.body.name,
      reg_date: req.body.reg_date,
      description: req.body.description,
      address: req.body.address,
      telephone: req.body.telephone,
      email: req.body.email,
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
  } else {
    res.send("Login First!");
  }
});

//Block an existing customer
router.post("/block/:c_id", (req, res) => {
  if (req.session.isLogged) {
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
  } else {
    res.send("Login First!");
  }
});


module.exports = router;
