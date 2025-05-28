
const axios = require("axios");
require("dotenv").config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

async function extractMeetingData(text) {
  const prompt = `
You're an assistant that extracts structured insights from meeting notes.

MEETING NOTES:
"""
${text}
"""

Return the following as **valid JSON only** (no explanation):

{
  "summary": "Brief summary here...",
  "decisions": ["Decision 1", "Decision 2"],
  "actionItems": [
    {
      "task": "task here",
      "owner": "name if mentioned",
      "due": "due date if mentioned otherwise add "No specific deadline mentioned""
    }
  ]
}
`;

  try {
    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-opus-20240229", 
        max_tokens: 1024,
        temperature: 0.3,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
      }
    );

    const aiText = response.data.content[0].text.trim();

    return JSON.parse(aiText);
  } catch (error) {
    console.error("Claude API error:", error.response?.data || error.message);
    throw new Error("Failed to extract meeting data using Claude.");
  }
}

module.exports = { extractMeetingData };
