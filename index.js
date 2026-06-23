import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});