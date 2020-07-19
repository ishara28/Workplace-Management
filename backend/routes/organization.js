const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

//Get all organizations
router.get("/", (req, res) => {
  let sql = "SELECT * FROM organizations";
  let query = mySqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Get all blocked workhouses
router.get("/blocked", (req, res) => {
  let sql = "SELECT * FROM blocked_organizations";
  let query = mySqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Get a single organization
router.get("/:o_id", (req, res) => {
  let sql = "SELECT * FROM organizations  WHERE o_id = ?";
  let query = mySqlConnection.query(sql, req.params.o_id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Register an organization
router.post("/register", (req, res) => {
  let organization = {
    o_id: req.body.o_id,
    index_no: req.body.index_no,
    reg_date: req.body.reg_date,
    reg_id: req.body.reg_id,
    status: req.body.status,
    address: req.body.address,
    telephone: req.body.telephone,
    email: req.body.email,
    description: req.body.description,
    c_id: req.body.c_id,
  };

  let sql = "INSERT INTO organizations SET ?";

  let query = mySqlConnection.query(sql, organization, (err, result) => {
    if (err) throw err;
    res.send("Registered");
  });
});

//Update oranization details
router.post("/update/:o_id", (req, res) => {
  let organization = {
    reg_id: req.body.reg_id,
    address: req.body.address,
    telephone: req.body.telephone,
    email: req.body.email,
    description: req.body.description,
    c_id: req.body.c_id,
  };

  let sql = "UPDATE organizations SET ? WHERE o_id = ?";
  let query = mySqlConnection.query(
    sql,
    [organization, req.params.o_id],
    (err, result) => {
      if (err) throw err;
      res.send("Updated Successfully!");
    }
  );
});

//Remove existing organization
router.post("/remove/:o_id", (req, res) => {
  let sql = "UPDATE organizations SET status = 'REMOVED' WHERE o_id = ?";
  let query = mySqlConnection.query(sql, req.params.o_id, (err, result) => {
    if (err) throw err;
    res.send("Removed");
  });
});

//Block existing organization
router.post("/block/:o_id", (req, res) => {
  let blockOrganization = {
    o_id: req.params.o_id,
    blocked_date: req.body.blocked_date,
    reason: req.body.reason,
  };

  let sql =
    "UPDATE organizations SET status = 'BLOCKED' WHERE o_id = ? ; INSERT INTO blocked_organizations SET ?";

  let query = mySqlConnection.query(
    sql,
    [req.params.o_id, blockOrganization],
    (err, result) => {
      if (err) throw err;
      console.log("Organization Blocked");
      res.send("Organization Blocked");
    }
  );
});

module.exports = router;
