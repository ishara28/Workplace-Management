const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

//Get all workhouse
router.get("/", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM workhouse";
    let query = mySqlConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    res.send("Login First!");
  }
});

//Get all blocked workhouse
router.get("/blocked", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM blocked_workhouse";
    let query = mySqlConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    res.send("Login First!");
  }
});

//Register a workhouse
router.post("/register", (req, res) => {
  if (req.session.isLogged) {
    let workhouse = {
      index_no: req.body.index_no,
      index_no: req.body.index_no,
      reg_date: req.body.reg_date,
      status: req.body.status,
      address: req.body.address,
      telephone: req.body.telephone,
      email: req.body.email,
      description: req.body.description,
      c_id: req.body.c_id,
    };

    let sql = "INSERT INTO workhouse SET ? ";
    let query = mySqlConnection.query(sql, workhouse, (err, result) => {
      if (err) throw err;
      res.send("Workhouse Inserted!");
    });
  } else {
    res.send("Login First!");
  }
});

//Get a single workhouse
router.get("/:index_no", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM workhouse  WHERE index_no = ?";
    let query = mySqlConnection.query(
      sql,
      req.params.index_no,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } else {
    res.send("Login First!");
  }
});

//Update workhouse details
router.post("/update/:index_no", (req, res) => {
  if (req.session.isLogged) {
    let workhouse = {
      address: req.body.address,
      telephone: req.body.telephone,
      email: req.body.email,
      description: req.body.description,
      c_id: req.body.c_id,
    };
    let sql = "UPDATE workhouse SET ? WHERE index_no = ?";
    let query = mySqlConnection.query(
      sql,
      [workhouse, req.params.index_no],
      (err, result) => {
        if (err) throw err;
        res.send("Updated Successfully!");
      }
    );
  } else {
    res.send("Login First!");
  }
});

//Remove existing workhouse
router.post("/remove/:index_no", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE workhouse SET status = 'REMOVED' WHERE index_no = ?";
    let query = mySqlConnection.query(
      sql,
      req.params.index_no,
      (err, result) => {
        if (err) throw err;
        res.send("Removed");
      }
    );
  } else {
    res.send("Login First!");
  }
});

//Block existing workhouse
router.post("/block/:index_no", (req, res) => {
  if (req.session.isLogged) {
    let blockWorkhose = {
      index_no: req.params.index_no,
      blocked_date: req.body.blocked_date,
      reason: req.body.reason,
    };

    let sql =
      "UPDATE workhouse SET status = 'BLOCKED' WHERE index_no = ? ; INSERT INTO blocked_workhouse SET ?";

    let query = mySqlConnection.query(
      sql,
      [req.params.index_no, blockWorkhose],
      (err, result) => {
        if (err) throw err;
        console.log("Workhose Blocked");
        res.send("Workhouse Blocked");
      }
    );
  } else {
    res.send("Login First!");
  }
});

module.exports = router;
