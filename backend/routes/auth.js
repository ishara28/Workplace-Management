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
router.post("/changepw/:user_id", (req, res) => {
  var password = req.body.password;
  if (password) {
    let sql = "UPDATE user SET password = ? WHERE id = ?";
    let query = mySqlConnection.query(
      sql,
      [password, req.params.user_id],
      (err, result) => {
        if (err) throw err;
        console.log("Password Changed");
        res.send("Password Changed");
      }
    );
  }
});

router.post("/changeun/:user_id", (req, res) => {
  var newUsername = req.body.username;

  let sql = "SELECT * FROM user WHERE username = ? ";

  let query = mySqlConnection.query(sql, newUsername, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send("Username exists! Choose another");
    } else {
      let sql = "UPDATE user SET username = ? WHERE id = ?";
      let query = mySqlConnection.query(
        sql,
        [newUsername, req.params.user_id],
        (err, result) => {
          if (err) throw err;
          res.send("Changed Username successfully!");
        }
      );
    }
  });
});

module.exports = router;
