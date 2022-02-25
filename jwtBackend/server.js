const express = require("express");
const router = require("./routes/auth");
const { connect } = require("mongoose");
let app = express();
app.use(express.json());
app.use("/auth", router);
function connection() {
  connect("mongodb://localhost:27017/jwt");
  console.log("connected database");
}
connection();
app.listen(5000, err => {
  if (err) throw err;
  console.log("server is connected");
});
