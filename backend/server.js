const express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var session = require("express-session");

const app = express();

//Middleware
app.use(
  session({
    secret: "secret-key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Getting routes
const ClientRoute = require("./routes/client");
const WorkerRoute = require('./routes/worker');
const AgentRoute = require("./routes/agent");
const MachineryRoute = require("./routes/machinery");
const SiteRoute = require("./routes/site");
const OrganizationRoute = require("./routes/organization");
const AgreementRoute = require("./routes/agreement");
const ProjectRoute = require("./routes/project");
const AuthRoute = require("./routes/auth");

app.use("/client", ClientRoute);
app.use('/worker',WorkerRoute);
app.use('/agent',AgentRoute);
app.use("/machinery", MachineryRoute);
app.use("/site", SiteRoute);
app.use("/organization", OrganizationRoute);
app.use("/agreement", AgreementRoute);
app.use("/project", ProjectRoute);
app.use("/auth", AuthRoute);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log("Server is running on PORT ", PORT));
