const express = require("express");
const mongoose = require("mongoose");
const Signup = require("./Models/signupModel");
const path = require("path");

//// Middleware
const app = express();
app.use(express.json());

// path dir
app.use(express.static(path.join(__dirname, "./")));

app.get("/", async function (req, res) {
  res.sendFile(path.join(__dirname, "./signup.html"));
});

// Routes
app.get("/", function (req, res) {
  res.send("hello api");
});

// Connecting database
mongoose
  .connect("mongodb://localhost:27017/demo")
  .then(function () {
    app.listen(3000, function () {
      console.log("Node Api running successfully");
    });
    console.log("mongoose connected");
  })
  .catch(function (err) {
    console.log(err);
  });

// Signup
app.post("/signup", async function (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await Signup.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newSignup = await Signup.create({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(200).json(newSignup);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete
app.delete("/signup/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const signup = await Signup.findByIdAndDelete(id);

    if (!signup) {
      return res.status(404).json({ message: "Cannot find user by ID" });
    } else {
      res.status(200).json(signup);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Login
app.post("/login", async function (req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if the user exists
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid username" });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Username and password match, success
    res.status(200).json({ msg: "Login successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
