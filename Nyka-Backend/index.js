const express = require("express");
const cors = require("cors");
const { connection } = require("./connection");
const { allRouter } = require("./routes/all.routes");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", allRouter);

app.get("/", (req, res) => {
  try {
    res.status(200).send("Server is running");
  } catch (error) {
    res.status(400).send(error);
  }
});


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server is connected to PORT: ${process.env.PORT}`);
  } catch (error) {
    console.log("Index Error", error.message);
  }
});

