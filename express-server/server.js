const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Angular Form Tutorial");
});

app.post("/enroll", (req, res) => {
  console.log(req.body);
  res.status(200).send({ message: "Data received" });
  // res.status(401).send({ message: "Error!!!!" });
});

app.listen(PORT, () => {
  console.log("Server is running on localhost: " + PORT);
});
