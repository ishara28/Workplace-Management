const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

//Get all projects
router.get("/", (req, res) => {
<<<<<<< HEAD
  let sql = "SELECT * FROM project";
  let query = mySqlConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
=======
  if (req.session.isLogged) {
    let sql = "SELECT * FROM project";
    let query = mySqlConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    res.send("Login First!");
  }
>>>>>>> Ishara
});

//Get a single project
router.get("/:p_id", (req, res) => {
<<<<<<< HEAD
  let sql = "SELECT * FROM project  WHERE p_id = ?";
  let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
=======
  if (req.session.isLogged) {
    let sql = "SELECT * FROM project  WHERE p_id = ?";
    let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    res.send("Login First!");
  }
>>>>>>> Ishara
});

//Register a project
router.post("/register", (req, res) => {
<<<<<<< HEAD
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
=======
  if (req.session.isLogged) {
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
  } else {
    res.send("Login First!");
  }
>>>>>>> Ishara
});

//Update project details
router.post("/update/:p_id", (req, res) => {
<<<<<<< HEAD
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
=======
  if (req.session.isLogged) {
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
  } else {
    res.send("Login First!");
  }
>>>>>>> Ishara
});

//Start a Project
router.post("/start/:p_id", (req, res) => {
<<<<<<< HEAD
  let sql = "UPDATE project SET status = 'STARTED' WHERE p_id = ?";
  let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
    if (err) throw err;
    res.send("Project Started!");
  });
=======
  if (req.session.isLogged) {
    let sql = "UPDATE project SET status = 'STARTED' WHERE p_id = ?";
    let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
      if (err) throw err;
      res.send("Project Started!");
    });
  } else {
    res.send("Login First!");
  }
>>>>>>> Ishara
});

//End  a Project
router.post("/end/:p_id", (req, res) => {
<<<<<<< HEAD
  let sql = "UPDATE project SET status = 'DONE' WHERE p_id = ?";
  let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
    if (err) throw err;
    res.send("Project Done!");
  });
=======
  if (req.session.isLogged) {
    let sql = "UPDATE project SET status = 'DONE' WHERE p_id = ?";
    let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
      if (err) throw err;
      res.send("Project Done!");
    });
  } else {
    res.send("Login First!");
  }
>>>>>>> Ishara
});

//Close  a Project
router.post("/close/:p_id", (req, res) => {
<<<<<<< HEAD
  let sql = "UPDATE project SET status = 'PAYED' WHERE p_id = ?";
  let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
    if (err) throw err;
    res.send("Project Payed and Closed!");
  });
=======
  if (req.session.isLogged) {
    let sql = "UPDATE project SET status = 'PAYED' WHERE p_id = ?";
    let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
      if (err) throw err;
      res.send("Project Payed and Closed!");
    });
  } else {
    res.send("Login First!");
  }
>>>>>>> Ishara
});

//Cancel a Project
router.post("/cancel/:p_id", (req, res) => {
<<<<<<< HEAD
  let sql = "UPDATE project SET status = 'CANCELLED' WHERE p_id = ?";
  let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
    if (err) throw err;
    res.send("Project Cancelled!");
  });
=======
  if (req.session.isLogged) {
    let sql = "UPDATE project SET status = 'CANCELLED' WHERE p_id = ?";
    let query = mySqlConnection.query(sql, req.params.p_id, (err, result) => {
      if (err) throw err;
      res.send("Project Cancelled!");
    });
  } else {
    res.send("Login First!");
  }
>>>>>>> Ishara
});

module.exports = router;
