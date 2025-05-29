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

app.post("/process-meeting", upload.single("file"), async (req, res) => {
  let text = null;

  if (req.file) {
    const filePath = req.file.path;
    try {
      text = fs.readFileSync(filePath, "utf8");
    } catch (err) {
      return res.status(500).json({ error: "Failed to read uploaded file." });
    } finally {
      fs.unlinkSync(filePath); 
    }
  }

  if (!text) {
    text = req.body.rawText || req.body.text;
  }

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' in body or no file uploaded." });
  }

  try {
    const result = await extractMeetingData(text);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
