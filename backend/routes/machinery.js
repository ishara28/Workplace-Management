const router = require("express").Router();
const mysqlConnection = require("../dbconnection");

//Get all the machineries
router.get("/", (req, res) => {
  let sql = "SELECT * FROM machinery";
  let query = mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Get all the blocked machineries
router.get("/blocked", (req, res) => {
  let sql = "SELECT * FROM blocked_machinery";
  let query = mysqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
    // res.json(result);
  });
});

//Get a single machinery
router.get("/:m_id", (req, res) => {
  let sql = "SELECT * FROM machinery WHERE m_id = ?";
  let query = mysqlConnection.query(sql, req.params.m_id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Register a Machinery
router.post("/register", (req, res) => {
  let machinery = {
    index_no: req.body.index_no,
    reg_id: req.body.reg_id,
    reg_date: req.body.reg_date,
    status: req.body.status,
    category: req.body.category,
    description: req.body.description,
    owner_id: req.body.owner_id,
  };
  let sql = "INSERT INTO machinery SET ? ";
  let query = mysqlConnection.query(sql, machinery, (err, result) => {
    if (err) throw err;
    res.send("New Machinery registered");
  });
});

//Remove existing machinery(Change status to REMOVED)
router.post("/remove/:m_id", (req, res) => {
  let sql = "UPDATE machinery SET status = 'REMOVED' WHERE m_id = ?";
  let query = mysqlConnection.query(sql, req.params.m_id, (err, result) => {
    if (err) throw err;
    res.send("Machinery REMOVED");
  });
});

//Block an existing machinery
router.post("/block/:m_id", (req, res) => {
  let blockedMachinery = {
    m_id: req.params.m_id,
    blocked_date: req.body.blocked_date,
    reason: req.body.reason,
  };

  let sql =
    "UPDATE machinery SET status = 'BLOCKED' WHERE m_id = ? ; INSERT INTO blocked_machinery SET ?";

  let query = mysqlConnection.query(
    sql,
    [req.params.m_id, blockedMachinery],
    (err, result) => {
      if (err) throw err;
      console.log("Machinery Blocked");
      res.send("Machinery Blocked");
    }
  );
});

//Update machine details
router.post("/update/:m_id", (req, res) => {
  let machinery = {
    // m_id: req.params.m_id,
    // index_no: req.body.index_no,
    reg_id: req.body.reg_id,
    // reg_date: req.body.reg_date,
    // status: req.body.status,
    category: req.body.category,
    description: req.body.description,
    c_id: req.body.c_id,
  };
  let sql = "UPDATE machinery SET ? WHERE m_id = ?";
  let query = mysqlConnection.query(
    sql,
    [machinery, req.params.m_id],
    (err, result) => {
      console.log("Machinery Updated");
      res.send("Machinery Updated");
    }
  );
});

module.exports = router;
