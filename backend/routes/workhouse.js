const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

//Get all workhouses
router.get("/", (req, res) => {
  let sql = "SELECT * FROM workhouses";
  let query = mySqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Get all blocked workhouses
router.get("/blocked", (req, res) => {
  let sql = "SELECT * FROM blocked_workhouses";
  let query = mySqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Register a workhouse
router.post("/register", (req, res) => {
  let workhouse = {
    w_id: req.body.w_id,
    index_no: req.body.index_no,
    reg_date: req.body.reg_date,
    status: req.body.status,
    address: req.body.address,
    telephone: req.body.telephone,
    email: req.body.email,
    description: req.body.description,
    c_id: req.body.c_id,
  };

  let sql = "INSERT INTO workhouses SET ? ";
  let query = mySqlConnection.query(sql, workhouse, (err, result) => {
    if (err) throw err;
    res.send("Workhouse Inserted!");
  });
});

//Get a single workhouse
router.get("/:w_id", (req, res) => {
  let sql = "SELECT * FROM workhouses  WHERE w_id = ?";
  let query = mySqlConnection.query(sql, req.params.w_id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Update workhouse details
router.post("/update/:w_id", (req, res) => {
  let workhouse = {
    address: req.body.address,
    telephone: req.body.telephone,
    email: req.body.email,
    description: req.body.description,
    c_id: req.body.c_id,
  };
  let sql = "UPDATE workhouses SET ? WHERE w_id = ?";
  let query = mySqlConnection.query(
    sql,
    [workhouse, req.params.w_id],
    (err, result) => {
      if (err) throw err;
      res.send("Updated Successfully!");
    }
  );
});

//Remove existing workhouse
router.post("/remove/:w_id", (req, res) => {
  let sql = "UPDATE workhouses SET status = 'REMOVED' WHERE w_id = ?";
  let query = mySqlConnection.query(sql, req.params.w_id, (err, result) => {
    if (err) throw err;
    res.send("Removed");
  });
});

//Block existing workhouse
router.post("/block/:w_id", (req, res) => {
  let blockWorkhose = {
    w_id: req.params.w_id,
    blocked_date: req.body.blocked_date,
    reason: req.body.reason,
  };

  let sql =
    "UPDATE workhouses SET status = 'BLOCKED' WHERE w_id = ? ; INSERT INTO blocked_workhouses SET ?";

  let query = mySqlConnection.query(
    sql,
    [req.params.w_id, blockWorkhose],
    (err, result) => {
      if (err) throw err;
      console.log("Workhose Blocked");
      res.send("Workhouse Blocked");
    }
  );
});

module.exports = router;
