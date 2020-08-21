const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

// Get all Agents
router.get("/", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM agent";
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

//Get all the blocked agent
router.get("/blocked", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM blocked_agent";
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

// Get a single agent
router.get("/:ag_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM `agent` WHERE ag_id = ? ";
    let query = mySqlConnection.query(sql, req.params.ag_id, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } else {
    res.status(401);
    res.end();
  }
});

//Active existing agent (Change status to INACTIVE)
router.post("/inactive/:ag_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE agent SET status = 'INACTIVE' WHERE ag_id = ?";
    let query = mySqlConnection.query(sql, req.params.ag_id, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("INACTIVE");
    });
  } else {
    res.status(401);
    res.end();
  }
});

//Inactive existing agent (Change status to ACTIVE)
router.post("/active/:ag_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE agent SET status = 'ACTIVE' WHERE ag_id = ?";
    let query = mySqlConnection.query(sql, req.params.ag_id, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("ACTIVE");
    });
  } else {
    res.status(401);
    res.end();
  }
});

//Remove existing agent (Change status to REMOVED)
router.post("/remove/:ag_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE agent SET status = 'REMOVED' WHERE ag_id = ?";
    let query = mySqlConnection.query(sql, req.params.ag_id, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("REMOVED");
    });
  } else {
    res.status(401);
    res.end();
  }
});

//Register a agent
router.post("/register", (req, res) => {
  if (req.session.isLogged) {
    let agent = {
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

    let sql = "INSERT INTO agent SET ?";

    let query = mySqlConnection.query(sql, agent, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("agent added!");
    });
  } else {
    res.status(401);
    res.end();
  }
});

//Update an agent
router.post("/update/:ag_id", (req, res) => {
  if (req.session.isLogged) {
    let agent = {
      nic_passport: req.body.nic_passport,
      name: req.body.name,
      reg_date: req.body.reg_date,
      description: req.body.description,
      address: req.body.address,
      telephone: req.body.telephone,
      email: req.body.email,
    };
    let sql = "UPDATE agent SET ? WHERE ag_id = ?";
    let query = mySqlConnection.query(
      sql,
      [agent, req.params.ag_id],
      (err, result) => {
        console.log("agent Updated");
        res.send("agent Updated");
      }
    );
  } else {
    res.status(401);
    res.end();
  }
});

//Block an existing agent
router.post("/block/:ag_id", (req, res) => {
  if (req.session.isLogged) {
    let blockedAgent = {
      ag_id: req.params.ag_id,
      blocked_date: req.body.blocked_date,
      reason: req.body.reason,
    };

    let sql =
      "UPDATE agent SET status = 'BLOCKED' WHERE ag_id = ? ; INSERT INTO blocked_agent SET ?";

    let query = mySqlConnection.query(
      sql,
      [req.params.ag_id, blockedAgent],
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