const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require('path');


const app = express();
const connectDB = require("./config/db");

const todo = require("./routes/todo");

connectDB();

app.use(cors({ origin: true, credentials: true })); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todo", todo);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
  }


if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(
        path.resolve(__dirname, '..', 'client', 'build', 'index.html')
      )
    });
  }
  module.exports = app;