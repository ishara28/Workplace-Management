const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

router.post("/", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  if (username && password) {
    mySqlConnection.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      (error, results, fields) => {
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          //   res.redirect("/home");
          res.send({
            message: "Logged in successfully!",
            isLogged: true,
          });
        } else {
          res.send({
            message: "Incorrect Username and/or Password!",
            isLogged: false,
          });
        }
        res.end();
      }
    );
  } else {
    res.send({
      message: "Please enter Username and Password!",
      isLogged: false,
    });
    res.end();
  }
});

module.exports = router;
