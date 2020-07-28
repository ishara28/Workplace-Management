const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

//Get all projects
router.get("/", (req, res) => {
  let sql = "SELECT * FROM project";
  let query = mySqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Get a single project
router.get("/:p_id", (req, res) => {
  let sql = "SELECT * FROM project  WHERE p_id = ?";
  let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//Register a project
router.post("/register", (req, res) => {
  let project = {
    owner_id: req.body.owner_id,
    index_no: req.body.index_no,
    reg_date: req.body.reg_date,
    description: req.body.description,
    estimated_start: req.body.estimated_start,
    estimated_days: req.body.estimated_days,
    estimated_value: req.body.estimated_value,
    status: req.body.status,
    workhouse_id: req.body.workhouse_id,
    agent_id: req.body.agent_id,
    agreement_id: req.body.agreement_id,
  };

  let sql = "INSERT INTO project SET ? ";
  let query = mySqlConnection.query(sql, project, (err, result) => {
    if (err) throw err;
    res.send("Project Inserted!");
  });
});

//Update project details
router.post("/update/:p_id", (req, res) => {
  let project = {
    owner_id: req.body.owner_id,
    description: req.body.description,
    estimated_start: req.body.estimated_start,
    estimated_days: req.body.estimated_days,
    estimated_value: req.body.estimated_value,
    workhouse_id: req.body.workhouse_id,
    agent_id: req.body.agent_id,
  };
  let sql = "UPDATE project SET ? WHERE p_id = ?";
  let query = mySqlConnection.query(
    sql,
    [project, req.params.p_id],
    (err, result) => {
      if (err) throw err;
      res.send("Updated Successfully!");
    }
  );
});

//Start a Project
router.post("/start/:p_id", (req, res) => {
  let sql = "UPDATE project SET status = 'STARTED' WHERE p_id = ?";
  let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
    if (err) throw err;
    res.send("Project Started!");
  });
});

//End  a Project
router.post("/end/:p_id", (req, res) => {
  let sql = "UPDATE project SET status = 'DONE' WHERE p_id = ?";
  let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
    if (err) throw err;
    res.send("Project Done!");
  });
});

//Close  a Project
router.post("/close/:p_id", (req, res) => {
  let sql = "UPDATE project SET status = 'PAYED' WHERE p_id = ?";
  let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
    if (err) throw err;
    res.send("Project Payed and Closed!");
  });
});

//Cancel a Project
router.post("/cancel/:p_id", (req, res) => {
  let sql = "UPDATE project SET status = 'CANCELLED' WHERE p_id = ?";
  let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
    if (err) throw err;
    res.send("Project Cancelled!");
  });
});

module.exports = router;
