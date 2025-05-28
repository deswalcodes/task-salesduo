
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const { extractMeetingData } = require("./api_call/claude_client");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });

app.post("/process-meeting", async (req, res) => {
  const text = req.body.rawText || req.body.text;
  if (!text) return res.status(400).json({ error: "Missing 'text' in request body." });

  try {
    const result = await extractMeetingData(text);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/process-meeting-file", upload.single("file"), async (req, res) => {
  const filePath = req.file?.path;
  if (!filePath) return res.status(400).json({ error: "No file uploaded." });

  try {
    const text = fs.readFileSync(filePath, "utf8");
    const result = await extractMeetingData(text);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    fs.unlinkSync(filePath); 
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
