const router = require("express").Router();
const mySqlConnection = require("../dbconnection");

router.post("/", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  if (username && password) {
    mySqlConnection.query(
      "SELECT * FROM user WHERE username = ? AND password = ?",
      [username, password],
      (error, results, fields) => {
        console.log(results);
        if (results.length > 0) {
          req.session.isLogged = true;
          req.session.username = username;
          res.send({
            username: username,
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



module.exports = router;
