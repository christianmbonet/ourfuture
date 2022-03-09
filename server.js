const express = require("express");
require("dotenv").config();
const cors = require("cors");



const app = express();
const connectDB = require("./server/config/db");

const todo = require("./server/routes/todo");

connectDB();

app.use(cors({ origin: true, credentials: true })); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/todo", todo);

app.get("/", (req, res) => res.send("Server up and running"));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
  }

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});

