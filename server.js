import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const ContactsSchema = new mongoose.Schema({
  email: String,
});

const User = mongoose.model("User", userSchema);
const Contacts = mongoose.model("Contacts", ContactsSchema);

app.use(cors());
app.use(express.json());

// Connect endpoint
app.post("/connect-to-mongodb", async (req, res) => {
  const { connectionString } = req.body;
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB from client request");
    res.send("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB from client request", err);
    res.status(500).send("Error connecting to MongoDB");
  }
});

// LOGIN endpoint
app.post("/login", async (req, res) => {
  console.log("BODY", req.body);
  try {
    const response = await fetch(
      "https://api.dev.app.hakkaren.co/v1/auth/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      }
    );
    const responseBody = await response.json();
    console.log("Login Response Body:", responseBody);
    res.json(responseBody);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Login error");
  }
});

// Get users endpoint
app.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

// Get contacts
app.get(`/contacts/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const contacts = await Contacts.findOne({ _id: id });
    if (!contacts) {
      return res.status(404).json({ error: "Contacts not found" });
    }
    res.json(contacts);
  } catch (err) {
    res.status(500).send("Error fetching contacts");
  }
});

// Execute endpoint
app.post("/execute", async (req, res) => {
  const { executeURL, authToken, generateWithAI } = req.body;

  try {
    const response = await fetch(executeURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        configuration: [
          {
            users: {
              rows: 5,
              returned: true,
            },
          },
        ],
        generateWithAi: generateWithAI,
      }),
    });

    const responseBody = await response.json();
    console.log("Execute Response Body:", responseBody);
    res.json(responseBody);
  } catch (error) {
    console.error("Execute error:", error);
    res.status(500).send("Execute error");
  }
});

// Execute endpoint
app.put("/reset", async (req, res) => {
  try {
    const { resetURL, authToken } = req.body;
    const response = await fetch(resetURL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ resetTo: "empty" }),
    });

    const responseBody = await response.json();
    console.log("Reset Response Body:", responseBody);
    res.json(responseBody);
  } catch (error) {
    console.error("Error executing reset:", error);
    res.status(500).send("Error executing reset");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
