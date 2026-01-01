const express = require("express");
const path = require("path");
const { projects } = require("./projectsData");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "All fields required" });
  }

  console.log("New contact:", { name, email, message });
  res.json({ ok: true });
});

app.get("/api/projects", (_req, res) => {
  res.json({ ok: true, projects });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
