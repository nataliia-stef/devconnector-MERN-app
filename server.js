const express = require("express");
const mongoose = require("mongoose");

const app = express();

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(error => console.log(`Error: ${error}`));

app.get("/", (req, res) => res.send("Hello1"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
