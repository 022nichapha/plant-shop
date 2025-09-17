import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello Plant Shop 🌱" });
});

// start server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
