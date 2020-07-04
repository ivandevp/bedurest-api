const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.json({ message: "Hola desde Bedurest API " });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
