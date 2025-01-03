const http = require("http");
const dotEnv = require("dotenv");
var cors = require("cors");

dotEnv.config();
const Express = require("express");
const BodyParser = require("body-parser");
const app = Express();
app.use(BodyParser.json({ limit: "50mb" }));
app.use(BodyParser.urlencoded({ limit: "50mb", extended: true }));

// app.use(BodyParser.urlencoded({ extended: true }));
// app.use(BodyParser.json());
app.use(cors());

const Port = process.env.PORT || 4047;
const Server = http.createServer(app);

const WebsiteRouter = require("./app/routes/WebsiteRoute");

app.use("/api", WebsiteRouter);

require("./app/utils/middlewares/SwaggerDoc")(app);
require("./app/utils/middlewares/NotFound")(app);

Server.listen(Port, () =>
  console.log("Server is up and running port: " + Port)
);
