const express = require("express");
var cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());

app.use(cors());
var PORT = process.env.PORT || 3000;

app.use("/admin", express.static(path.join(__dirname, "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(PORT, () => {
  console.log(process.env.PORT);
  console.log("listening on " + PORT);
});
