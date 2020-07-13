const express = require("express");
var cors = require("cors");

const app = express();

app.use(cors())

const PORT = 5000 || process.env.PORT;

app.get("/members", (req, res) => {
  const members = [
    { id: 1, name: "Ishara" },
    { id: 2, name: "Sasindu" },
  ];
  res.send(members);
});

app.listen(PORT, () => console.log("Server is running on PORT ", PORT));
