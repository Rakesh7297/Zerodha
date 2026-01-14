require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const { generateToken } = require("./utils/generateToken");
const { authenticateToken } = require("./middleware/authMiddleware");

const app = express();
app.use(express.json()); // <-- REQUIRED
app.use(express.urlencoded({ extended: true }));
/* ===================== CONFIG ===================== */

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

/* ===================== MIDDLEWARE ===================== */

// CORS: allow frontend (3000) & dashboard (3001)
app.use(cors({
  origin: "*",
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Parse JSON body
app.use(express.json());

/* ===================== AUTH ROUTES ===================== */

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await UserModel.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("FULL REGISTRATION ERROR:", error);
    res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
  
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await UserModel.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
});

// CURRENT USER
app.get("/me", authenticateToken, async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  });
});

/* ===================== PROTECTED ROUTES ===================== */

// GET HOLDINGS
app.get("/allHoldings", authenticateToken, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});
    res.json(holdings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// GET POSITIONS
app.get("/allPositions", authenticateToken, async (req, res) => {
  try {
    const positions = await PositionsModel.find({});
    res.json(positions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

// CREATE ORDER
app.post("/newOrder", authenticateToken, async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    const order = await OrdersModel.create({
      name,
      qty,
      price,
      mode,
      userId: req.user._id,
    });

    res.json({ message: "Order placed", order });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order" });
  }
});

/* ===================== SERVER & DB ===================== */

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
