import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 3000;

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);
app.use(cors());
app.use(express.json());

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

app.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
