const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var session = require("express-session");

const app = express();

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Getting routes
const CustomerRoute = require("./routes/customer");
const MachineryRoute = require("./routes/machinery");
const WorkhouseRoute = require("./routes/workhouse");
const OrganizationRoute = require("./routes/organization");
const AgreementRoute = require("./routes/agreement");
const AuthRoute = require("./routes/auth");

app.use("/customer", CustomerRoute);
app.use("/machinery", MachineryRoute);
app.use("/workhouse", WorkhouseRoute);
app.use("/organization", OrganizationRoute);
app.use("/agreement", AgreementRoute);
app.use("/auth", AuthRoute);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log("Server is running on PORT ", PORT));
