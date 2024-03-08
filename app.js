const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");
require('dotenv').config({path:'./.env'});
const app = express();
const mongoose = require("mongoose");

const URI = process.env.MONGO_URI
console.log(URI)

mongoose.connect(
URI,  { useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Error de conexión a MongoDB:", error);
});

db.once("open", () => {
  console.log("Conexión exitosa a MongoDB");
});

const Invitations_acepted = new mongoose.Schema({
  email: { type: String },
  acepted: { type: Boolean, default: true },
  countOfGuests: { type: Number },
});

const Guests = new mongoose.model("guests", Invitations_acepted);
const Invitations_error = new mongoose.Schema({
  email: { type: String },
  createdAt: { type: Date, default: new Date() },
});

const Errors = new mongoose.model("errors", Invitations_error);

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log("listening on port 3000");
});
//mongodb+srv://invitation:invitation2809@test-coderhouse.ovwadqn.mongodb.net/
app.get("/", async (req, res) => {
  try {
    const guests = await Guests.find();
    res.status(200).send(guests);
  } catch (err) {
    throw new Error(err);
  }
});

app.post("/", async (req, res) => {
  try {
    await Guests.create({
      email: req.body.email,
      countOfGuests: req.body.countOfGuests,
    });
    res.status(200).send(req.body);
  } catch (err) {
    await Errors.create({
      email: req.body.email,
    });
    throw new Error(err);
  }
});
