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
const OrganizationRoute = require("./routes/organization");

app.use("/customer", CustomerRoute);
app.use("/machinery", MachineryRoute);
app.use("/workhouse", WorkhouseRoute);
app.use("/organization", OrganizationRoute);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log("Server is running on PORT ", PORT));
