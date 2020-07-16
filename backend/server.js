const express = require("express");
var cors = require("cors");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Getting routes
const CustomerRoute = require("./routes/customer");
app.use("/customers", CustomerRoute);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log("Server is running on PORT ", PORT));
