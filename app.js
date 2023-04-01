import express from "express";
import routes from "./routes/routes.js";
const app = express();
app.use("/", routes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
