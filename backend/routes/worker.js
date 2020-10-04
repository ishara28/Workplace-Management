const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

// Get all workers
router.get("/", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT worker.w_id, worker.index_no, worker.nic_passport, worker.name, worker.reg_date, site.index_no as site, worker.description, worker.address, worker.telephone, worker.email, worker.status FROM worker JOIN site ON worker.s_id=site.s_id";
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

//Get all the blocked worker
router.get("/blocked", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM blocked_worker";
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

// Get a single worker
router.get("/:w_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM `worker` WHERE w_id = ? ";
    let query = mySqlConnection.query(sql, req.params.w_id, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } else {
    res.send("Login First!");
  }
});

//Active existing worker (Change status to ACTIVE)
router.post("/active/:w_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE worker SET status = 'ACTIVE' WHERE w_id = ?";
    let query = mySqlConnection.query(sql, req.params.w_id, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("ACTIVE");
    });
  } else {
    res.send("Login First!");
  }
});

//Inactive existing worker (Change status to INACTIVE)
router.post("/inactive/:w_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE worker SET status = 'INACTIVE' WHERE w_id = ?";
    let query = mySqlConnection.query(sql, req.params.w_id, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("INACTIVE");
    });
  } else {
    res.send("Login First!");
  }
});

//Remove existing worker (Change status to REMOVED)
router.post("/remove/:w_id", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE worker SET status = 'REMOVED' WHERE w_id = ?";
    let query = mySqlConnection.query(sql, req.params.w_id, (err, result) => {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
      res.send("REMOVED");
    });
  } else {
    res.send("Login First!");
  }
});

//Register a worker
router.post("/register", (req, res) => {
  if (req.session.isLogged) {
    let worker = {
      index_no: req.body.index_no,
      nic_passport: req.body.nic_passport,
      name: req.body.name,
      reg_date: req.body.reg_date,
      s_id: req.body.s_id,
      description: req.body.description,
      address: req.body.address,
      telephone: req.body.telephone,
      email: req.body.email,
      status: req.body.status,
    };

    let sql = "INSERT INTO worker SET ?";

    let query = mySqlConnection.query(sql, worker, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("worker added!");
    });
  } else {
    res.send("Login First!");
  }
});

//Update a worker
router.post("/update/:w_id", (req, res) => {
  if (req.session.isLogged) {
    let worker = {
      nic_passport: req.body.nic_passport,
      name: req.body.name,
      reg_date: req.body.reg_date,
      description: req.body.description,
      address: req.body.address,
      telephone: req.body.telephone,
      email: req.body.email,
    };
    let sql = "UPDATE worker SET ? WHERE w_id = ?";
    let query = mySqlConnection.query(
      sql,
      [worker, req.params.w_id],
      (err, result) => {
        console.log("worker Updated");
        res.send("worker Updated");
      }
    );
  } else {
    res.send("Login First!");
  }
});

//Block an existing worker
router.post("/block/:w_id", (req, res) => {
  if (req.session.isLogged) {
    let blockedWorker = {
      w_id: req.params.w_id,
      blocked_date: req.body.blocked_date,
      reason: req.body.reason,
    };

    let sql =
      "UPDATE worker SET status = 'BLOCKED' WHERE w_id = ? ; INSERT INTO blocked_worker SET ?";

    let query = mySqlConnection.query(
      sql,
      [req.params.w_id, blockedWorker],
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