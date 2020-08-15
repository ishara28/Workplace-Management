const router = require("express").Router();
const mySqlConnection = require("../dbconnection");
const { route } = require("./customer");

// Log user
router.post("/", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  if (username && password) {
    mySqlConnection.query(
      "SELECT * FROM user WHERE username = ? AND password = ?",
      [username, password],
      (error, results, fields) => {
        if (results.length > 0) {
          req.session.isLogged = true;
          req.session.username = username;
          res.send({
            message: "Logged in successfully!",
            isLogged: true,
          });
        } else {
          req.session.isLogged = false;
          res.send({
            message: "Incorrect Username and/or Password!",
            isLogged: false,
          });
        }
        res.end();
      }
    );
  } else {
    req.session.isLogged = false;
    res.send({
      message: "Please enter Username and Password!",
      isLogged: false,
    });
    res.end();
  }
});

//Change Password of a user
router.post("/changepw/:username", (req, res) => {
  if (req.session.isLogged) {
    let sql_1 = "SELECT * FROM user WHERE username = ? AND password = ?";
    let query_1 = mySqlConnection.query(
      sql_1,
      [req.params.username, req.body.password],
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          let sql_2 = "UPDATE user SET password = ?  WHERE username = ?";
          let query_2 = mySqlConnection.query(
            sql_2,
            [req.body.newPassword, req.params.username],
            (err, result) => {
              if (err) throw err;
              res.send("Password changed!");
            }
          );
        }
      }
    );
  } else {
    res.send("Login First!");
  }
});

router.post("/changeun/:username", (req, res) => {
  if (req.session.isLogged) {
    var newUsername = req.body.username;

    let sql = "SELECT * FROM user WHERE username = ? ";

    let query = mySqlConnection.query(sql, newUsername, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send("Username exists! Choose another");
      } else {
        let sql = "UPDATE user SET username = ? WHERE username = ?";
        let query = mySqlConnection.query(
          sql,
          [newUsername, req.params.username],
          (err, result) => {
            if (err) throw err;
            res.send("Changed Username successfully!");
          }
        );
      }
    });
  } else {
    res.send("Login first!");
  }
});

module.exports = router;