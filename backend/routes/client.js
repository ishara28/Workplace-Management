const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

// Get all Clients
router.get("/", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM client";
    let query = mySqlConnection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
      // res.json(result);
    });
  } else {
    res.status(401);
    res.end();
  }
});

//Get all the blocked client
router.get("/blocked", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM blocked_client";
    let query = mySqlConnection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
      // res.json(result);
    });
  } else {
    res.status(401);
    res.end();
  }
});

// Get a single client
router.get("/:c_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM `client` WHERE c_id = ? ";
    let query = mySqlConnection.query(sql, req.params.c_id, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } else {
    res.status(401);
    res.end();
  }
});

//Active existing client (Change status to INACTIVE)
router.post("/inactive/:c_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE client SET status = 'INACTIVE' WHERE c_id = ?";
    let query = mySqlConnection.query(sql, req.params.c_id, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("INACTIVE");
    });
  } else {
    res.status(401);
    res.end();
  }
});

//Inactive existing client (Change status to ACTIVE)
router.post("/active/:c_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE client SET status = 'ACTIVE' WHERE c_id = ?";
    let query = mySqlConnection.query(sql, req.params.c_id, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("ACTIVE");
    });
  } else {
    res.status(401);
    res.end();
  }
});

//Remove existing client (Change status to REMOVED)
router.post("/remove/:c_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE client SET status = 'REMOVED' WHERE c_id = ?";
    let query = mySqlConnection.query(sql, req.params.c_id, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("REMOVED");
    });
  } else {
    res.status(401);
    res.end();
  }
});

//Register a client
router.post("/register", (req, res) => {
  if (req.session.isLogged) {
    let client = {
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

    let sql = "INSERT INTO client SET ?";

    let query = mySqlConnection.query(sql, client, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("client added!");
    });
  } else {
    res.status(401);
    res.end();
  }
});

//Update a client
router.post("/update/:c_id", (req, res) => {
  if (req.session.isLogged) {
    let client = {
      nic_passport: req.body.nic_passport,
      name: req.body.name,
      reg_date: req.body.reg_date,
      description: req.body.description,
      address: req.body.address,
      telephone: req.body.telephone,
      email: req.body.email,
    };
    let sql = "UPDATE client SET ? WHERE c_id = ?";
    let query = mySqlConnection.query(
      sql,
      [client, req.params.c_id],
      (err, result) => {
        console.log("client Updated");
        res.send("client Updated");
      }
    );
  } else {
    res.status(401);
    res.end();
  }
});

//Block an existing client
router.post("/block/:c_id", (req, res) => {
  if (req.session.isLogged) {
    let blockedClient = {
      c_id: req.params.c_id,
      blocked_date: req.body.blocked_date,
      reason: req.body.reason,
    };

    let sql =
      "UPDATE client SET status = 'BLOCKED' WHERE c_id = ? ; INSERT INTO blocked_client SET ?";

    let query = mySqlConnection.query(
      sql,
      [req.params.c_id, blockedClient],
      (err, result) => {
        if (err) throw err;
        console.log("User Blocked");
        res.send("User Blocked");
      }
    );
  } else {
    res.status(401);
    res.end();
  }
});


module.exports = router;
