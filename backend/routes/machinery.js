const router = require("express").Router();
const mysqlConnection = require("../dbconnection");

//Get all the machineries
router.get("/", (req, res) => {
  let sql =
    "SELECT m_id, c_id, machinery.index_no, machinery.reg_id, machinery.reg_date, category, machinery.description, machinery.status, machinery.owner_index_no, customer.name FROM machinery LEFT OUTER JOIN customer ON machinery.owner_index_no=customer.index_no";
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
    owner_index_no: req.body.owner_index_no,
  };

  let sql_1 = "SELECT * FROM customer WHERE index_no = ? ";
  let query_1 = mysqlConnection.query(
    sql_1,
    req.body.owner_index_no,
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        let sql = "INSERT INTO machinery SET ? ";
        let query = mysqlConnection.query(sql, machinery, (err, result) => {
          if (err) throw err;
          res.send("New Machinery registered");
        });
      } else {
        res.send({
          isError: true,
          message: "Select a valid owner",
        });
      }
    }
  );
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
    reg_id: req.body.reg_id,
    category: req.body.category,
    description: req.body.description,
    owner_index_no: req.body.owner_index_no,
  };

  ///////////////////////////////////

  let sql_1 = "SELECT * FROM customer WHERE index_no = ? ";
  let query_1 = mysqlConnection.query(
    sql_1,
    req.body.owner_index_no,
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        let sql = "UPDATE machinery SET ? WHERE m_id = ?";
        let query = mysqlConnection.query(
          sql,
          [machinery, req.params.m_id],
          (err, result) => {
            console.log("Machinery Updated");
            res.send("Machinery Updated");
          }
        );
      } else {
        res.send({
          isError: true,
          message: "Select a valid owner",
        });
      }
    }
  );

  /////////////////////////////////////
});

module.exports = router;
