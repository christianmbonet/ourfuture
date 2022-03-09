const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require('path');


const app = express();
const connectDB = require("./config/db");

const todo = require("./routes/todo");

connectDB();

app.use(cors({ origin: true, credentials: true })); 

var allowedOrigins = ['http://localhost:3000','https://todaysreminders.herokuapp.com/'];
 
app.use(cors({
 
  origin: function(origin, callback){
 
    if(!origin) return callback(null, true);
 
    if(allowedOrigins.indexOf(origin) === -1){
 
      var msg = 'The CORS policy for this site does not ' +
 
                'allow access from the specified Origin.';
 
      return callback(new Error(msg), false);
 
    }
 
    return callback(null, true);
 
  }
}));


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