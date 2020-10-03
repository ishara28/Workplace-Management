const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

//Get all site
router.get("/", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT site.index_no, site.reg_date, client.name, site.description, site.address, site.telephone, site.email, site.status FROM site JOIN client";
    let query = mySqlConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    res.send("Login First!");
  }
});

//Get all blocked site
router.get("/blocked", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM blocked_site";
    let query = mySqlConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } else {
    res.send("Login First!");
  }
});

//Register a site
router.post("/register", (req, res) => {
  if (req.session.isLogged) {
    let site = {
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

    let sql = "INSERT INTO site SET ? ";
    let query = mySqlConnection.query(sql, site, (err, result) => {
      if (err) throw err;
      res.send("site Inserted!");
    });
  } else {
    res.send("Login First!");
  }
});

//Get a single site
router.get("/:index_no", (req, res) => {
  if (req.session.isLogged) {
    let sql = "SELECT * FROM site  WHERE index_no = ?";
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

//Update site details
router.post("/update/:index_no", (req, res) => {
  if (req.session.isLogged) {
    let site = {
      reg_date: req.body.reg_date,
      address: req.body.address,
      telephone: req.body.telephone,
      email: req.body.email,
      description: req.body.description,
      c_id: req.body.c_id,
    };
    let sql = "UPDATE site SET ? WHERE index_no = ?";
    let query = mySqlConnection.query(
      sql,
      [site, req.params.index_no],
      (err, result) => {
        if (err) throw err;
        res.send("Updated Successfully!");
      }
    );
  } else {
    res.send("Login First!");
  }
});

//Remove existing site
router.post("/remove/:index_no", (req, res) => {
  if (req.session.isLogged) {
    let sql = "UPDATE site SET status = 'REMOVED' WHERE index_no = ?";
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

//Block existing site
router.post("/block/:index_no", (req, res) => {
  let sql_1 = "SELECT * FROM blocked_site WHERE index_no = ?";

  let query_1 = mySqlConnection.query(
    sql_1,
    req.params.index_no,
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        let blockWorkhose = {
          blocked_date: req.body.blocked_date,
          reason: req.body.reason,
        };

        let sql =
          "UPDATE site SET status = 'BLOCKED' WHERE index_no = ? ; UPDATE blocked_site SET ? WHERE index_no = ?";

        let query = mySqlConnection.query(
          sql,
          [req.params.index_no, blockWorkhose, req.params.index_no],
          (err, result) => {
            if (err) throw err;
            console.log("site Blocked");
            res.send("site Blocked");
          }
        );
      } else {
        let blockWorkhose = {
          index_no: req.params.index_no,
          blocked_date: req.body.blocked_date,
          reason: req.body.reason,
        };

        let sql =
          "UPDATE site SET status = 'BLOCKED' WHERE index_no = ? ; INSERT INTO blocked_site SET ?";

        let query = mySqlConnection.query(
          sql,
          [req.params.index_no, blockWorkhose],
          (err, result) => {
            if (err) throw err;
            console.log("site Blocked");
            res.send("site Blocked");
          }
        );
      }
    }
  );
});

module.exports = router;
