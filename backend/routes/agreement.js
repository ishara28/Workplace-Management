const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

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
  let sql = "UPDATE agreement SET ? WHERE w_id = ?";
  let query = mySqlConnection.query(
    sql,
    [workhouse, req.params.w_id],
    (err, result) => {
      if (err) throw err;
      res.send("Updated Successfully!");
    }
  );
});

module.exports = router;
