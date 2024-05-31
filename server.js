const express = require("express");
const mongoose = require("mongoose");
const Signup = require("./Models/signupModel");
const path = require("path");

//// Middleware
const app = express();
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "./")));

// Serve signup.html
app.get("/", async function (req, res) {
  res.sendFile(path.join(__dirname, "./signup.html"));
});

// Connecting to the database
mongoose
  .connect("mongodb://localhost:27017/demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    app.listen(3000, function () {
      console.log("Node API running successfully");
    });
    console.log("Mongoose connected");
  })
  .catch(function (err) {
    console.log(err);
  });

// Signup route
app.post("/signup", async function (req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const userExists = await Signup.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newSignup = await Signup.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newSignup);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete user by ID
app.delete("/signup/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const signup = await Signup.findByIdAndDelete(id);

    if (!signup) {
      return res.status(404).json({ message: "Cannot find user by ID" });
    }

    res.status(200).json(signup);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Login route
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Username and password match, success
    res.status(200).json({ msg: "Login successful" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/signup", async function (req, res) {
  try {
    // Pagination
    const { page = 1, limit = 3 } = req.query;
    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const result = await Signup.find({}).skip(skip).limit(parseInt(limit, 10));
    res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
