const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

//Get all agreements
router.get("/", (req, res) => {
  let sql = "SELECT * FROM agreement";
  let query = mySqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Get all blocked agreements
router.get("/blocked", (req, res) => {
  let sql = "SELECT * FROM blocked_agreement";
  let query = mySqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Get a single workhouse
router.get("/:a_id", (req, res) => {
  let sql = "SELECT * FROM agreement  WHERE a_id = ?";
  let query = mySqlConnection.query(sql, req.params.a_id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Register a agreement
router.post("/register", (req, res) => {
  let agreement = {
    a_id: req.body.a_id,
    index_no: req.body.index_no,
    reg_date: req.body.reg_date,
    reg_id: req.body.reg_id,
    description: req.body.description,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    status: req.body.status,
  };

  let sql = "INSERT INTO agreement SET ? ";
  let query = mySqlConnection.query(sql, agreement, (err, result) => {
    if (err) throw err;
    res.send("Agreement Inserted!");
  });
});

//Update agreement details
router.post("/update/:a_id", (req, res) => {
  let agreement = {
    reg_id: req.body.reg_id,
    description: req.body.description,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };
  let sql = "UPDATE agreement SET ? WHERE a_id = ?";
  let query = mySqlConnection.query(
    sql,
    [agreement, req.params.a_id],
    (err, result) => {
      if (err) throw err;
      res.send("Updated Successfully!");
    }
  );
});

//Remove existing agreement
router.post("/remove/:a_id", (req, res) => {
  let sql = "UPDATE agreement SET status = 'REMOVED' WHERE a_id = ?";
  let query = mySqlConnection.query(sql, req.params.a_id, (err, result) => {
    if (err) throw err;
    res.send("Removed");
  });
});

//Block existing agreement
router.post("/block/:a_id", (req, res) => {
  let blockAgreement = {
    a_id: req.params.a_id,
    blocked_date: req.body.blocked_date,
    reason: req.body.reason,
  };

  let sql =
    "UPDATE agreement SET status = 'BLOCKED' WHERE a_id = ? ; INSERT INTO blocked_agreement SET ?";

  let query = mySqlConnection.query(
    sql,
    [req.params.a_id, blockAgreement],
    (err, result) => {
      if (err) throw err;
      console.log("Agreement Blocked");
      res.send("Agreement Blocked");
    }
  );
});

module.exports = router;