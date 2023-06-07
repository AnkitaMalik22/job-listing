const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const connectDB = require("./database");
const User = require("./models/UserModel");
const Job = require("./models/JobModel");

dotenv.config();

// middleware

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes

app.get("/api/health-api", (req, res) => {
  res.send("Server is up and running");
});
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const isExistedUser = await User.findOne({ email });

    if (isExistedUser) {
      return res.status(400).json({ error: "User already registered!" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      mobile,
      password: encryptedPassword,
    });
    await user.save();

    // jwt
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.send({
      status: "SUCCESS",
      message: "User registerd successfully",
      token,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid credentials" });
      } else {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "10d",
        });

        res.send({
          status: "SUCCESS",
          message: "User logged in successfully",
          token,
        });
      }
    }
else {
      return res
        .status(400)
        .send({ status: "FAIL", message: "User Not Registered" });
    }
  } catch (err) {
    // console.log(err.message);
    res.status(500).send({ status: "FAIL", message: "Server error" });
  }
});

// Connect to MongoDB
connectDB();

// start server
app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
