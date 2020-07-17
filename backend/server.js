const express = require("express");
var cors = require("cors");

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Getting routes
const CustomerRoute = require("./routes/customer");
const MachineryRoute = require("./routes/machinery");
const WorkhouseRoute = require("./routes/workhouse");

app.use("/customers", CustomerRoute);
app.use("/machinery", MachineryRoute);
app.use("/workhouse", WorkhouseRoute);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log("Server is running on PORT ", PORT));
