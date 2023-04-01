const express = require("express");
const routes = require("./routes/routes.js");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
