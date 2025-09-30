app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});
